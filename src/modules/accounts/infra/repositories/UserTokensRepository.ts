import { getRepository, Repository } from "typeorm";

import ICreateUserTokensDTO from "@modules/accounts/dtos/ICreateUserTokensDTO";
import IUserTokensRepository from "@modules/accounts/repositories/IUserTokensRepository";

import UserTokens from "../typeorm/entities/UserTokens";

export default class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  public async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  public async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = await this.repository.findOne({
      user_id,
      refresh_token,
    });
    return userToken;
  }

  public async create({
    user_id,
    expires_at,
    refresh_token,
  }: ICreateUserTokensDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      expires_at,
      refresh_token,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}
