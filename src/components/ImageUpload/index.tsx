import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Icon, Button, EButtonTypes } from '@my/myworld-ui-kit';
import { ImageUploadProps } from './types';
import { EModalType } from '../../enums';
import css from './styles.scss';

const INPUT_ID = 'bgUpload';

export const ImageUpload = ({
    image,
    error,
    onChange,
    onReset,
    validationConfig,
    type,
    disabled
}: ImageUploadProps) => {
    const requirenments = [
        `${validationConfig.dimensions.join('x')}px,`,
        `${validationConfig.ext.join(', ').toUpperCase()}`,
        `(до ${validationConfig.size} КБ)`,
    ].join(' ');
    const { t } = useTranslation();

    return <div className={classNames(css.img, {
        [css.disabled]: Boolean(disabled)
    })}>
        <div
            className={classNames(css.imgBlock, {
                [css._error]: Boolean(error),
                [css._image]: !error && image,
                [css._actionsMain]: type === EModalType.ACTIONS_MAIN
            })}
            style={{
                backgroundImage: image ? `url(${image})` : ''
            }}
        >
            <Icon
                className={css.imgBlockPlaceholder}
                glyph={{ id: 'joystick' }}
            />
            <Icon
                className={css.imgBlockLoader}
                glyph={{ id: 'loader' }}
            />
            <span className={css.imgBlockError}>{error}</span>
            {image && <span className={css.imgRemove} onClick={onReset}>
                <Icon
                    className={css.imgRemoveIcon}
                    glyph={{ id: 'removeImg' }}
                />
            </span>}
        </div>
        <div className={css.imgDescription}>
            <h3 className={css.imgDescriptionTitle}>{t('backgroundImage')}</h3>
            <div className={css.imgDescriptionText}>{requirenments}</div>
            <label
                htmlFor={INPUT_ID}
                className={css.imgUpload}
            >
                <Button
                    type={EButtonTypes.SECONDARY}
                    className={css.imgUploadBtn}
                >
                    {t('selectImage')}
                </Button>
                <input
                    className={css.imgDescriptionInput}
                    type="file"
                    name="image"
                    id={INPUT_ID}
                    accept={validationConfig.ext
                        .map((ext: string) => `.${ext}`).join(', ')}
                    onChange={disabled ? () => null : onChange}
                />
            </label>
        </div>
    </div>;
};
