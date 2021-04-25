import AppError from "../../../../errors/AppError";
import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import UsersRepositoryInMemory from "../../repositories/in-memory/UsersRepositoryInMemory";
import CreateUserUseCase from "../createUser/CreateUserUseCase";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUsecase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUsecase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create user token", async () => {
    const user: ICreateUserDTO = {
      driver_license: "123123",
      email: "test@email.com",
      name: "test",
      password: "123123",
    };

    await createUserUsecase.execute(user);
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

    await createUserUsecase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
