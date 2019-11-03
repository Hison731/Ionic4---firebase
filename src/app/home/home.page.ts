import { Component } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  buttonlist: any = [];

  constructor(
    private firestore: AngularFirestore
  ) {
    this.read_Students().subscribe(data => {

      this.buttonlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          buttonId: e.payload.doc.data()['buttonId'],
          buttontext: e.payload.doc.data()['buttontext'],
          clicked: e.payload.doc.data()['clicked'],
        };
      })
      console.log(this.buttonlist);

    });
  }

  read_Students() {
    return this.firestore.collection('Button').snapshotChanges();
  }

  update_button(recordID, record) {
    this.firestore.doc('Button/' + recordID).update(record);
  }

  UpdateRecord(recordRow) {
    let record = {};
    const target_id = this.buttonlist[recordRow].id;
    const clicked = this.buttonlist[recordRow].clicked;
    if (!clicked) {
      record['clicked'] = true;
      record['buttontext'] = this.buttonlist[recordRow].buttontext + ' Clicked';
      this.update_button(target_id, record);
    }

  }

}
