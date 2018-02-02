import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LeaveObj } from '../time-off-request/time-off-request';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LeavesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-leaves',
  templateUrl: 'leaves.html',
})
export class LeavesPage {
  Leaves: LeaveObj[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage) {
    this.storage.get('leaves').then((v)=>{
      this.Leaves=v;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeavesPage');
  }

}
