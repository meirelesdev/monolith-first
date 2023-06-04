import ProductFacade from "./ProductAdmFacade";
import ProductRepositorySequelize from "../repository/sequelize/ProductRepositorySequelize";
import AddProductUseCase from "../../../modules/product-adm/usecase/add-product/AddProductUsecase";
import CheckStockUsecase from "../../../modules/product-adm/usecase/check-stock/CheckStockUsecase";

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
