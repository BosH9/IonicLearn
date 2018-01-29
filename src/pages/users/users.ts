import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { User } from '../../user';
import { ProfileaddPage } from '../profileadd/profileadd';

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
  user: User;
  users: User[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
    this.user = new User();

    // let u = storage.get('user').then((val)=>{
    //   this.user=val;
    //   console.log(val);
    // });
    this.getUserData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  getUserData() {
    this.sqlite.create({
      name: 'ionicusersampledb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql(`CREATE TABLE IF NOT EXISTS usersample(rowid INTEGER PRIMARY KEY,name TEXT, 
        address TEXT, gender TEXT, city TEXT, image TEXT, dob TEXT, timestamp INT )`, {})
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));

      db.executeSql('SELECT * FROM usersample ORDER BY rowid DESC', {})
        .then(res => {
          this.users = [];
          for (var i = 0; i < res.rows.length; i++) {
            this.user.name = res.rows.item(i).name;
            this.user.city = res.rows.item(i).city;
            this.user.address = res.rows.item(i).address;
            this.user.gender = res.rows.item(i).gender;
            this.user.image = res.rows.item(i).image;
            this.user.dob = res.rows.item(i).dob;
            this.user.timestamp = res.rows.item(i).timestamp;
            this.users.push(this.user);
          }
        })
        .catch(e => console.log(e));
    })
  }

  addUser(){
    this.navCtrl.push(ProfileaddPage);
  }

  editUser(rowid){
    this.navCtrl.push(ProfileaddPage,{rowid:rowid});
  }

}
