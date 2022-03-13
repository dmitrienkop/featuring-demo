import { isBefore } from 'date-fns';
import { ImageDimensions, ModalConfig, ModalImageConfig } from '../../constants';
import { NewDeveloperRequest, RawReservedSlot } from '../../services/types';
import { getRangeLength, checkRangeIncludesReservedSlots } from '../../helpers/datetime';
import { FIELD_NAMES, IMAGE_UPLOAD_ERRORS } from './constants';
import { IRangeErrorDict } from './types';

const loadFile = async (file: File): Promise<ArrayBuffer|null> =>
    new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
    });

const checkDimensions = (
    image: ArrayBuffer,
    [reqWidth, reqHeight]: ImageDimensions
): Promise<boolean> =>
    new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(
            // minimal size
            img.width >= reqWidth && img.height >= reqHeight
            // proportions must match
            && img.width / reqWidth === img.height / reqHeight
        );
        // must be validated at the next level
        img.onerror = () => resolve(true);
        img.src = image.toString();
    });

export async function extractValidImage (
    el: HTMLInputElement,
    config: ModalImageConfig
): Promise<ArrayBuffer | string> {
    const file = (el.files as FileList)[0];

    if (file.size > config.size * 1024) {
        return IMAGE_UPLOAD_ERRORS.SIZE;
    }

    const image = await loadFile(file);

    if (!image) {
        return IMAGE_UPLOAD_ERRORS.UNKNOWN;
    }

    const isValidDimensions = await checkDimensions(
        image, config.dimensions
    );

    if (!isValidDimensions) {
        return IMAGE_UPLOAD_ERRORS.DIMENSIONS;
    }

    return image;
};

export function validateRange(
    dateFrom: Date | null,
    dateTo: Date | null,
    reservedSlots: RawReservedSlot[],
    rangeLimit: number,
    errorDict: IRangeErrorDict
): false | string {
    if (!dateFrom || !dateTo) {
        return false;
    }

    if (isBefore(dateTo, dateFrom)) {
        return errorDict.errorStartAfterEnd;
    }

    const rangeLength = getRangeLength(dateFrom, dateTo);

    if (rangeLength > rangeLimit) {
        return errorDict.errorMaxRangeLength;
    }

    const rangeIncludesReservedSlots = checkRangeIncludesReservedSlots(
        dateFrom, dateTo, reservedSlots
    );

    return rangeIncludesReservedSlots
        ? errorDict.errorIncludesBookedDates
        : false;
}

export function validateForm (
    formConfig: ModalConfig | null,
    data: NewDeveloperRequest,
    reservedSlots: RawReservedSlot[],
    rangeLimit: number,
    errorDict: IRangeErrorDict
): boolean {
    const requiredFields = formConfig
        ? Object.values(FIELD_NAMES)
        : [FIELD_NAMES.FROM, FIELD_NAMES.TO];

    return requiredFields.every((fieldName) => Boolean(data[fieldName]))
        && !validateRange(data.from, data.to, reservedSlots, rangeLimit, errorDict);
};
