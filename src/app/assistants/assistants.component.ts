import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../core/services/auth/auth.service';
import { Postulant } from '../core/models/postulant.model';
import { PostulantsService } from '../core/services/postulants.service';
import { Ticket } from '../core/models/ticket.enum';

@Component({
  selector: 'wc-assistants',
  templateUrl: './assistants.component.html',
  styleUrls: ['./assistants.component.scss'],
})
export class AssistantsComponent implements OnInit, OnDestroy {
  assistants: Postulant[];
  currentAssistant: Postulant;
  currentUser$ = this.auth.getCurrentUser();
  searchTerm = '';

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

  private unsubscribe$ = new Subject<void>();

  constructor(
    public postulantsService: PostulantsService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.postulantsService
      .getAcceptedPostulants()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((assistants) => {
        this.assistants = assistants;
        this.searchAssistant();
        this.currentAssistant = this.assistants[0];
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  searchAssistant(): void {
    if (this.searchTerm) {
      this.assistants.forEach(
        (assistant) =>
          (assistant.visibleInSearch = assistant.fullName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())),
      );
    } else {
      this.assistants.forEach(
        (assistant) => (assistant.visibleInSearch = true),
      );
    }
  }
}
