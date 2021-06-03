import ICreateUserTokensDTO from "@modules/accounts/dtos/ICreateUserTokensDTO";
import UserTokens from "@modules/accounts/infra/typeorm/entities/UserTokens";
import IUserTokensRepository from "@modules/accounts/repositories/IUserTokensRepository";

export default class UserTokensRepository implements IUserTokensRepository {
  userTokens: UserTokens[] = [];

  public async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.userTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );
  }

  public async deleteById(id: string): Promise<void> {
    this.userTokens = this.userTokens.filter(
      (userToken) => userToken.id !== id
    );
  }
  public async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.userTokens.find(
      (userToken) =>
        userToken.refresh_token === refresh_token &&
        userToken.user_id === user_id
    );
  }

  public async create({
    user_id,
    expires_at,
    refresh_token,
  }: ICreateUserTokensDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      user_id,
      expires_at,
      refresh_token,
    });

    await this.userTokens.push(userToken);

    return userToken;
  }
}
