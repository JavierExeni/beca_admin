import { Component, inject } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AsyncPipe, NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { map, Observable, tap } from 'rxjs';

import { Webinar } from '../../../interfaces';

import { CommentsBoxComponent } from '../../components/comments-box/comments-box.component';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-webinar-detail',
  standalone: true,
  imports: [
    YouTubePlayerModule,
    AsyncPipe,
    CommentsBoxComponent,
    BreadcrumbModule,
    NgClass,
  ],
  templateUrl: './webinar-detail.component.html',
  styles: ``,
})
export class WebinarDetailComponent {
  activatedRoute = inject(ActivatedRoute);

  items: MenuItem[] = [
    { icon: 'fa-solid fa-house', route: '/' },
    { label: 'Webinars', route: '/public/webinars' },
  ];

  webinar$: Observable<Webinar> = this.activatedRoute.data.pipe(
    tap(({ webinar }) => {
      this.items.push(
        { label: webinar.title },
      );
    }),
    map(({ webinar }) => webinar)
  );
}
