import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthDecoded, AuthResponse, LoginRequest, User } from '../interfaces';
import { environment } from '../../environments/environment.development';
import { concatMap, Observable, tap } from 'rxjs';

import { jwtDecode } from 'jwt-decode';
import { PersistanceService } from '../shared/services/persistance.service';
import { UserService } from '../admin/services/user.service';
import { Router } from '@angular/router';

interface State {
  user: User | null;
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private userService = inject(UserService);
  private persistanceService = inject(PersistanceService);

  private readonly baseUrl = `${environment.baseUrl}`;

  #state = signal<State>({
    user: null,
    loading: false,
  });

  changeUserState(user: User | null) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      user,
    }));
  }

  changeLoadingState(loading: boolean) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      loading,
    }));
  }

  public isLoading = computed<boolean>(() => this.#state().loading);
  public user = computed<User | null>(() => this.#state().user);
  public isLoggedIn = computed<boolean>(() =>
    this.persistanceService.get('accessToken') ? true : false
  );
  public currentLoggedUser = computed<User>(() =>
    this.isLoggedIn() && this.user()
      ? this.user()
      : this.persistanceService.get('currentUser')
  );

  login(data: LoginRequest): Observable<User> {
    const url = `${this.baseUrl}token/`;
    this.changeLoadingState(true);
    return this.http.post<AuthResponse>(url, data).pipe(
      concatMap(({ access }) => {
        const decoded: AuthDecoded = jwtDecode(access);
        this.persistanceService.set('accessToken', access);
        return this.userService.getUser(decoded.user_id);
      }),
      tap((user) => {
        this.changeLoadingState(false);
        this.persistanceService.set('currentUser', user);
        this.changeUserState(user);
      })
    );
  }

  logout() {
    localStorage.clear();
    this.changeUserState(null);
    this.router.navigate(['/login']);
  }
}
