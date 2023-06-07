import ProductAdmFacade from "./ProductAdmFacade";
import ProductRepositorySequelize from "../repository/sequelize/ProductRepositorySequelize";
import AddProductUseCase from "../../../modules/product-adm/usecase/add-product/AddProductUsecase";
import CheckStockUsecase from "../../../modules/product-adm/usecase/check-stock/CheckStockUsecase";
import ProductAdmFacadeInterface from "../../../modules/product-adm/facade/ProductAdmFacadeInterface";

export default class ProductAdmFacadeFactory {
  static create(): ProductAdmFacadeInterface {
    const productRepository = new ProductRepositorySequelize();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const ckeStockUsecase = new CheckStockUsecase(productRepository);
    return new ProductAdmFacade({
      addUseCase: addProductUseCase,
      stockUseCase: ckeStockUsecase,
    });
  }
}
