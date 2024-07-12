import { Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu.service';

import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { NgFor } from '@angular/common';
import { NavMenu } from '../../types';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [SidenavMenuComponent, NgFor],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent {
  menuService = inject(MenuService);

  get toggleState(): boolean {
    return this.menuService.toggleMenuState();
  }

  get navigationOptions(): NavMenu[] {
    return this.menuService.navigationOptions();
  }
}
