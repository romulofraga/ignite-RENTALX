import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/uploads.ts/upload.config";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import CreateUserController from "../modules/accounts/useCases/createUser/CreateUserController";
import UpdateUserAvatarController from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRouter = Router();

const upload = multer(uploadConfig.multer);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.post("/", createUserController.handle);

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRouter };
