import { Component } from '@angular/core';
import { LandingHeadComponent } from './components/landing-head/landing-head.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, LandingHeadComponent],
  templateUrl: './layout.component.html',
  styles: ``,
})
export class LayoutComponent {}
