import { Router } from "express";
import multer from "multer";

import ProfileUserController from "@modules/accounts/useCases/profileUser/ProfileUserController";

import uploadConfig from "../../../../config/uploads.ts/upload.config";
import CreateUserController from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import UpdateUserAvatarController from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router();

const upload = multer(uploadConfig.multer);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRouter.get("/", ensureAuthenticated, profileUserController.handle);
usersRouter.post("/", createUserController.handle);
usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRouter };
