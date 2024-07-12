import { Component, input } from '@angular/core';
import { NavOption } from '../../../types';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav-item',
  standalone: true,
  imports: [NgClass, NgIf, NgStyle, RouterLink, RouterLinkActive],
  templateUrl: './sidenav-item.component.html',
  styles: ``,
})
export class SidenavItemComponent {
  navOption = input.required<NavOption>();

  toggleOptions = false;
}
