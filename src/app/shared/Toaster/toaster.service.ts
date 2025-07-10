import { Injectable, signal } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  public toasts = signal<{  message: string; type: 'success' | 'error' | 'warning' | 'info'; show: boolean }[]>([]);

  get toastList() {
    return this.toasts.asReadonly();
  }

  showToast(message: string, type: 'success' | 'error' | 'warning' | 'info', show: boolean = true): void {
    console.log(`ToasterService: Showing toast - Message: ${message}, Type: ${type}`);

    const toast = { message, type, show };
    this.toasts.update((prev) => [...prev, toast]);


    setTimeout(() => {
      this.toasts.update((prev) => prev.filter((t) => t !== toast));
    }, 3000);
  }
}
