export { }

declare module 'vue' {
    interface ComponentCustomProperties {
        $toast: {
            data: {
                visible: boolean;
                type: "success" | "error" | "info";
                message: string;
            },
            show: (message: string, type: "success" | "error" | "info") => void;
        };
    }
}
