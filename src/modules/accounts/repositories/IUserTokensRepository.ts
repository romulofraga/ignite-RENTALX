import ICreateUserTokensDTO from "../dtos/ICreateUserTokensDTO";
import UserTokens from "../infra/typeorm/entities/UserTokens";

export default interface IUserTokensRepository {
  create({
    user_id,
    expires_at,
    refresh_token,
  }: ICreateUserTokensDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(token: string): Promise<UserTokens>;
}
