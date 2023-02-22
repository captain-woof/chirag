import { createVuetify, ThemeDefinition } from 'vuetify';
import "vuetify/styles";
import "../styles/vuetify_settings.scss";
import '@mdi/font/css/materialdesignicons.css';

// Custom theme
const customTheme: ThemeDefinition = {
    dark: true,
    colors: {
        primary: "#ab47bc"
    }
}

export const vuetify = createVuetify({
    theme: {
        themes: {
            customTheme
        },
        defaultTheme: "customTheme",
        variations: {
            colors: ["primary"],
            lighten: 10,
            darken: 10
        }
    }
});
