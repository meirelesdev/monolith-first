import ProductRepositoryMemory from "../../../../../src/infra/product-adm/repository/memory/ProductRepositoryMemory";
import UseCaseInterface from "../../../../../src/modules/@shared/domain/usecase/UsecaseInterface";
import {
  CheckStockFacadeInputDTO,
  CheckStockFacadeOutputDTO,
} from "../../../../../src/modules/product-adm/facade/ProductAdmFacadeInterface";
import ProductRepository from "../../../../../src/modules/product-adm/repository/ProductRepository";
import AddProductUseCase from "../../../../../src/modules/product-adm/usecase/add-product/AddProductUsecase";
import CheckStockUsecase from "../../../../../src/modules/product-adm/usecase/check-stock/CheckStockUsecase";

let productRepository: ProductRepository;
let checkStock: UseCaseInterface<CheckStockFacadeInputDTO, CheckStockFacadeOutputDTO>;
describe("Check stock usecase tests", () => {
  beforeEach(() => {
    productRepository = new ProductRepositoryMemory();
    checkStock = new CheckStockUsecase(productRepository);
  });
  it("should not be able check stock of product if not found", async () => {
    const checkStock = new CheckStockUsecase(productRepository);
    const input = { productId: "product id" };
    await expect(() => checkStock.execute(input)).rejects.toThrow(new Error("Product not found"));
  });
  it("should be able check stock of product", async () => {
    const addProductInput = {
      name: "Product 01",
      description: "Product 01 description",
      purchasePrice: 100,
      stock: 10,
    };
    const addProduct = new AddProductUseCase(productRepository);
    const output = await addProduct.execute(addProductInput);

    const checkStock = new CheckStockUsecase(productRepository);
    const input = { productId: output.id };
    const outputCheckStock = await checkStock.execute(input);

    expect(outputCheckStock.productId).toBe(output.id);
    expect(outputCheckStock.stock).toBe(addProductInput.stock);
  });
});
