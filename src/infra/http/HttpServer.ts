import express from "express";
import cors from "cors";
import ModuleFactoryInterface from "./ModuleFactoryInterface";
import Router from "./Routes";
import SequelizeDBInit from "../db/SequelizeDBInit";

export default class HttpServer {
  private constructor() {}

  static start(moduleFactory: ModuleFactoryInterface) {
    const app = express();
    SequelizeDBInit.execute();
    app.use(express.json());
    app.use(cors());
    app.use(Router.build(moduleFactory));
    app.listen(3000, () => {
      console.log("server started on port 3000");
    });
  }
}
