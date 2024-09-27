import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { WebinarService } from '../../../admin/services/webinar.service';
import { WebinarDetailComponent } from '../webinar-detail/webinar-detail.component';
import { Webinar } from '../../../interfaces';

@Component({
  selector: 'app-webinar',
  standalone: true,
  imports: [NgFor, RouterLink, WebinarDetailComponent],
  templateUrl: './webinar.component.html',
  styles: ``,
})
export class WebinarComponent {
  webinarService = inject(WebinarService);
  router = inject(Router);

  // videoClic(stateChange: YT.OnStateChangeEvent, webinarId: any) {
  //   const youtubeState = stateChange.target.getPlayerState();
  //   if (youtubeState == YT.PlayerState.UNSTARTED) {
  //     console.log('playing');
  //     this.router.navigate(['/public/webinars', webinarId]);
  //   }
  // }
}
