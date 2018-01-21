import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../user';


/**
 * Generated class for the ProfileaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profileadd',
  templateUrl: 'profileadd.html',
})
export class ProfileaddPage {
  public user:User;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alrtCtrl:AlertController) {
    this.user=new User();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileaddPage');
  }
  save(){
    console.log(this.user);
  }
  showConditions(){
    let alrt = this.alrtCtrl.create({
      title:'Terms',
      subTitle:'1) You are 18 years old or more<br>2) You should be indian citizen<br>3) Another rule',
      buttons:['OK']
    });
    alrt.present();
  }

}
