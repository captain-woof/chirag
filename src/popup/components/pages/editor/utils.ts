import { ChiragStorage } from "../../../../service_worker/types"

/**
 * @dev Starter intercept with some default values set
 */
export const starterIntercept: InterceptForEditing = {
    enabled: false,
    interceptUrl: "",
    nickname: "My API",
    responseHeaders: [
        {
            name: "content-type",
            value: ""
        }
    ],
    responseStatusCode: 200,
    responseBody: ""
}

/**
 * @dev Takes intercept object and transforms it to editable intercept object format
 * @param intercept Intercept to transform
 * @returns Intercept for editing
 */
export const getInterceptForEditing = (intercept?: InterceptForEditing) => {

    const interceptForEditing: InterceptForEditing = {
        enabled: intercept?.enabled ?? starterIntercept.enabled,
        interceptUrl: intercept?.interceptUrl ?? starterIntercept.interceptUrl,
        nickname: intercept?.nickname ?? starterIntercept.nickname,
        responseHeaders: intercept?.responseHeaders?.length > 0
            ? intercept?.responseHeaders
            : starterIntercept.responseHeaders,
        responseStatusCode: intercept?.responseStatusCode ?? starterIntercept.responseStatusCode,
        responseBody: intercept?.responseBody ?? starterIntercept.responseBody
    }

    return interceptForEditing;
}

export type InterceptForEditing = ChiragStorage["intercepts"][""] & { interceptUrl: string };
