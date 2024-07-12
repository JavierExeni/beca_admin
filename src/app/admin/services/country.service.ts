import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Country, CountryRequest } from '../../interfaces';
import { EMPTY, Observable, catchError, tap } from 'rxjs';

interface State {
  countries: Country[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  http = inject(HttpClient);

  baseUrl = `${environment.baseUrl}parameters/countries/`;

  #state = signal<State>({
    countries: [],
    loading: false,
  });

  changeListState(countries: Country[]) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      countries,
    }));
  }

  changeLoadingState(loading: boolean) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      loading,
    }));
  }

  public isLoading = computed<boolean>(() => this.#state().loading);
  public countries = computed<Country[]>(() => this.#state().countries);

  loadCountries() {
    this.changeLoadingState(true);
    this.getCountries().subscribe();
  }

  constructor() {
    this.loadCountries();
  }

  getCountries() {
    const url = `${this.baseUrl}`;
    return this.http.get<Country[]>(url).pipe(
      tap((countries) => {
        this.changeLoadingState(false);
        this.changeListState(countries);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  create(request: CountryRequest): Observable<Country> {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}`;
    const fd = new FormData();
    fd.append('name', request.name);
    fd.append('code', request.code);
    fd.append('svg_flag', request.svg_flag);
    return this.http.post<Country>(url, fd).pipe(
      tap((_) => {
        this.changeLoadingState(false);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  update(id: number, request: Partial<CountryRequest>) {
    this.changeLoadingState(true);
    const fd = new FormData();
    if(request.name) fd.append('name', request.name);
    if(request.code) fd.append('code', request.code);
    if(request.svg_flag) fd.append('svg_flag', request.svg_flag);
    const url = `${this.baseUrl}${id}/`;
    return this.http.patch<Country>(url, fd);
  }

  delete(id: number) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.delete(url);
  }
}
