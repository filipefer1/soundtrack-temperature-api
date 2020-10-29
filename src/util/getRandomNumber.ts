export default class GenerateRamdomNumber {
  public static getRandomNumber(min: number, max: number): number {
    return Math.trunc(Math.random() * (max - min) + min);
  }
}
