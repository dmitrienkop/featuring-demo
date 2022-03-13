export enum EAjaxResponseStatus {
    OK = 'OK',
    ERROR = 'Error'
};

export enum EAjaxResponseMethod {
    GET = 'get'
};

export enum EErrorResponseDataType {
    APP_USE = 'appUse',
    CANT_ARGUMENT_ID = 'cantArgumentId',
    DATES_ARE_BUSY = 'datesAreBusy',
    DONT_GO_OVERBOARD_APP = 'dontGoOverboardApp',
    DONT_GO_OVERBOARD_DAYS = 'dontGoOverboardDays',
    DONT_GO_OVERBOARD_MON = 'dontGoOverboardMon',
    FAIL_ACTION = 'failAction',
    FEW_ARGS_DATE = 'fewArgsDate',
    FEW_ARGS_FOR_CREATE = 'fewArgsForCreate',
    HIGHLENGTH = 'highlength',
    NO_ACTIONS = 'noActions',
    NO_ARG = 'noArg',
    NO_APP_ID = 'noAppId',
    TIME_FALSE = 'timeFalse'
}

export enum EAjaxFuncName {
    FEATURE_GET = 'orderfeature.get',
    FEATURE_CREATE = 'orderfeature.create',
    FEATURE_REMOVE = 'orderfeature.del'
}

export enum EApiTags {
    DEVELOPER_REQUEST = 'DeveloperRequest'
}

export enum EAjaxArg {
    ACTION_NAME = 'arg_action_name',
    APP_DESC = 'arg_app_desc',
    APP_ID = 'arg_app_id',
    APP_NAME = 'arg_app_name',
    APP_PIC = 'arg_app_pic',
    DATE_START = 'arg_date_start',
    DATE_STOP = 'arg_date_stop',
    ID = 'arg_id'
}
