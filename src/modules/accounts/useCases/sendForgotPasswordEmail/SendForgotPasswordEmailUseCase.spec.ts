import UsersRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import DayJsDateProvider from "@shared/container/provider/DateProvider/implementations/DayJsDateProvider";
import MailProviderInMemory from "@shared/container/provider/MailProvider/in-memory/MailProviderInMemory";
import AppError from "@shared/errors/AppError";

import UserTokensRepositoryInMemory from "../../repositories/in-memory/UserTokensRepositoryInMemory";
import SendForgotPasswordEmailUseCase from "./SendForgotPasswordEmailUseCase";

let sendForgotPasswordEmailUseCase: SendForgotPasswordEmailUseCase;
let usersRepository: UsersRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let userTokensRepository: UserTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Email", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    userTokensRepository = new UserTokensRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordEmailUseCase = new SendForgotPasswordEmailUseCase(
      usersRepository,
      userTokensRepository,
      dateProvider,
      mailProvider
    );
  });
  it("should be able to send a forgot email to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await usersRepository.create({
      driver_license: "4261884124",
      email: "ja@remo.sr",
      name: "Mason Bryan",
      password: "1234 ",
    });

    await sendForgotPasswordEmailUseCase.execute("ja@remo.sr");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should be not able to send a forgot email to user if user does not exists", async () => {
    await expect(
      sendForgotPasswordEmailUseCase.execute("ja@remo.sr")
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create an user refresh_token", async () => {
    const createUserToken = spyOn(userTokensRepository, "create");

    await usersRepository.create({
      driver_license: "4261884124",
      email: "cu@ador.sr",
      name: "Zedas Frutas",
      password: "1234 ",
    });

    await sendForgotPasswordEmailUseCase.execute("cu@ador.sr");

    expect(createUserToken).toHaveBeenCalled();
  });
});
