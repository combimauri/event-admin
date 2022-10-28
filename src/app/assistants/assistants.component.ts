import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { AuthUser } from '../shared/models/auth-user.model';
import { Postulant } from '../shared/models/postulant.model';
import { PostulantsService } from '../shared/services/postulants.service';

@Component({
  selector: 'wc-assistants',
  templateUrl: './assistants.component.html',
  styleUrls: ['./assistants.component.scss'],
})
export class AssistantsComponent implements OnInit, OnDestroy {
  searchTerm = '';
  rfidInputEnabled = false;
  currentUser$: Observable<AuthUser>;
  currentAssistant: Postulant;
  assistants: Postulant[];
  assistantsSubscription: Subscription;

  constructor(
    public postulantsService: PostulantsService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.auth.getCurrentUser();
    this.assistantsSubscription = this.postulantsService
      .getConfirmedPostulants()
      .subscribe((assistants) => {
        this.assistants = assistants;
        this.searchAssistant();
        this.currentAssistant = this.assistants[0];
      });
  }

  ngOnDestroy(): void {
    this.assistantsSubscription.unsubscribe();
  }

  searchAssistant(): void {
    if (this.searchTerm) {
      this.assistants.forEach((assistant) => {
        assistant.visibleInSearch = assistant.fullName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
    } else {
      this.assistants.forEach((assistant) => {
        assistant.visibleInSearch = true;
      });
    }
  }

  enableEditingRFID(assistant: Postulant): void {
    this.rfidInputEnabled = true;
    this.currentAssistant = assistant;
  }

  saveAssistantRFID(currentUser: AuthUser, assistant: Postulant): void {
    this.postulantsService.giveRFIDToPostulant(
      currentUser,
      assistant,
      assistant.rfid,
    );
    this.rfidInputEnabled = false;
  }
}
