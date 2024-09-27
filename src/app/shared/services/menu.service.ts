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
              option: 'Administradores',
              route: '/admin/usuarios/administradores',
              icon: 'fa-user',
              visible: true,
              hasChildrens: false,
              childrens: null,
            },
            {
              option: 'Clientes',
              route: '/admin/usuarios/clientes',
              icon: 'fa-user',
              visible: true,
              hasChildrens: false,
              childrens: null,
            },
            {
              option: 'Profesores',
              route: '/admin/usuarios/profesores',
              icon: 'fa-user',
              visible: true,
              hasChildrens: false,
              childrens: null,
            },
          ],
        },
        {
          option: 'Universidades',
          route: '/admin/beca/universidades',
          icon: 'fa-building-columns',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Becas',
          route: '/admin/beca/becas',
          icon: 'fa-medal',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },

        {
          option: 'Webinars',
          route: '/admin/beca/webinars',
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
          route: '/admin/parametros/paises',
          icon: 'fa-earth-americas',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Ciudades',
          route: '/admin/parametros/ciudades',
          icon: 'fa-city',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Lenguajes',
          route: '/admin/parametros/lenguajes',
          icon: 'fa-language',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Niveles',
          route: '/admin/parametros/niveles',
          icon: 'fa-layer-group',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Cursos',
          route: '/admin/parametros/cursos',
          icon: 'fa-tags',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
      ],
    },
  ]);

  teacherNavigationOptions = signal<NavMenu[]>([
    {
      category: 'Menu',
      childrens: [
        {
          option: 'Webinars',
          route: '/admin/beca/webinars',
          icon: 'fa-clapperboard',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Cursos',
          route: '/admin/parametros/cursos',
          icon: 'fa-pencil',
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
        // {
        //   option: 'Dashboard',
        //   route: '/public/dashboard',
        //   icon: 'fa-chart-line',
        //   visible: true,
        //   hasChildrens: false,
        //   childrens: null,
        // },
        {
          option: 'Mis Webinars',
          route: '/public/webinars',
          icon: 'fa-video',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Mis Cursos',
          route: '/public/cursos',
          icon: 'fa-pencil',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
        {
          option: 'Mis Becas',
          route: '/public/becas',
          icon: 'fa-graduation-cap',
          visible: true,
          hasChildrens: false,
          childrens: null,
        },
      ],
    },
  ]);

  public navigationOptions = computed<NavMenu[]>(() => {
    switch (this.authService.role()) {
      case USER_TYPE.ADMIN:
        return this.adminNavigationOptions();
      case USER_TYPE.TEACHER:
        return this.teacherNavigationOptions();
      case USER_TYPE.CLIENT:
        return this.clientNavigationOptions();
      default:
        return [];
    }
  });

  changeMenuState(newSate: boolean) {
    this.toggleMenuState.set(newSate);
  }
}
