import { environment } from "../../../environments/environment";

export class CookieUtil {
  static setCookie(name: string, value: string, days: number = 7): void {
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${'session'}; path=/; SameSite=${environment.production}`;
  }

  static getCookie(name: string): string | null {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(encodeURIComponent(name) + '='))
      ?.split('=')[1] || null;
  }

  static deleteCookie(name: string): void {
    this.setCookie(name, '', -1);
  }

  static checkCookie(name: string): boolean {
    return this.getCookie(name) !== null;
  }
}
