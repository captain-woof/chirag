import { createVuetify } from 'vuetify';
import "vuetify/styles";
import "../styles/vuetify_settings.scss";
import '@mdi/font/css/materialdesignicons.css';

export const vuetify = createVuetify({
    theme: {
        defaultTheme: "dark"
    }
});
