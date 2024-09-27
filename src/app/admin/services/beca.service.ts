import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Beca, BecaRequest } from '../../interfaces';
import { catchError, concatMap, EMPTY, Observable, tap } from 'rxjs';

interface State {
  becas: Beca[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BecaService {
  http = inject(HttpClient);

  baseUrl = `${environment.baseUrl}becademia/scholarships/`;

  #state = signal<State>({
    becas: [],
    loading: false,
  });

  changeListState(becas: Beca[]) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      becas,
    }));
  }

  changeLoadingState(loading: boolean) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      loading,
    }));
  }

  public isLoading = computed<boolean>(() => this.#state().loading);
  public becas = computed<Beca[]>(() => this.#state().becas);

  loadBecas() {
    this.changeLoadingState(true);
    this.getBecas().subscribe();
  }

  loadActiveBecas() {
    this.changeLoadingState(true);
    this.getActiveBecas().subscribe();
  }

  constructor() {
    this.loadBecas();
  }

  getBecas() {
    const url = `${this.baseUrl}`;
    return this.http.get<Beca[]>(url).pipe(
      tap((becas) => {
        this.changeLoadingState(false);
        this.changeListState(becas);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  getActiveBecas() {
    const url = `${this.baseUrl}user/scholarships/`;
    return this.http.get<Beca[]>(url).pipe(
      tap((becas) => {
        this.changeLoadingState(false);
        this.changeListState(becas);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  create(request: BecaRequest): Observable<Beca> {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}`;
    return this.http.post<Beca>(url, request).pipe(
      tap((_) => {
        this.changeLoadingState(false);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  update(id: number, request: Partial<BecaRequest>) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.patch<Beca>(url, request);
  }

  delete(id: number) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.delete(url);
  }

  followOrUnfollow(scholarshipId: number): Observable<Beca[]> {
    const url = `${this.baseUrl}${scholarshipId}/follow/`;
    return this.http
      .get<Beca[]>(url)
      .pipe(concatMap(() => this.getActiveBecas()));
  }
}
