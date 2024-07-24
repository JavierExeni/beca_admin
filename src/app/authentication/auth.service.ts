import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthDecoded, AuthResponse, LoginRequest, User } from '../interfaces';
import { environment } from '../../environments/environment.development';
import { concatMap, Observable, tap } from 'rxjs';

import { jwtDecode } from 'jwt-decode';
import { PersistanceService } from '../shared/services/persistance.service';
import { UserService } from '../admin/services/user.service';
import { Router } from '@angular/router';
import { USER_TYPE } from '../shared/enum';

interface State {
  user: User | null;
  role: USER_TYPE | null;
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
    role: null,
    loading: false,
  });

  changeUserState(user: User | null) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      user,
    }));
  }

  changeRoleState(role: USER_TYPE | null) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      role,
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
  public role = computed<USER_TYPE | null>(() =>
    this.isLoggedIn() && this.#state().role
      ? this.#state().role
      : this.persistanceService.get('currentRole')
  );

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
        this.changeRoleState(decoded.user_role);
        this.persistanceService.set('accessToken', access);
        this.persistanceService.set('currentRole', decoded.user_role);
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
