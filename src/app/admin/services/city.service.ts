import { Injectable, computed, inject, signal } from '@angular/core';
import { City, CityRequest } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { EMPTY, Observable, catchError, tap } from 'rxjs';

interface State {
  cities: City[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CityService {
  http = inject(HttpClient);

  baseUrl = `${environment.baseUrl}parameters/cities/`;

  #state = signal<State>({
    cities: [],
    loading: false,
  });

  changeListState(cities: City[]) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      cities,
    }));
  }

  changeLoadingState(loading: boolean) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      loading,
    }));
  }

  public isLoading = computed<boolean>(() => this.#state().loading);
  public cities = computed<City[]>(() => this.#state().cities);

  loadCities() {
    this.changeLoadingState(true);
    this.getCities().subscribe();
  }

  constructor() {
    this.loadCities();
  }

  getCities() {
    const url = `${this.baseUrl}`;
    return this.http.get<City[]>(url).pipe(
      tap((cities) => {
        this.changeLoadingState(false);
        this.changeListState(cities);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  create(request: CityRequest): Observable<City> {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}`;
    return this.http.post<City>(url, request).pipe(
      tap((_) => {
        this.changeLoadingState(false);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  update(id: number, request: Partial<CityRequest>) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.patch<City>(url, request);
  }

  delete(id: number) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.delete(url);
  }
}
