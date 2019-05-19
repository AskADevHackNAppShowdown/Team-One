import { Component } from '@angular/core';
import * as blockstack from 'blockstack';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private appConfig: any;
  private uSession: BehaviorSubject<any> = new BehaviorSubject('');
  private uData: BehaviorSubject<any> = new BehaviorSubject('');
  private uProfile: BehaviorSubject<any> = new BehaviorSubject('');
  title = 'secure-chat';

  constructor() {
    this.appConfig = new blockstack.AppConfig();
    this.uSession.next(
      new blockstack.UserSession({ appConfig: this.appConfig })
    );

    if (this.uSession.value.isUserSignedIn()) {
      const userData = this.uSession.value.loadUserData();
      this.uData.next(userData);
      this.updateUserProfile(userData.profile);
     } else if (this.uSession.value.isSignInPending()) {
       blockstack.handlePendingSignIn()
       .then(userData => {
        this.uData.next(userData);
        this.updateUserProfile(userData.profile);
       });
     }

  }

  private updateUserProfile(uData) {
    const person = new blockstack.Person(uData)._profile;
    console.log(person)
    this.uProfile.next(new blockstack.Person(person));
  }
}
