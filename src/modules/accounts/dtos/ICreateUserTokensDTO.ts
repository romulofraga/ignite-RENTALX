export default interface ICreateUserTokensDTO {
  user_id: string;
  expires_at: Date;
  refresh_token: string;
}
