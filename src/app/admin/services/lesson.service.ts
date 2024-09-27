import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { Lesson, LessonRequest } from '../../interfaces';

interface State {
  lessons: Lesson[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  http = inject(HttpClient);

  baseUrl = `${environment.baseUrl}languages/lessons/`;

  #state = signal<State>({
    lessons: [],
    loading: false,
  });

  changeListState(lessons: Lesson[]) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      lessons,
    }));
  }

  changeLoadingState(loading: boolean) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      loading,
    }));
  }

  public isLoading = computed<boolean>(() => this.#state().loading);
  public lessons = computed<Lesson[]>(() => this.#state().lessons);

  loadlessons() {
    this.changeLoadingState(true);
    this.getlessons().subscribe();
  }

  loadlessonsByTopic(id: number) {
    this.changeLoadingState(true);
    this.getLessonsByTopic(id).subscribe();
  }

  getlessons() {
    const url = `${this.baseUrl}`;
    return this.http.get<Lesson[]>(url).pipe(
      tap((lessons) => {
        this.changeLoadingState(false);
        this.changeListState(lessons);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  getSingleLesson(id: number) {
    const url = `${this.baseUrl}${id}/`;
    return this.http.get<Lesson>(url);
  }

  getLessonsByTopic(id: number) {
    const url = `${this.baseUrl}${id}/get-lessons-topic/`;
    return this.http.get<Lesson[]>(url).pipe(
      tap((lessons) => {
        this.changeLoadingState(false);
        this.changeListState(lessons);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  create(request: LessonRequest): Observable<Lesson> {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}`;
    return this.http.post<Lesson>(url, request).pipe(
      tap((_) => {
        this.changeLoadingState(false);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  update(id: number, request: Partial<LessonRequest>) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.patch<Lesson>(url, request);
  }

  delete(id: number) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.delete(url);
  }

  addView(lessonId: number): Observable<Lesson> {
    const url = `${this.baseUrl}${lessonId}/add-view/`;
    return this.http.get<Lesson>(url);
  }
}
