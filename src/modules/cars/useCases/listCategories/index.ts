import CategoryRepository from "../../repositories/implemetations/CategoryRepository";
import ListCategoriesController from "./ListCategoriesController";
import ListCategoriesUseCase from "./ListCategoryUseCase";

const categoryRepository = CategoryRepository.getInstance();

const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);

const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);

export default listCategoriesController;
