import { Router } from "express";

import createCategoryController from "../modules/cars/useCases/createCategory/CreateCategoryController";
import listCategoriesController from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRouter = Router();

categoriesRouter.post("/", createCategoryController.handle);
categoriesRouter.get("/list", listCategoriesController.handle);

export { categoriesRouter };
