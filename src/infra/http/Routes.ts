import express from "express";
import ModuleFactoryInterface from "./ModuleFactoryInterface";
import ClientAdmController from "../client-adm/controller/ClientAdmController";
import ExpressConvert from "./ExpressConverter";

export default class Router {
  private constructor() {}

  static build(moduleFactory: ModuleFactoryInterface) {
    const router = express.Router({ mergeParams: true });
    const clientFacade = moduleFactory.createCustomerModule();
    const clientAdmController = new ClientAdmController(clientFacade);

    router.get(
      "/clients/:id",
      ExpressConvert.execute(clientAdmController.show.bind(clientAdmController))
    );
    router.get(
      "/clients",
      ExpressConvert.execute(clientAdmController.index.bind(clientAdmController))
    );
    router.post(
      "/clients",
      ExpressConvert.execute(clientAdmController.store.bind(clientAdmController))
    );
    // router.get("/invoice/:id", async (req, res) => {});
    // router.post("/products", async (req, res) => {});
    // router.post("/checkout", async (req, res) => {});
    return router;
  }
}
