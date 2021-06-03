import { Router } from "express";

import ResetPasswordResetUserController from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordResetUserController";
import SendForgotPasswordEmailController from "@modules/accounts/useCases/sendForgotPasswordEmail/SendForgotPasswordEmailController";

const sendForgotPasswordEmailController = new SendForgotPasswordEmailController();
const resetPasswordResetUserController = new ResetPasswordResetUserController();

const passwordRouter = Router();

passwordRouter.post("/forgot", sendForgotPasswordEmailController.handle);
passwordRouter.post("/reset", resetPasswordResetUserController.handle);

export { passwordRouter };
