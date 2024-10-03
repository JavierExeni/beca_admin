import { Component } from '@angular/core';
import { BannerComponent } from '../../sections/banner/banner.component';
import { CourseListComponent } from '../../sections/course-list/course-list.component';
import { MiniBannerComponent } from '../../sections/mini-banner/mini-banner.component';
import { TeachersCarroComponent } from '../../sections/teachers-carro/teachers-carro.component';
import { BecomeTutorComponent } from '../../sections/become-tutor/become-tutor.component';
import { LandingFooterComponent } from '../../components/landing-footer/landing-footer.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [BannerComponent, CourseListComponent, MiniBannerComponent, TeachersCarroComponent, BecomeTutorComponent, LandingFooterComponent],
  templateUrl: './principal.component.html',
  styles: ``
})
export class PrincipalComponent {

}
