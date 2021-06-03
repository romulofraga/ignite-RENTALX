import DayJsDateProvider from "@shared/container/provider/DateProvider/implementations/DayJsDateProvider";

import AppError from "../../../../shared/errors/AppError";
import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import UsersRepositoryInMemory from "../../repositories/in-memory/UsersRepositoryInMemory";
import UserTokensTokensRepositoryInMemory from "../../repositories/in-memory/UserTokensRepositoryInMemory";
import CreateUserUseCase from "../createUser/CreateUserUseCase";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let userTokensRepository: UserTokensTokensRepositoryInMemory;
let dateProvider: DayJsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepository = new UserTokensTokensRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepository,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create user token", async () => {
    const user: ICreateUserDTO = {
      driver_license: "123123",
      email: "test@email.com",
      name: "test",
      password: "123123",
    };

    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to create user token when user does not exists", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "user email",
        password: "user password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create user token with wrong password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "123123",
      email: "test@email.com",
      name: "test",
      password: "123123",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
