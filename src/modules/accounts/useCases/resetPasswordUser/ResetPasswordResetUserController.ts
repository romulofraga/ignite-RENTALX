import { Request, Response } from "express";
import { container } from "tsyringe";

import ResetPasswordResetUserUseCase from "./ResetPasswordResetUserUseCase";

export default class ResetPasswordResetUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPasswordResetUserUseCase = container.resolve(
      ResetPasswordResetUserUseCase
    );

    await resetPasswordResetUserUseCase.execute({
      token: String(token),
      password,
    });

    return response.send();
  }
}
