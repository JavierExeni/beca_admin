import { computed, inject, Injectable, signal } from '@angular/core';
import { NavMenu } from '../types';
import { AuthService } from '../../authentication/auth.service';
import { USER_TYPE } from '../enum';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  toggleMenuState = signal(true);
  authService = inject(AuthService);

  adminNavigationOptions = signal<NavMenu[]>([
    {
      category: 'Menu',
      childrens: [
        {
          option: 'Usuarios',
          route: '',
          icon: 'fa-users',
          visible: true,
          hasChildrens: true,
          childrens: [
            {
              option: 'Clientes',
              route: 'usuarios/clientes',
              icon: 'fa-user',
              visible: true,
              hasChildrens: false,
              childrens: null,
            },
            {
              option: 'Profesores',
              route: 'usuarios/profesores',
              icon: 'fa-user',
              visible: true,
              hasChildrens: false,
              childrens: null,
            },
          ],
        },
        {
          option: 'Universidades',
          route: 'beca/universidades',
          icon: 'fa-building-columns',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Becas',
          route: 'beca/becas',
          icon: 'fa-medal',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },

        {
          option: 'Webinars',
          route: 'beca/webinars',
          icon: 'fa-clapperboard',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
      ],
    },
    {
      category: 'Parametros',
      childrens: [
        {
          option: 'Paises',
          route: 'parametros/paises',
          icon: 'fa-earth-americas',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Ciudades',
          route: 'parametros/ciudades',
          icon: 'fa-city',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Lenguajes',
          route: 'parametros/lenguajes',
          icon: 'fa-language',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Niveles',
          route: 'parametros/niveles',
          icon: 'fa-layer-group',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Temas',
          route: 'parametros/temas',
          icon: 'fa-tags',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Lecciones',
          route: 'parametros/lecciones',
          icon: 'fa-person-chalkboard',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Evaluaciones',
          route: 'parametros/evaluaciones',
          icon: 'fa-book',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
      ],
    },
  ]);

  clientNavigationOptions = signal<NavMenu[]>([
    {
      category: 'Navegación',
      childrens: [
        {
          option: 'Dashboard',
          route: 'parametros/temas',
          icon: 'fa-chart-line',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Mis Webinars',
          route: 'parametros/temas',
          icon: 'fa-video',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Mis Cursos',
          route: 'parametros/temas',
          icon: 'fa-pencil',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Mis Becas',
          route: 'parametros/temas',
          icon: 'fa-graduation-cap',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
      ],
    },
  ]);

  public navigationOptions = computed<NavMenu[]>(() =>
    this.authService.role() == USER_TYPE.ADMIN
      ? this.adminNavigationOptions()
      : this.clientNavigationOptions()
  );

  changeMenuState(newSate: boolean) {
    this.toggleMenuState.set(newSate);
  }
}
