import { Router } from "express";

import createCategoryController from "../modules/cars/useCases/createCategory/index";
import listCategoriesController from "../modules/cars/useCases/listCategories/index";

const categoriesRouter = Router();

categoriesRouter.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});
categoriesRouter.get("/", (request, response) => {
  return listCategoriesController.handle(request, response);
});

export { categoriesRouter };
