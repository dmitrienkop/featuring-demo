import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { FormField, TextField } from '@my/myworld-ui-kit';
import { ModalConfig, MODAL_CONFIGS } from '../../constants';
import { getReservedDates } from '../../helpers/datetime';
import { useGetReservedSlotsQuery } from '../../services/api';
import { NewDeveloperRequest } from '../../services/types';
import { ImageUpload } from '../ImageUpload';
import { Range, DatesFromTo } from '../Range';
import { Loader } from '../Loader';
import { extractValidImage, validateForm, validateRange } from './helpers';
import { getConfig } from '../../config';
import { RequestFormProps } from './types';
import { FIELD_NAMES, IMAGE_UPLOAD_ERRORS, DEFAULT_REQUEST_FORM_STATE } from './constants';
import css from './styles.scss';

export * from './types';

export function RequestForm ({ featureType, modalType, disabled, onChange }: RequestFormProps) {
    const initialFormState = { ...DEFAULT_REQUEST_FORM_STATE, type: featureType };
    const [formState, setFormState] = useState<NewDeveloperRequest>(initialFormState);
    const [imageError, setImageError] = useState<string|null>(null);
    const [_isValid, setIsValid] = useState<boolean>(false);
    
    const formConfig = MODAL_CONFIGS[modalType];

    const { isLoading, data: reservedSlots = [] } = useGetReservedSlotsQuery(featureType, { refetchOnMountOrArgChange: true });
    const reservedDates = getReservedDates(reservedSlots);
    const appConfig = getConfig();
    const rangeLimit = parseInt(appConfig.maxFeaturingRequestDaysPeriod, 10);

    const { t } = useTranslation();

    const errorDict = {
        errorStartAfterEnd: t('errorStartAfterEnd'),
        errorMaxRangeLength: t('errorMaxRangeLength', { max: rangeLimit }),
        errorIncludesBookedDates: t('errorIncludesBookedDates')
    };

    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        const validationState = validateForm(formConfig, formState, reservedSlots, rangeLimit, errorDict);

        setIsValid(validationState);
        onChange({ isValid: validationState, data: formState });
    }, [formState]);

    const updateFormState = (fieldName: keyof NewDeveloperRequest) =>
        (fieldValue: NewDeveloperRequest[keyof NewDeveloperRequest]) => {
            const newState = {
                ...formState,
                [fieldName]: fieldValue
            };

            if (fieldName === FIELD_NAMES.FROM && !fieldValue) {
                newState.to = null;
            }

            setFormState(newState);
        };

    const onUpload = (config: ModalConfig) =>
        async (event: ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            const loadImageResult = await extractValidImage(event.target, config.image);
            const isErrorResult = Object.values(IMAGE_UPLOAD_ERRORS)
                .includes(loadImageResult.toString());

            setImageError(isErrorResult ? loadImageResult as string : null);
            setFormState({
                ...formState,
                [FIELD_NAMES.IMAGE]: isErrorResult
                    ? null
                    : loadImageResult as ArrayBuffer
            });
        }

    const onReset = () => setFormState({
        ...formState,
        [FIELD_NAMES.IMAGE]: null
    });

    const onRangeChange = ([newFrom, newTo]: DatesFromTo) => {
        if (newFrom !== formState.from) {
            updateFormState('from')(newFrom);
        }
        if (newTo !== formState.to) {
            updateFormState('to')(newTo);
        }
    };

    return <form className={classNames(css.form, css[`_${modalType}`])}>
        {isLoading
            ? <Loader className={css.loader} />
            : <>
                {formConfig && <>
                    <ImageUpload
                        onChange={onUpload(formConfig)}
                        onReset={onReset}
                        image={formState.image}
                        error={imageError}
                        validationConfig={formConfig.image}
                        type={modalType}
                        disabled={disabled}
                    />
                    <FormField label={t('title')}>
                        <TextField
                            name={FIELD_NAMES.TITLE}
                            placeholder={t('gameNameWithLimit', { max: formConfig.title })}
                            maxLength={formConfig.title}
                            onChange={updateFormState(FIELD_NAMES.TITLE)}
                            disabled={disabled}
                        />
                    </FormField>
                    <FormField label={t('subtitle')}>
                        <TextField
                            name={FIELD_NAMES.SUBTITLE}
                            placeholder={t('gameDescriptionWithLimit', { max: formConfig.subtitle })}
                                maxLength={formConfig.subtitle}
                            onChange={updateFormState(FIELD_NAMES.SUBTITLE)}
                            disabled={disabled}
                        />
                    </FormField>
                </>}
                <Range
                    label={t('activePeriod')}
                    dates={[formState.from, formState.to]}
                    placeholderFrom={t('dateStart')}
                    placeholderTo={t('dateEnd')}
                    onChange={onRangeChange}
                    reservedDates={reservedDates}
                    disabled={disabled}
                    error={validateRange(
                        formState.from,
                        formState.to,
                        reservedSlots,
                        rangeLimit,
                        errorDict
                    )}
                />
            </>}
    </form>;
}
