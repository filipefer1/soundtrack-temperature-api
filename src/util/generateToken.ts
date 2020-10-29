export class GenerateOAuthToken {
  public static generateToken(clientId: string, clientSecret: string): string {
    const token = `${clientId}:${clientSecret}`;
    const tokenBase64 = Buffer.from(token, "utf-8").toString("base64");
    return tokenBase64;
  }
}
