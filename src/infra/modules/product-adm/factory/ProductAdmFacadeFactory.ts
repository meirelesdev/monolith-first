import ProductFacade from "../facade/ProductAdmFacade";
import AddProductUseCase from "../../../../modules/product-adm/usecase/add-product/AddProductUsecase";
import ProductRepositorySequelize from "../repository/sequelize/ProductRepositorySequelize";

export default class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepositorySequelize();
    const addProductUseCase = new AddProductUseCase(productRepository);
    return new ProductFacade({
      addUseCase: addProductUseCase,
      stockUseCase: undefined,
    });
  }
}
