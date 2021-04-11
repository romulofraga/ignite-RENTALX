import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUserUseCase from "./CreateUserUseCase";

export default class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password, driver_license } = request.body;

      const createUserUseCase = container.resolve(CreateUserUseCase);

      await createUserUseCase.execute({
        name,
        email,
        password,
        driver_license,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(404).json({ error: error.message });
    }
  }
}
