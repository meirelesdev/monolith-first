import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import AddressModel from "../client-adm/repository/sequelize/AddressModel";
import ClientModel from "../client-adm/repository/sequelize/ClientModel";

export default class SequelizeDBInit {
  static async execute(): Promise<void> {
    const configConnection: SequelizeOptions = {
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    };
    const sequelize = new Sequelize(configConnection);
    sequelize.addModels([ClientModel, AddressModel]);
    await sequelize.sync();
  }
}
