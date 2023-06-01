import { AddProductInputDTO } from "../../../../../src/modules/product-adm/usecase/add-product/AddProductDTO"
import AddProductUseCase from "../../../../../src/modules/product-adm/usecase/add-product/AddProductUsecase"

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}
describe("Add product usecase unit test", () => {
    it("Should add a product", async () => {

        const productRepository = MockRepository()

        const input: AddProductInputDTO = {
            name: "Product 01",
            description: "Product 01 description",
            purchasePrice: 100,
            stock: 10
        }

        const addProduct = new AddProductUseCase(productRepository);

        const output = await addProduct.execute(input)

        expect(productRepository.add).toHaveBeenCalled()
        expect(output.name).toBe(input.name)
        expect(output.description).toBe(input.description)
        expect(output.purchasePrice).toBe(input.purchasePrice)
        expect(output.stock).toBe(input.stock)
    })
})