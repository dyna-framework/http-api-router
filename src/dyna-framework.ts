import { Autoimport } from "@dyna/core";
import { HttpApiRouterInitializer } from "./http-api-router.initializer";

export const DynaAutoimport: Autoimport = {
  initializers: [ HttpApiRouterInitializer ],
};
