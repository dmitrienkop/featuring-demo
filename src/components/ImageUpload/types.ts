import { ChangeEventHandler } from 'react';
import { ModalImageConfig } from '../../constants';
import { EModalType } from '../../enums';

export interface ImageUploadProps {
    image?: string;
    error?: string | null;
    onChange: ChangeEventHandler;
    onReset: () => void;
    validationConfig: ModalImageConfig;
    type: typeof EModalType[keyof typeof EModalType];
    disabled?: boolean;
}
