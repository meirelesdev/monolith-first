import HttpServer from "./http/HttpServer";
import ModulesFactory from "./http/ModulesFactory";

const modulesFactory = new ModulesFactory();
HttpServer.start(modulesFactory);
