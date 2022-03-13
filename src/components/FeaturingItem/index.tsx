import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Button, EButtonTypes } from '@my/myworld-ui-kit';
import { SLOTS_LIMIT } from '../../constants';
import { isAfterBeginningOfCurrentMonth, isNextMonthDate } from '../../helpers/datetime';
import { useGetDeveloperRequestsQuery } from '../../services/api';
import { RequestStatus } from '../RequestStatus';
import { FeaturingItemProps } from './types';
import css from './styles.scss';

export const FeaturingItem = ({
    featureType,
    title,
    description,
    imageUrl,
    imageSize: [imageWidth, imageHeight],
    isPublishedApp,
    disabled,
    onShowRequestModal,
    onShowBlockedModal,
    onRemoveRequest
}: FeaturingItemProps) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => setExpanded(!expanded);
    const handleRemoveRequest = (id: number) => onRemoveRequest.bind(this, id);
    const { t } = useTranslation();

    const { requests } = useGetDeveloperRequestsQuery(undefined, {
        selectFromResult: ({ data = [] }) => ({
            requests: data
                .filter(({ action_name, date_start }) =>
                    action_name === featureType &&
                    isAfterBeginningOfCurrentMonth(date_start))
        })
    });

    const nextMonthRequests = requests.filter(({ date_start }) => isNextMonthDate(date_start));

    const slotsLimit = SLOTS_LIMIT[featureType];
    const reachedSlotsLimit = Boolean(slotsLimit && nextMonthRequests.length >= slotsLimit);

    const onRequestClick = () => isPublishedApp
        ? onShowRequestModal(featureType)
        : onShowBlockedModal(featureType);

    let requestButtonTitle = t('createRequest');
    if (disabled) {
        requestButtonTitle = t('requestTypeNotAvailable');
    } else if (reachedSlotsLimit) {
        requestButtonTitle = t('availableOnceAMonth');
    }

    return <div className={css.item}>
        <h2 className={css.title}>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <div className={classNames(css.cut, { [css._expanded]: expanded })}>
            <span
                className={classNames(css.cutLink, css._expand)}
                onClick={toggleExpand}
            >
                {t('publishExample')}
            </span>
            {expanded && <div className={css.imgWrapper}>
                <img
                    className={css.example}
                    src={imageUrl}
                    width={imageWidth}
                    height={imageHeight}
                />
            </div>}
            <span
                className={classNames(css.cutLink, css._rollup)}
                onClick={toggleExpand}
            >
                {t('collapse')}
            </span>
        </div>
        {requests.length
            ? <div className={css.statuses}>
                {requests.map((request) => <RequestStatus
                    key={request.id}
                    id={request.id}
                    from={request.date_start}
                    to={request.date_stop}
                    isApproved={Boolean(request.flag_approved)}
                    getOnRemoveHandler={handleRemoveRequest}
                />)}
            </div>
            : null}
        <Button
            className={css.requestBtn}
            disabled={disabled || reachedSlotsLimit}
            type={EButtonTypes.PRIMARY}
            onClick={onRequestClick}
            title={requestButtonTitle}
        >
            {t('createRequest')}
        </Button>
    </div>;
};
