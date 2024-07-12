import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Language, LanguageRequest } from '../../interfaces';
import { EMPTY, Observable, catchError, tap } from 'rxjs';

interface State {
  languages: Language[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  http = inject(HttpClient);

  baseUrl = `${environment.baseUrl}languages/languages/`;

  #state = signal<State>({
    languages: [],
    loading: false,
  });

  changeListState(languages: Language[]) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      languages,
    }));
  }

  changeLoadingState(loading: boolean) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      loading,
    }));
  }

  public isLoading = computed<boolean>(() => this.#state().loading);
  public languages = computed<Language[]>(() => this.#state().languages);

  loadLanguages() {
    this.changeLoadingState(true);
    this.getLanguages().subscribe();
  }

  constructor() {
    this.loadLanguages();
  }

  getLanguages() {
    const url = `${this.baseUrl}`;
    return this.http.get<Language[]>(url).pipe(
      tap((languages) => {
        this.changeLoadingState(false);
        this.changeListState(languages);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  create(request: LanguageRequest): Observable<Language> {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}`;
    const fd = new FormData();
    fd.append('name', request.name);
    fd.append('code', request.code);
    fd.append('svg_flag', request.svg_flag);
    return this.http.post<Language>(url, fd).pipe(
      tap((_) => {
        this.changeLoadingState(false);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  update(id: number, request: Partial<LanguageRequest>) {
    this.changeLoadingState(true);
    const fd = new FormData();
    if(request.name) fd.append('name', request.name);
    if(request.code) fd.append('code', request.code);
    if(request.svg_flag) fd.append('svg_flag', request.svg_flag);
    const url = `${this.baseUrl}${id}/`;
    return this.http.patch<Language>(url, fd);
  }

  delete(id: number) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.delete(url);
  }
}
