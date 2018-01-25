import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../user';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  user:User;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage) {
    this.user = new User();

    let u = storage.get('user').then((val)=>{
      this.user=val;
      console.log(val);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

}
