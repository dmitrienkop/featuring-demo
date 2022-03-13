import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Icon } from '@my/myworld-ui-kit';
import { formatPeriod } from '../../helpers/datetime';
import { RequestStatusParams } from './types';
import css from './styles.scss';

export const RequestStatus = ({
    isApproved,
    from,
    to,
    id,
    getOnRemoveHandler
}: RequestStatusParams) => {
    const { t } = useTranslation();
    const onRemoveHandler = () => getOnRemoveHandler(id)();

    return <div className={css.request}>
        <Icon
            className={css.requestIcon}
            glyph={{ id: 'request' }}
        />
        <span className={css.period}>{formatPeriod(from, to)}</span>
        <span className={classNames(css.status, isApproved && css._approved)}>
            {isApproved
                ? t('requestStatusApproved')
                : t('requestStatusOnModeration')}
        </span>
        <span className={css.removeBtn} onClick={onRemoveHandler}>
            <Icon
                className={css.removeIcon}
                glyph={{ id: 'remove' }}
            />
        </span>
    </div>;
};
