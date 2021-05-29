import { Request, Response } from "express";
import { container } from "tsyringe";

import DeleteCarImageUseCase from "./DeleteCarImagesUseCase";

export default class DeleteCarImagesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { carImage_id } = request.params;

    const deleteCarImageUseCase = container.resolve(DeleteCarImageUseCase);

    await deleteCarImageUseCase.execute({ carImage_id });

    return response.status(201).send();
  }
}
