import { EFeatureType } from '../enums';
import { EErrorResponseDataType, EAjaxResponseStatus, EAjaxResponseMethod, EAjaxArg } from './enums';

type AjaxErrorResponse = { error: EErrorResponseDataType, data: void };

type AjaxDataResponse<RespDataType> = { data: { result: RespDataType }, error: void };

type AjaxRespString = 'AjaxResponse';

type AjaxRawResponse<RespDataType> = [AjaxRespString, EAjaxResponseStatus.OK, EAjaxResponseMethod, AjaxDataResponse<RespDataType> | AjaxErrorResponse];

type AjaxRawErrorResponse = [AjaxRespString, EAjaxResponseStatus.ERROR];

export type MutationQueryResult = true | EErrorResponseDataType;

export interface RawDeveloperRequest {
    action_name: EFeatureType,
    app_id: number,
    date_start: number,
    date_stop: number,
    flag_approved: number,
    id: number
}

export interface RawReservedSlot {
    action_name: EFeatureType,
    date_start: number,
    date_stop: number
}

export type GetDeveloperRequestsRawResponse = AjaxRawResponse<RawDeveloperRequest[]> | AjaxRawErrorResponse;

export type GetReservedSlotsRawResponse = AjaxRawResponse<RawReservedSlot[]> | AjaxRawErrorResponse;

export type DeveloperRequestBooleanActionRawResponse = AjaxRawResponse<number> | AjaxRawErrorResponse;


export interface NewDeveloperRequest {
    type: EFeatureType;
    image?: string;
    title?: string;
    subtitle?: string;
    from: Date | null;
    to: Date | null;
}

export interface RawNewDeveloperRequest {
    [EAjaxArg.ACTION_NAME]: EFeatureType;
    [EAjaxArg.APP_NAME]?: string;
    [EAjaxArg.APP_DESC]?: string;
    [EAjaxArg.APP_PIC]?: string;
    [EAjaxArg.DATE_START]: number;
    [EAjaxArg.DATE_STOP]: number;
}
