import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { Button, EButtonTypes, Modal } from '@my/myworld-ui-kit';
import { useAddDeveloperRequestMutation } from '../../services/api';
import { NewDeveloperRequest } from '../../services/types';
import { RequestForm, RequestFormState } from '../RequestForm';
import { RequestModalProps } from './types';
import { prepareFormStateData } from './helpers';
import css from './styles.scss';

export const RequestModal = ({ featureType, modalType, visible, onClose }: RequestModalProps) => {
    const [formState, setFormState] = useState<RequestFormState>();
    const handleFormChange = (formState: RequestFormState) => setFormState(formState);
    const [addNewRequest, { error, status, data: addRequestResult }] = useAddDeveloperRequestMutation();

    const isLoading = status === QueryStatus.pending;
    const hasError = error || typeof addRequestResult === 'string';

    const handleSubmit = () => {
        const formData = formState?.data || {};
        const preparedFormStateData = prepareFormStateData(formData);

        addNewRequest(preparedFormStateData as NewDeveloperRequest);
    };

    const { t } = useTranslation();

    if (addRequestResult === true) {
        setTimeout(onClose, 0);
    }

    return <Modal
        visible={visible}
        onClose={onClose}
        title={t('createRequestTitle')}
    >
        <div className={css.modal}>
            <RequestForm
                featureType={featureType}
                modalType={modalType}
                onChange={handleFormChange}
                disabled={isLoading}
            />
            {hasError
                ? <div className={css.error} dangerouslySetInnerHTML={{ __html: t(addRequestResult as string) }} />
                : null}
            <footer className={css.footer}>
                <Button
                    type={EButtonTypes.PRIMARY}
                    disabled={!formState?.isValid || isLoading}
                    onClick={handleSubmit}
                >
                    {t('sendBtn')}
                </Button>
            </footer>
        </div>
    </Modal>;
};
