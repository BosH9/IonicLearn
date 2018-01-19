import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LifeCyCleEventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-life-cy-cle-events',
  templateUrl: 'life-cy-cle-events.html',
})
export class LifeCyCleEventsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LifeCyCleEventsPage');
  }

  ionViewWillLoad(){
    console.log('ionViewWillLoad LifeCyCleEventsPage');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter LifeCyCleEventsPage');
  }

  ionViewWillLeave(){
    console.log('ionViewWillLeave LifeCyCleEventsPage');
  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave LifeCyCleEventsPage');
  }

  ionViewWillUnload(){
    console.log('ionViewWillUnload LifeCyCleEventsPage');
  }

}
