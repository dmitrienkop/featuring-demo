import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FEATURE_MODAL_MAP, TYPE_REQUIRE_IMAGES_UPLOAD } from '../../constants';
import { EFeatureType } from '../../enums';
import { getConfig } from '../../config';
import { useGetDeveloperRequestsQuery } from '../../services/api';
import { RequestModal } from '../RequestModal';
import { BlockedRequestModal } from '../BlockedRequestModal';
import { RemoveRequestModal } from '../RemoveRequestModal';
import { FeaturingItem } from '../FeaturingItem'
import { Loader } from '../Loader';
import { FeaturingProps } from './types';
import css from './styles.scss';

export function Featuring ({ config }: FeaturingProps) {
    const [newRequestFeatureType, setNewRequestFeatureType] = useState<EFeatureType|null>(null);
    const [blockedRequestFeatureType, setBlockedRequestFeatureType] = useState<EFeatureType|null>(null);
    const [removeRequestId, setRemoveRequestId] = useState<number|null>(null);
    const { isLoading } = useGetDeveloperRequestsQuery();
    const { t } = useTranslation();

    if (isLoading) {
        return <Loader className={css.loader} />;
    }

    const togglePopup = <T, >(
        prevValue: T,
        dispatchFn: Dispatch<SetStateAction<T | null>>
    ) => (value?: T) =>
        dispatchFn(prevValue ? null : value || null);

    const availableTypes = Object.values(EFeatureType).filter((type) => config.types[type]);
    const isPublishedApp = getConfig().publicationStatus === '1';

    return <section className={css.featuring}>
        <p>{t('welcome1')}</p>
        <p>{t('welcome2')}</p>

        <div>
            {availableTypes.map((type) =>
                <FeaturingItem
                    {...config.types[type]}
                    key={type}
                    featureType={type}
                    isPublishedApp={isPublishedApp}
                    onShowRequestModal={togglePopup<EFeatureType | null>(
                        newRequestFeatureType, setNewRequestFeatureType
                    )}
                    onShowBlockedModal={togglePopup<EFeatureType | null>(
                        blockedRequestFeatureType, setBlockedRequestFeatureType
                    )}
                    onRemoveRequest={setRemoveRequestId}
                    disabled={TYPE_REQUIRE_IMAGES_UPLOAD.includes(type)}
                />
            )}
        </div>

        {newRequestFeatureType && <RequestModal
            featureType={newRequestFeatureType}
            modalType={FEATURE_MODAL_MAP[newRequestFeatureType]}
            visible={Boolean(newRequestFeatureType)}
            onClose={togglePopup<EFeatureType | null>(
                newRequestFeatureType, setNewRequestFeatureType
            )}
        />}

        {blockedRequestFeatureType && <BlockedRequestModal
            visible={Boolean(blockedRequestFeatureType)}
            onClose={togglePopup<EFeatureType | null>(
                blockedRequestFeatureType, setBlockedRequestFeatureType
            )}
        />}

        {removeRequestId && <RemoveRequestModal
            requestId={removeRequestId}
            visible={Boolean(removeRequestId)}
            onClose={togglePopup<number | null>(
                removeRequestId, setRemoveRequestId
            )}
        />}
    </section>;
}
