import { Injectable, computed, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';

type SeverityType = 'success' | 'info' | 'warn' | 'error';

type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'center';

type CurrentToast = {
  key: string;
  position: ToastPosition;
};

interface State {
  currentToasts: CurrentToast[];
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  messageService = inject(MessageService);

  #state = signal<State>({
    currentToasts: [],
  });

  changeToastsState(toast: CurrentToast) {
    this.#state.update((value) => ({
      currentToasts: [...value.currentToasts, toast],
    }));
  }

  public toasts = computed<CurrentToast[]>(() => this.#state().currentToasts);

  count = 0;

  showToast(
    position: ToastPosition,
    severity: SeverityType,
    summary: string,
    detail: string,
    life: number = 3000
  ) {
    const key = `key-${this.count++}`;
    this.changeToastsState({
      key,
      position,
    });
    setTimeout(() => {
      this.messageService.add({
        key,
        severity,
        summary,
        detail,
        life,
      });
    }, 100);
  }

  closeToast(key: string) {
    setTimeout(() => {
      this.#state.update((value) => ({
        currentToasts: [
          ...value.currentToasts.filter((toast) => toast.key !== key),
        ],
      }));
    }, 500);
  }
}
