import IMailProvider from "../IMailProvider";

export default class MailProviderInMemory implements IMailProvider {
  private message: any[] = [];
  public async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}
