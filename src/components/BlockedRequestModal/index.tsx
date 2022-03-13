import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, EButtonTypes, Modal } from '@my/myworld-ui-kit';
import { BlockedRequestModalProps } from './types';
import css from './styles.scss';

export const BlockedRequestModal = ({
    visible,
    onClose
}: BlockedRequestModalProps) => {
    const { t } = useTranslation();

    return <Modal visible={visible} onClose={onClose}>
        <div className={css.body}>
            <h3 className={css.title}>{t('blockedRequestTitle')}</h3>
            <div
                className={css.description}
                dangerouslySetInnerHTML={{ __html: t('blockedRequestDescription') }}
            />
            <div className={css.buttons}>
                <Button
                    type={EButtonTypes.PRIMARY}
                    onClick={onClose}
                >
                    {t('closeBtn')}
                </Button>
            </div>
        </div>
    </Modal>;
};
