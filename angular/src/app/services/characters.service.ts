import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private firestore: AngularFirestore) {
  }

  all(): Observable<any> {
    return this.firestore.collection('characters').snapshotChanges();
  }

  create(characters: any): Promise<any> {
    return this.firestore.collection('characters').add(characters);
  }

  update(characters: any): Promise<any> {
    return this.firestore.doc(`characters/${characters.id}`)
      .update(characters);
  }

  destroy(id: string): Promise<any> {
    return this.firestore.doc(`characters/${id}`)
      .delete();
  }


}
