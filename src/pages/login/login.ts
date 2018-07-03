import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {TabsPage} from '../tabs/tabs';

import { RegisterUserPage } from '../register-user/register-user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  cadastroRoute = RegisterUserPage;

  public email: string = "";

  public password: string = "";

  private urlUserData = "https://app-befine.herokuapp.com/login";

  public notifyHeader;

  public user;

  
  private headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  });



  private options = new RequestOptions({ headers: this.headers });

  
  constructor(public navCtrl: NavController, public navParams: NavParams,  private http: Http) {
  }

  ionViewDidLoad() {   
  }

  public login(){

    this.loginApi(this.email, this.password).subscribe(
      (parameter: any) => {
        console.log(parameter._body);
        var user = parameter._body;
        localStorage.setItem('User', user);
        var userSend: string = localStorage.getItem('User').toString();
        var routines = userSend.split('routines');
        var videos = userSend.split('videos');

        var routine: string;
        if(routines.length > 1){
          routine = routines[1];
          routine = routine.replace('{','');
          routine = routine.replace('}','');
        }
        
        var video: string = "";
        if(videos.length > 1){
          video = videos[1];
          video = video.replace('{','');
          video = video.replace('}','');
        }
  
        var path = video.split('"');
        console.log(path);
        if(path.length > 3){
          localStorage.setItem('video', path[4]);
        }
      },
      (error: any) => { console.log(error) },
      () => {
        console.log('Login Sucesso');
        this.navCtrl.push(TabsPage);
      }

    );






  }
  public loginApi(email, password): Observable<any> {

    let body: string = "email="+email+ "&password=" + password
    return this.http.post(this.urlUserData,
        body,
        this.options);
}

}
