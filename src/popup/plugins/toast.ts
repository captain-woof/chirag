import { Plugin, reactive } from "vue";

interface Toast {
    visible: boolean;
    message: string;
    type: "success" | "error" | "info";
}

const data = reactive<Toast>({
    visible: false,
    message: "",
    type: "info"
});

/**
 * @dev Composable for toast data
 * @returns toast Toast object
 * @returns {Toast['visible']} toast.visible True, if toast is visible currently
 * @returns {Toast['type']} toast.type Type of toast
 * @returns {Toast['message']} toast.message Message shown in toast
 * @returns {(message: Toast["message"], type: Toast["type"]) => void} toast.show Invoke to show toast
 */
export const useToast = () => {
    return {
        data,
        show: (message: Toast["message"], type: Toast["type"]) => {
            data.visible = true;
            data.message = message;
            data.type = type;
        }
    }
}

/**
 * @dev Plugin that installs Toast functionality
 * @dev Run with `$toast`
 */
export const toast: Plugin = {
    install(app, options) {
        app.config.globalProperties.$toast = useToast();
    },
}
