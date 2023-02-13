import { setupInterceptor } from "./listeners/interceptor.js";
import { setupMessageListeners } from "./listeners/message.js";
import { setupChirag } from "./listeners/setup.js";

setupChirag();
setupInterceptor();
setupMessageListeners();
