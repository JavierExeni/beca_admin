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
  providedIn: 'root',
})
export class CourseService {
  http = inject(HttpClient);

  baseUrl = `${environment.baseUrl}languages/courses/`;

  #state = signal<State>({
    courses: [],
    loading: false,
  });

  changeListState(courses: Course[]) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      courses,
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

  constructor() {
    this.loadCourses();
  }

  loadCourses() {
    this.changeLoadingState(true);
    this.getCourses().subscribe();
  }

  loadClientCourses() {
    this.changeLoadingState(true);
    this.getClientCourses().subscribe();
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

  getSingleCourse(id: number) {
    const url = `${this.baseUrl}${id}/`;
    return this.http.get<Course>(url);
  }

  getClientCourses() {
    const url = `${this.baseUrl}user/courses/`;
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

  addClient(courseId: number): Observable<Course> {
    const url = `${this.baseUrl}${courseId}/add-client/`;
    return this.http.get<Course>(url);
  }
}
