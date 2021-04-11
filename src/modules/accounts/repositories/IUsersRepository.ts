import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../entities/User";

export default interface IUsersRepository {
  create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
}
