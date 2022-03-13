import React from 'react';
import { useTranslation } from 'react-i18next';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { Button, EButtonTypes, Modal } from '@my/myworld-ui-kit';
import { useRemoveDeveloperRequestMutation } from '../../services/api';
import { RemoveRequestModalProps } from './types';
import css from './styles.scss';

export const RemoveRequestModal = ({ requestId, visible, onClose }: RemoveRequestModalProps) => {
    const [removeRequest, { error, status, data: removeRequestResult }] = useRemoveDeveloperRequestMutation();
    const handleRemove = () => requestId && removeRequest(requestId);
    const { t } = useTranslation();

    const isLoading = status === QueryStatus.pending;
    const hasError = error || typeof removeRequestResult === 'string';

    if (removeRequestResult === true) {
        setTimeout(onClose, 0);
    }

    return <Modal visible={visible} onClose={onClose}>
        <div className={css.body}>
            <h3 className={css.title}>{t('removeRequestTitle')}</h3>
            <div className={css.description} dangerouslySetInnerHTML={{ __html: t('removeRequestText') }} />
            {hasError
                ? <div className={css.error} dangerouslySetInnerHTML={{ __html: t('removeRequestError') }} />
                : null}
            <div className={css.buttons}>
                <Button
                    type={EButtonTypes.SECONDARY}
                    onClick={onClose}
                    disabled={isLoading}
                >
                    {t('cancelBtn')}
                </Button>
                <Button
                    type={EButtonTypes.PRIMARY}
                    className={css.submitBtn}
                    onClick={handleRemove}
                    disabled={isLoading}
                >
                    {t('removeBtn')}
                </Button>
            </div>
        </div>
    </Modal>;
}
