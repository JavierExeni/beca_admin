import { computed, inject, Injectable, signal } from '@angular/core';
import { Webinar, WebinarRequest } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

interface State {
  webinars: Webinar[];
  public_webinars: Webinar[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class WebinarService {
  http = inject(HttpClient);

  baseUrl = `${environment.baseUrl}becademia/webinars/`;

  #state = signal<State>({
    webinars: [],
    public_webinars: [],
    loading: false,
  });

  changeListState(webinars: Webinar[]) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      webinars,
    }));
  }

  changeLoadingState(loading: boolean) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      loading,
    }));
  }

  public isLoading = computed<boolean>(() => this.#state().loading);
  public webinars = computed<Webinar[]>(() => this.#state().webinars);

  loadWebinars() {
    this.changeLoadingState(true);
    this.getWebinars().subscribe();
  }

  constructor() {
    this.loadWebinars();
  }

  getWebinars() {
    const url = `${this.baseUrl}`;
    return this.http.get<Webinar[]>(url).pipe(
      tap((webinars) => {
        this.changeLoadingState(false);
        this.changeListState(webinars);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  getSingelWebinar(id: number): Observable<Webinar> {
    const url = `${this.baseUrl}${id}/`;
    return this.http.get<Webinar>(url);
  }

  create(request: WebinarRequest): Observable<Webinar> {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}`;
    return this.http.post<Webinar>(url, request).pipe(
      tap((_) => {
        this.changeLoadingState(false);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  update(id: number, request: Partial<WebinarRequest>) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.patch<Webinar>(url, request);
  }

  delete(id: number) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.delete(url);
  }
}
