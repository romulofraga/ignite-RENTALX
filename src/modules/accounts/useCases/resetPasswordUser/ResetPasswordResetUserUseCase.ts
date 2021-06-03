import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IUserTokensRepository from "@modules/accounts/repositories/IUserTokensRepository";
import IDateProvider from "@shared/container/provider/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordResetUserUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Invalid token");
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_at,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("Token spired");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("User not found");
    }

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.userTokensRepository.deleteById(userToken.id);
  }
}
