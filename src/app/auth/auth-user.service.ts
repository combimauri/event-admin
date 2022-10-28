import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '../shared/models/data-service.model';
import { AuthUser } from '../shared/models/auth-user.model';
import { FirestoreCollection } from '../shared/models/firestore-collection.enum';

@Injectable()
export class AuthUserService extends DataService<AuthUser> {
  constructor(db: AngularFirestore) {
    super(db, FirestoreCollection.users);
  }

  assertAuthUser(firebaseUser: User): Observable<void> {
    return this.getById(firebaseUser.uid).pipe(
      map((user) => {
        if (!user) {
          user = {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            deleted: false,
            roles: {
              speaker: true,
            },
          };

          this.upsertData(user);
        }
      }),
    );
  }
}
