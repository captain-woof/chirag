import { ChiragStorage } from "../../../../service_worker/types"

/**
 * @dev Starter intercept with some default values set
 */
export const starterIntercept: InterceptForEditing = {
    interceptUrl: "",
    nickname: "My API",
    headers: [
        {
            name: "content-type",
            value: ""
        }
    ],
    statusCode: 200,
    content: ""
}

/**
 * @dev Takes intercept object and transforms it to editable intercept object format
 * @param intercept Intercept to transform
 * @returns Intercept for editing
 */
export const getInterceptForEditing = (intercept?: InterceptForSaving) => {
    const headersFromIntercept = Object.entries(intercept?.responseHeaders ?? {});

    const interceptForEditing: InterceptForEditing = {
        interceptUrl: intercept?.interceptUrl ?? starterIntercept.interceptUrl,
        nickname: intercept?.nickname ?? starterIntercept.nickname,
        headers: headersFromIntercept.length > 0
            ? headersFromIntercept.map(([name, value]) => ({ name, value }))
            : starterIntercept.headers,
        statusCode: intercept?.responseStatusCode ?? starterIntercept.statusCode,
        content: intercept?.responseBody ?? starterIntercept.content
    }

    return interceptForEditing;
}

/**
 * @dev Transforms an intercept for editing into intercept for saving
 * @param interceptForEditing Intercept for editing
 * @returns Intercept for saving
 */
export const getInterceptForSaving = (interceptForEditing: ReturnType<typeof getInterceptForEditing>) => {
    const interceptForSaving: InterceptForSaving = {
        enabled: false,
        interceptUrl: interceptForEditing.interceptUrl,
        nickname: interceptForEditing.nickname,
        responseStatusCode: interceptForEditing.statusCode,
        responseBody: interceptForEditing.content,
        responseHeaders: interceptForEditing.headers.reduce((accumulatedHeaders, { name, value }) => ({ ...accumulatedHeaders, [name]: value }), {})
    }
    return interceptForSaving;
}

export type InterceptForEditing = {
    interceptUrl: string;
    nickname: string;
    headers: Array<{ name: string; value: string }>;
    statusCode: number;
    content: string;
}

export type InterceptForSaving = ChiragStorage["intercepts"][""] & { interceptUrl: string };
