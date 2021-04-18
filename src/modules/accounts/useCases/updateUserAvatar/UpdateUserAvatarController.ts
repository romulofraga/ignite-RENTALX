import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateUserAvatarUseCase from "./UpdateUserAvatarUseCase";

export default class UpdateUserAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatar_file = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ avatar_file, user_id: id });

    return response.status(204).send();
  }
}
