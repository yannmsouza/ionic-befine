import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {TabsPage} from '../tabs/tabs';

/**
 * Generated class for the RegisterUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {

  public name: string = "";
  public email: string = "";
  public password: string = "";
  public age: number = 18;
  public type: number = 1;
  

  private url = "http://app-befine.herokuapp.com/user";

  constructor(public navCtrl: NavController, public navParams: NavParams,  private http: Http) {
  }

  ionViewDidLoad() {
    
  }

  private headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  private options = new RequestOptions({ headers: this.headers });

  public signIn(){

    this.signInApi(this.name, this.email, this.password, this.age, this.type).subscribe(
      (parameter: any) => {
        console.log(parameter._body);
      },
      (error: any) => { console.log(error)},
      () => {
        
        this.navCtrl.push(TabsPage);
      }
    )
  }

  public signInApi(name, email, password, age, type): Observable<any> {

    let body: string = "name="+name+"&email="+email+ "&password="+password+"&age="+age+"&type="+type
    return this.http.post(this.url,
        body,
        this.options);
}


}
