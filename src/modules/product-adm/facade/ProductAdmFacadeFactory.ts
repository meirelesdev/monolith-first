import ProductFacade from "../../../infra/modules/product-adm/facade/ProductAdmFacade";
import AddProductUseCase from "../usecase/add-product/AddProductUsecase";
import ProductRepositorySequelize from "../../../infra/modules/product-adm/repository/sequelize/ProductRepositorySequelize";
import CheckStockUsecase from "../usecase/check-stock/CheckStockUsecase";

export default class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepositorySequelize();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const ckeStockUsecase = new CheckStockUsecase(productRepository);
    return new ProductFacade({
      addUseCase: addProductUseCase,
      stockUseCase: ckeStockUsecase,
    });
  }
}
