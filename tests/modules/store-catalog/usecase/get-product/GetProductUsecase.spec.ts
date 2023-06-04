import ProductRepositoryMemory from "../../../../../src/infra/store-catalog/repository/memory/ProductRepositoryMemory";
import ProductRepository from "../../../../../src/modules/store-catalog/repository/ProductRepository";
import GetProductUsecase from "../../../../../src/modules/store-catalog/usecase/get-product/GetProductUsecase";

let productRepository: ProductRepository;
let findOneProductUsecase: GetProductUsecase;
describe("Store catalog products tests", () => {
  beforeEach(() => {
    productRepository = new ProductRepositoryMemory();
    findOneProductUsecase = new GetProductUsecase(productRepository);
  });
  it("should find one catalog product", async () => {
    const output = await findOneProductUsecase.execute({
      productId: "1",
    });
    expect(output.id).toBe("1");
  });
  it("should not be able to find one catalog product", async () => {
    await expect(() =>
      findOneProductUsecase.execute({
        productId: "3",
      })
    ).rejects.toThrow(new Error("Product not found"));
  });
});
