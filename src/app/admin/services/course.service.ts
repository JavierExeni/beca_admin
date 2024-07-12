import { Injectable, computed, inject, signal } from '@angular/core';
import { Course, CourseRequest } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { EMPTY, Observable, catchError, tap } from 'rxjs';

interface State {
  courses: Course[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  http = inject(HttpClient);

  baseUrl = `${environment.baseUrl}languages/courses/`;

  #state = signal<State>({
    courses: [],
    loading: false,
  });

  changeListState(course: Course[]) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      course,
    }));
  }

  changeLoadingState(loading: boolean) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      loading,
    }));
  }

  public isLoading = computed<boolean>(() => this.#state().loading);
  public courses = computed<Course[]>(() => this.#state().courses);

  loadCourses() {
    this.changeLoadingState(true);
    this.getCourses().subscribe();
  }

  constructor() {
    this.loadCourses();
  }

  getCourses() {
    const url = `${this.baseUrl}`;
    return this.http.get<Course[]>(url).pipe(
      tap((courses) => {
        this.changeLoadingState(false);
        this.changeListState(courses);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  create(request: CourseRequest): Observable<Course> {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}`;
    return this.http.post<Course>(url, request).pipe(
      tap((_) => {
        this.changeLoadingState(false);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  update(id: number, request: Partial<CourseRequest>) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.patch<Course>(url, request);
  }

  delete(id: number) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}${id}/`;
    return this.http.delete(url);
  }
}
