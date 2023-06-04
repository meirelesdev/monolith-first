import ProductRepositoryMemory from "../../../../../src/infra/store-catalog/repository/memory/ProductRepositoryMemory";
import ProductRepository from "../../../../../src/modules/store-catalog/repository/ProductRepository";
import FindAllProductsUsecase from "../../../../../src/modules/store-catalog/usecase/find-all-products/FindAllProductsUsecase";
import GetProduct from "../../../../../src/modules/store-catalog/usecase/get-product/GetProductUsecase";

let productRepository: ProductRepository;
let findAllProductsUsecase: FindAllProductsUsecase;
let findOneProductUsecase: GetProduct;
describe("Store catalog products tests", () => {
  beforeEach(() => {
    productRepository = new ProductRepositoryMemory();
    findAllProductsUsecase = new FindAllProductsUsecase(productRepository);
    findOneProductUsecase = new GetProduct(productRepository);
  });
  it("should find all catalog products", async () => {
    const output = await findAllProductsUsecase.execute();
    expect(output.products).toHaveLength(2);
  });
  it("should find one catalog products", async () => {
    const output = await findOneProductUsecase.execute({
      productId: "1",
    });
    expect(output.id).toBe("1");
  });
});
