import { Autoimport } from "@dyna/core";
import { CacheControllersInitializer } from "./initializers/cache-controllers.initializer";
import { FixControllersInitializer } from "./initializers/fix-controllers.initializer";
import { FixRoutesInitializer } from "./initializers/fix-routes.initializer";
import { ListenHttpRequestsInitializer } from "./initializers/listen-http-requests.initializer";

export const DynaAutoimport: Autoimport = {
  initializers: [ CacheControllersInitializer, FixControllersInitializer, FixRoutesInitializer, ListenHttpRequestsInitializer ],
};
