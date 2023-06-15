import express from "express";
import ModuleFactoryInterface from "./ModuleFactoryInterface";
import ClientAdmController from "../client-adm/controller/ClientAdmController";
import ExpressConvert from "./ExpressConverter";
import ProductAdmController from "../product-adm/controller/ProductAdmController";

export default class Router {
  private constructor() {}

  static build(moduleFactory: ModuleFactoryInterface) {
    const router = express.Router({ mergeParams: true });
    const clientFacade = moduleFactory.createCustomerModule();
    const productFacade = moduleFactory.createProductModule();
    const clientAdmController = new ClientAdmController(clientFacade);
    const productAdmController = new ProductAdmController(productFacade);

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

    router.get(
      "/products/:id/stock",
      ExpressConvert.execute(productAdmController.checkStock.bind(productAdmController))
    );
    router.post(
      "/products",
      ExpressConvert.execute(productAdmController.store.bind(productAdmController))
    );

    // router.get("/invoice/:id", async (req, res) => {});
    // router.post("/checkout", async (req, res) => {});
    return router;
  }
}
