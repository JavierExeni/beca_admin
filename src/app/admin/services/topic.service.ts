import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { environment } from '../../../environments/environment.development';

import { Topic, TopicRequest } from '../../interfaces';
import { EMPTY, Observable, catchError, tap } from 'rxjs';

interface State {
  topics: Topic[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  http = inject(HttpClient);

  baseUrl = `${environment.baseUrl}languages/topics/`;

  #state = signal<State>({
    topics: [],
    loading: false,
  });

  changeListState(topics: Topic[]) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      topics,
    }));
  }

  changeLoadingState(loading: boolean) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      loading,
    }));
  }

  public isLoading = computed<boolean>(() => this.#state().loading);
  public topics = computed<Topic[]>(() => this.#state().topics);

  loadTopics() {
    this.changeLoadingState(true);
    this.getTopics().subscribe();
  }

  constructor() {
    this.loadTopics();
  }

  getTopics() {
    const url = `${this.baseUrl}`;
    return this.http.get<Topic[]>(url).pipe(
      tap((topics) => {
        this.changeLoadingState(false);
        this.changeListState(topics);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  create(request: TopicRequest): Observable<Topic> {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}`;
    return this.http.post<Topic>(url, request).pipe(
      tap((_) => {
        this.changeLoadingState(false);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  update(id: number, request: Partial<TopicRequest>) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.patch<Topic>(url, request);
  }

  delete(id: number) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.delete(url);
  }
}
