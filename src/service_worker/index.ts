import { setupInterceptor } from "./listeners/interceptor";
import { setupMessageListeners } from "./listeners/message";
import { setupChirag } from "./listeners/setup";

setupChirag();
setupInterceptor();
setupMessageListeners();
