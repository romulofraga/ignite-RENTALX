import { Router } from "express";

import CreateSpecificationController from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import ListSpecificationController from "../../../../modules/cars/useCases/listSpecifications/ListSpecificationsController";
import ensureAdmin from "../middlewares/ensureAdmin";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

specificationsRouter.get("/", listSpecificationController.handle);

export { specificationsRouter };
