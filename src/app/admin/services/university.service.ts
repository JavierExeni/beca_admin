import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { University, UniversityRequest } from '../../interfaces';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

interface State {
  universities: University[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  http = inject(HttpClient);

  baseUrl = `${environment.baseUrl}becademia/collages/`;

  #state = signal<State>({
    universities: [],
    loading: false,
  });

  changeListState(universities: University[]) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      universities,
    }));
  }

  changeLoadingState(loading: boolean) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      loading,
    }));
  }

  public isLoading = computed<boolean>(() => this.#state().loading);
  public universities = computed<University[]>(() => this.#state().universities);

  loadUniversities() {
    this.changeLoadingState(true);
    this.getUniversities().subscribe();
  }

  constructor() {
    this.loadUniversities();
  }

  getUniversities() {
    const url = `${this.baseUrl}`;
    return this.http.get<University[]>(url).pipe(
      tap((universities) => {
        this.changeLoadingState(false);
        this.changeListState(universities);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  create(request: UniversityRequest): Observable<University> {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}`;
    return this.http.post<University>(url, request).pipe(
      tap((_) => {
        this.changeLoadingState(false);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  update(id: number, request: Partial<UniversityRequest>) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.patch<University>(url, request);
  }

  delete(id: number) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.delete(url);
  }
}
