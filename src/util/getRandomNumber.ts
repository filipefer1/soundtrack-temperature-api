export default class GenerateRamdomNumber {
  public static getRandomNumber(): number {
    return Math.trunc(Math.random() * (25 - 0) + 0);
  }
}
