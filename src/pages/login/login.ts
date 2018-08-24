import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { User } from '../../providers';
import { MainPage } from '../';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { username: string, password: string } = {
    username: '',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loginService: LoginServiceProvider,
    public events: Events) {
      events.subscribe('user:created', (user, time) => {
this.navCtrl.push(MainPage);
      });  
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
 /* doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }*/

  doLogin(){
   this.loginService.login(this.account);
/*
   if(this.loginService.IsAuthenticated()) {
    this.navCtrl.push(MainPage);
  }else {
    this.navCtrl.push(MainPage);
    // Unable to log in
    let toast = this.toastCtrl.create({
      message: this.loginErrorString,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }*/
  }
}
