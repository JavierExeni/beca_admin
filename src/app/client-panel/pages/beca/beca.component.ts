import { Component, inject, OnInit } from '@angular/core';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BecaService } from '../../../admin/services/beca.service';
import { DatePipe, NgClass } from '@angular/common';
import { Beca } from '../../../interfaces';
import { GoogleMapFormatCodePipe } from '../../../shared/pipes/google-map-format-code.pipe';

@Component({
  selector: 'app-beca',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    DatePipe,
    GoogleMapFormatCodePipe,
    NgClass,
  ],
  templateUrl: './beca.component.html',
  styles: ``,
})
export class BecaComponent implements OnInit {
  becaService = inject(BecaService);

  ngOnInit(): void {
    this.becaService.loadActiveBecas();
  }

  changeFollowStateBeca(beca: Beca) {
    this.becaService.followOrUnfollow(beca.id).subscribe();
  }
}
