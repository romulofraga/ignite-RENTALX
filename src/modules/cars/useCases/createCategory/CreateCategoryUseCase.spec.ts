import AppError from "../../../../shared/errors/AppError";
import CategoryRepositorInMemory from "../../repositories/in-memory/CategoriesRepositorInMemory";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositorInMemory: CategoryRepositorInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositorInMemory = new CategoryRepositorInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositorInMemory
    );
  });

  it("should be able to create a new Category", async () => {
    const category = {
      name: "Category",
      description: "Description",
    };

    await createCategoryUseCase.execute(category);
    const categoryCreated = await categoriesRepositorInMemory.findByName(
      category.name
    );
    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new Category with name exists", async () => {
    const category = {
      name: "Category",
      description: "Description",
    };

    await createCategoryUseCase.execute(category);

    expect(async () => {
      await createCategoryUseCase.execute({
        name: "Category",
        description: "Description",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
