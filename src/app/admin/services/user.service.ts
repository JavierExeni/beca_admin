import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Client, Teacher, User, UserRequest } from '../../interfaces';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

interface State {
  clients: Client[];
  teachers: Teacher[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  baseUrl = `${environment.baseUrl}auth/`;

  #state = signal<State>({
    clients: [],
    teachers: [],
    loading: false,
  });

  changeClientListState(clients: Client[]) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      clients,
    }));
  }

  changeTeacherListState(teachers: Teacher[]) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      teachers,
    }));
  }

  changeLoadingState(loading: boolean) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      loading,
    }));
  }

  public isLoading = computed<boolean>(() => this.#state().loading);
  public clients = computed<Client[]>(() => this.#state().clients);
  public teachers = computed<Client[]>(() => this.#state().teachers);

  loadClients() {
    this.changeLoadingState(true);
    this.getClients().subscribe();
  }

  loadAdmins() {
    this.changeLoadingState(true);
    this.getAdmins().subscribe();
  }

  loadTeachers() {
    this.changeLoadingState(true);
    this.getTeachers().subscribe();
  }

  constructor() {}

  getClients() {
    const url = `${this.baseUrl}clients/`;
    return this.http.get<Client[]>(url).pipe(
      tap((clients) => {
        this.changeLoadingState(false);
        this.changeClientListState(clients);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  getAdmins() {
    const url = `${this.baseUrl}admins/`;
    return this.http.get<Client[]>(url).pipe(
      tap((clients) => {
        this.changeLoadingState(false);
        this.changeClientListState(clients);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  getTeachers() {
    const url = `${this.baseUrl}teacher/`;
    return this.http.get<Client[]>(url).pipe(
      tap((teachers) => {
        this.changeLoadingState(false);
        this.changeTeacherListState(teachers);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  getUser(id: number) {
    const url = `${this.baseUrl}users/${id}/`;
    return this.http.get<User>(url);
  }

  create(request: UserRequest): Observable<User> {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}users/`;
    return this.http.post<User>(url, request).pipe(
      tap((_) => {
        this.changeLoadingState(false);
      }),
      catchError(() => {
        this.changeLoadingState(false);
        return EMPTY;
      })
    );
  }

  update(id: number, request: Partial<UserRequest>) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}users/${id}/`;
    return this.http.patch<User>(url, request);
  }

  delete(id: number) {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}users/${id}/`;
    return this.http.delete(url);
  }
}
