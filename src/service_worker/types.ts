import { Message, Status } from "./enums";

export type ChiragStorage = {
    status: Status;
    tabs: { [tabId: string | number]: boolean };
    intercepts: {
        [interceptUrl: string]: {
            enabled: boolean;
            nickname: string;
            responseStatusCode: number;
            responseHeaders: { [responseHeaderName: string]: string };
            responseBody: string;
        }
    };
}

export type ChiragMessageSwitch = {
    type: Message.SWITCH
}

export type ChiragMessageAddOrModifyIntercept = {
    type: Message.ADD_OR_MODIFY_INTERCEPT;
    payload: {
        interceptUrl: string;
        intercept: ChiragStorage["intercepts"][""];
    };
}

export type ChiragMessageEnableOrDisableIntercept = {
    type: Message.ENABLE_OR_DISABLE_INTERCEPT;
    payload: {
        interceptUrl: string;
    };
}

export type ChiragMessageRemoveIntercept = {
    type: Message.REMOVE_INTERCEPT;
    payload: {
        interceptUrl: string;
    };
}

export type ChiragMessageRemoveAllIntercepts = {
    type: Message.REMOVE_ALL_INTERCEPTS;
}