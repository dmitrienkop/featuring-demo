import { pickBy } from 'ramda';
import { getUnixTime } from 'date-fns';
import { MiniAppConfig } from '../config/types';
import { mskToLocal } from '../helpers/datetime';
import { MutationQueryResult, NewDeveloperRequest, RawNewDeveloperRequest } from './types';
import { EAjaxFuncName, EAjaxResponseStatus } from './enums';

export const getRawNewDeveloperRequestData = (data: NewDeveloperRequest): RawNewDeveloperRequest =>
    pickBy(Boolean, {
        arg_action_name: data.type,
        arg_app_name: data.title,
        arg_app_desc: data.subtitle,
        // TODO picture upload backend is not ready
        arg_app_pic: data.image ? encodeURIComponent('https://lorempixel.com/g/800/800/') : '',
        arg_date_start: data.from && getUnixTime(mskToLocal(data.from)),
        arg_date_stop: data.to && getUnixTime(mskToLocal(data.to))
    });

export const buildRequestUrl = (config: MiniAppConfig, funcName: EAjaxFuncName, args: Object) => {
    const argsString = Object.entries(args).reduce((str, [k, v]) => `${str}&${k}=${v}`, '');
    return `ajax?ajax_call=1&func_name=${funcName}&${argsString}&mna=${config.mna}&mnb=${config.mnb}`
};

export const transformListResponse = <GetListRawResponse>(resp: GetListRawResponse) =>
    resp[1] === EAjaxResponseStatus.OK
        ? resp[3]?.data?.result || []
        : [];

export const transformMutationResult = <GetBooleanRawResponse>(resp: GetBooleanRawResponse): MutationQueryResult =>
    resp[1] === EAjaxResponseStatus.OK
        ? Boolean(resp[3]?.data?.result) || resp[3]?.data?.error || 'unknownError'
        : 'unknownError';
