import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import IUserTokensRepository from "@modules/accounts/repositories/IUserTokensRepository";
import IDateProvider from "@shared/container/provider/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}
interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
export default class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  public async execute(token: string): Promise<ITokenResponse> {
    const { sub: user_id, email } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!");
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_at = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.userTokensRepository.create({
      user_id,
      expires_at,
      refresh_token,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}
