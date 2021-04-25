import { Router } from "express";

import CreateSpecificationController from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import ListSpecificationController from "../../../../modules/cars/useCases/listSpecifications/ListSpecificationsController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRouter.use(ensureAuthenticated);

specificationsRouter.post("/", createSpecificationController.handle);

specificationsRouter.get("/", listSpecificationController.handle);

export { specificationsRouter };
