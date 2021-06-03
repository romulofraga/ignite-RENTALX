import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IUserTokensRepository from "@modules/accounts/repositories/IUserTokensRepository";
import IDateProvider from "@shared/container/provider/DateProvider/IDateProvider";
import IMailProvider from "@shared/container/provider/MailProvider/IMailProvider";
import AppError from "@shared/errors/AppError";

@injectable()
export default class SendForgotPasswordEmailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}
  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("User does not exists!");
    }

    const token = v4();

    const hoursToExpiresToken = 3;
    const expires_at = this.dateProvider.addHours(hoursToExpiresToken);

    await this.userTokensRepository.create({
      user_id: user.id,
      expires_at,
      refresh_token: token,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Reset Password",
      variables,
      templatePath
    );
  }
}
