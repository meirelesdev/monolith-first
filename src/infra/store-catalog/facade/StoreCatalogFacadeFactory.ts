import StoreCatalogFacade from "./StoreCatalogFacade";
import ProductRepositorySequelize from "../repository/sequelize/ProductRepositorySequelize";
import FindAllProductsUsecase from "../../../modules/store-catalog/usecase/find-all-products/FindAllProductsUsecase";
import GetProductUsecase from "../../../modules/store-catalog/usecase/get-product/GetProductUsecase";

export default class StoreCatalogFacadeFactory {
  static create() {
    const productRepository = new ProductRepositorySequelize();
    const findAllProducts = new FindAllProductsUsecase(productRepository);
    const getProduct = new GetProductUsecase(productRepository);
    return new StoreCatalogFacade({
      findAllProducts,
      getProduct,
    });
  }
}
