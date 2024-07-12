import { Component, input } from '@angular/core';
import { SidenavItemComponent } from '../sidenav-item/sidenav-item.component';
import { NavMenu } from '../../../types';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-sidenav-menu',
  standalone: true,
  imports: [SidenavItemComponent, NgFor],
  templateUrl: './sidenav-menu.component.html',
  styles: ``
})
export class SidenavMenuComponent {
  navMenuOption = input.required<NavMenu>()
}
