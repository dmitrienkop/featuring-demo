import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { curry } from 'ramda';
import { getConfig } from '../config'
import { EFeatureType, Environment } from '../enums';
import { EAjaxArg, EAjaxFuncName, EApiTags } from './enums';
import {
    buildRequestUrl,
    getRawNewDeveloperRequestData,
    transformListResponse,
    transformMutationResult
} from './helpers';
import {
    GetDeveloperRequestsRawResponse,
    RawDeveloperRequest,
    GetReservedSlotsRawResponse,
    RawReservedSlot,
    NewDeveloperRequest,
    DeveloperRequestBooleanActionRawResponse,
    MutationQueryResult
} from './types';

const CORS_PROXY_URL = 'http://localhost:8080/';

const config = getConfig();
const proxyPrefix = process.env.NODE_ENV === Environment.Dev ? CORS_PROXY_URL : '';
const url = curry(buildRequestUrl)(config);

export const API_REDUCER_PATH = 'api';

export const api = createApi({
    reducerPath: API_REDUCER_PATH,
    baseQuery: fetchBaseQuery({
        baseUrl: `${proxyPrefix}${config.apiUrl}/cgi-bin/my`
    }),
    tagTypes: [EApiTags.DEVELOPER_REQUEST],
    endpoints: (builder) => ({
        getDeveloperRequests: builder.query<RawDeveloperRequest[], void>({
            query: () => ({
                url: url(EAjaxFuncName.FEATURE_GET, { [EAjaxArg.APP_ID]: config.appId })
            }),
            transformResponse: (resp: GetDeveloperRequestsRawResponse) =>
                transformListResponse<GetDeveloperRequestsRawResponse>(resp),
            providesTags: [EApiTags.DEVELOPER_REQUEST]
        }),

        getReservedSlots: builder.query<RawReservedSlot[], EFeatureType>({
            query: (featureType: EFeatureType) => ({
                url: url(EAjaxFuncName.FEATURE_GET, { [EAjaxArg.ACTION_NAME]: featureType })
            }),
            transformResponse: (resp: GetReservedSlotsRawResponse) =>
                transformListResponse<GetReservedSlotsRawResponse>(resp)
        }),

        addDeveloperRequest: builder.mutation<MutationQueryResult, NewDeveloperRequest>({
            query: (request: NewDeveloperRequest) => ({
                url: url(EAjaxFuncName.FEATURE_CREATE, {
                    ...getRawNewDeveloperRequestData(request),
                    [EAjaxArg.APP_ID]: config.appId
                })
            }),
            transformResponse: (resp: DeveloperRequestBooleanActionRawResponse) =>
                transformMutationResult<DeveloperRequestBooleanActionRawResponse>(resp),
            invalidatesTags: [EApiTags.DEVELOPER_REQUEST]
        }),

        removeDeveloperRequest: builder.mutation<MutationQueryResult, number>({
            query: (id: number) => ({
                url: url(EAjaxFuncName.FEATURE_REMOVE, {
                    [EAjaxArg.ID]: id,
                    [EAjaxArg.APP_ID]: config.appId
                })
            }),
            transformResponse: (resp: DeveloperRequestBooleanActionRawResponse) =>
                transformMutationResult<DeveloperRequestBooleanActionRawResponse>(resp),
            invalidatesTags: [EApiTags.DEVELOPER_REQUEST]
        })
    })
});

export const {
    useGetDeveloperRequestsQuery,
    useGetReservedSlotsQuery,
    useAddDeveloperRequestMutation,
    useRemoveDeveloperRequestMutation
} = api;
