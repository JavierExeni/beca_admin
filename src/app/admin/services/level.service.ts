import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { Level, LevelRequest } from '../../interfaces';

interface State {
  levels: Level[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  http = inject(HttpClient);

  baseUrl = `${environment.baseUrl}languages/levels/`;

  #state = signal<State>({
    levels: [],
    loading: false,
  });

  changeListState(levels: Level[]) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      levels,
    }));
  }

  changeLoadingState(loading: boolean) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      loading,
    }));
  }

  public isLoading = computed<boolean>(() => this.#state().loading);
  public levels = computed<Level[]>(() => this.#state().levels);

  loadLevels() {
    this.changeLoadingState(true);
    this.getLevels().subscribe();
  }

  constructor() {
    this.loadLevels();
  }

  getLevels() {
    const url = `${this.baseUrl}`;
    return this.http.get<Level[]>(url).pipe(
      tap((levels) => {
        this.changeLoadingState(false);
        this.changeListState(levels);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  create(request: LevelRequest): Observable<Level> {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}`;
    return this.http.post<Level>(url, request).pipe(
      tap((_) => {
        this.changeLoadingState(false);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  update(id: number, request: Partial<LevelRequest>) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.patch<Level>(url, request);
  }

  delete(id: number) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.delete(url);
  }
}
