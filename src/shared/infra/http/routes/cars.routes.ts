import { Router } from "express";
import multer from "multer";

import CreateCarController from "@modules/cars/useCases/createCar/CreateCarController";
import CreateCarSpecificationController from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import DeleteCarImagesController from "@modules/cars/useCases/deleteCarImage/DeleteCarImagesController";
import ListAvailableCarsController from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsContoller";
import UploadCarImagesController from "@modules/cars/useCases/uploadCarImage/UploadCarImagesController";

import uploadConfig from "../../../../config/uploads.ts/upload.config";
import ensureAdmin from "../middlewares/ensureAdmin";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const carsRouter = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();
const deleteCarImagesController = new DeleteCarImagesController();

const upload = multer(uploadConfig.multer);

carsRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRouter.get("/available", listAvailableCarsController.handle);

carsRouter.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRouter.post(
  "/images/:car_id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
);

carsRouter.delete(
  "/images/:carImage_id",
  ensureAuthenticated,
  ensureAdmin,
  deleteCarImagesController.handle
);

export { carsRouter };
