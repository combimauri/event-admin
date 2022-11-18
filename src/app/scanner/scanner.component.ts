import { Component, OnDestroy, ViewChild } from '@angular/core';

import { Subscription, timer } from 'rxjs';
import { first } from 'rxjs/operators';

import { AuthService } from '../core/services/auth/auth.service';
import { PostulantsService } from '../core/services/postulants.service';
import { Postulant } from '../core/models/postulant.model';
import { ModalDirective } from '../shared/directives/modal/modal.directive';
import { Ticket } from '../core/models/ticket.enum';

const defaultRate = 3;

@Component({
  selector: 'wc-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnDestroy {
  currentUser$ = this.auth.getCurrentUser();
  modalMessage: string;
  postulant: Postulant;
  postulantId: string;
  postulantPoints = defaultRate;
  selectedItemForScan: string;

  registrationFields = {
    [Ticket.ROJO]: {
      firstDay: [
        {
          field: 'checkInFirstDay',
          label: 'Check In',
        },
        {
          field: 'breakfastFirstDay',
          label: 'Desayuno',
        },
        {
          field: 'lunchFirstDay',
          label: 'Almuerzo',
        },
        {
          field: 'snackFirstDay',
          label: 'Refrigerio',
        },
      ],
      secondDay: [
        {
          field: 'checkInSecondDay',
          label: 'Check In',
        },
        {
          field: 'breakfastSecondDay',
          label: 'Desayuno',
        },
        {
          field: 'lunchSecondDay',
          label: 'Almuerzo',
        },
        {
          field: 'snackSecondDay',
          label: 'Refrigerio',
        },
      ],
      souvenirs: [
        {
          field: 'shirt',
          label: 'Polera',
        },
        {
          field: 'cup',
          label: 'Tomatodo',
        },
        {
          field: 'notebook',
          label: 'Cuaderno',
        },
      ],
    },
    [Ticket.AMARILLO]: {
      firstDay: [
        {
          field: 'checkInFirstDay',
          label: 'Check In',
        },
        {
          field: 'breakfastFirstDay',
          label: 'Desayuno',
        },
        {
          field: 'lunchFirstDay',
          label: 'Almuerzo',
        },
        {
          field: 'snackFirstDay',
          label: 'Refrigerio',
        },
      ],
      secondDay: [
        {
          field: 'checkInSecondDay',
          label: 'Check In',
        },
        {
          field: 'breakfastSecondDay',
          label: 'Desayuno',
        },
        {
          field: 'lunchSecondDay',
          label: 'Almuerzo',
        },
        {
          field: 'snackSecondDay',
          label: 'Refrigerio',
        },
      ],
      souvenirs: [
        {
          field: 'shirt',
          label: 'Polera',
        },
        {
          field: 'bracelet',
          label: 'Manilla',
        },
        {
          field: 'notebook',
          label: 'Cuaderno',
        },
      ],
    },
    [Ticket.VERDE]: {
      firstDay: [
        {
          field: 'checkInFirstDay',
          label: 'Check In',
        },
        {
          field: 'breakfastFirstDay',
          label: 'Desayuno',
        },
        {
          field: 'lunchFirstDay',
          label: 'Almuerzo',
        },
      ],
      secondDay: [
        {
          field: 'checkInSecondDay',
          label: 'Check In',
        },
        {
          field: 'breakfastSecondDay',
          label: 'Desayuno',
        },
        {
          field: 'lunchSecondDay',
          label: 'Almuerzo',
        },
      ],
      souvenirs: [
        {
          field: 'shirt',
          label: 'Polera',
        },
      ],
    },
    [Ticket.AZUL]: {
      firstDay: [
        {
          field: 'checkInFirstDay',
          label: 'Check In',
        },
        {
          field: 'breakfastFirstDay',
          label: 'Desayuno',
        },
      ],
      secondDay: [
        {
          field: 'checkInSecondDay',
          label: 'Check In',
        },
        {
          field: 'breakfastSecondDay',
          label: 'Desayuno',
        },
      ],
      souvenirs: [
        {
          field: 'shirt',
          label: 'Polera',
        },
      ],
    },
  };

  workshops = [
    {
      field: 'firstWorkshop',
      label: 'Automatiza procesos en tus Angular Apps con Github Actions',
    },
    {
      field: 'secondWorkshop',
      label:
        'Crea tu propia inteligencia artificial con pocos conocimientos de programación',
    },
  ];

  Ticket = Ticket;

  @ViewChild('postulantProcessedModal', { static: true })
  private postulantModal: ModalDirective;

  private postulantSubscription: Subscription;

  constructor(
    public postulantsService: PostulantsService,
    private auth: AuthService,
  ) {}

  ngOnDestroy(): void {
    this.postulantSubscription?.unsubscribe();
  }

  processQRCode(postulantId: string): void {
    if (!this.postulantId && postulantId) {
      this.postulantId = encodeURIComponent(postulantId);

      if (this.postulantSubscription) {
        this.postulantSubscription.unsubscribe();
      }

      this.postulantSubscription = this.postulantsService
        .getById(this.postulantId)
        .pipe(first())
        .subscribe((postulant) => {
          if (postulant) {
            this.modalMessage = 'La lectura del credencial fue exitosa';
            this.postulant = postulant;
          } else {
            this.modalMessage = 'Esto no parece un credencial válido';
          }

          timer(100).subscribe(() => this.postulantModal.modalInstance.open());
        });
    }
  }

  cleanData(): void {
    this.postulantId = '';
    this.postulant = null;
    this.postulantSubscription?.unsubscribe();
  }
}
