export class UtilityHelper {
  static generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

}