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
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
    this.getUserData();
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter UsersPage');
    //this.getUserData();
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
          var u: User;
          
          for (var i = 0; i < res.rows.length; i++) {
            u=new User();
            u.name = res.rows.item(i).name;
            u.city = res.rows.item(i).city;
            u.address = res.rows.item(i).address;
            u.gender = res.rows.item(i).gender;
            u.image = res.rows.item(i).image;
            u.dob = res.rows.item(i).dob;
            u.timestamp = res.rows.item(i).timestamp;
            u.rowid=res.rows.item(i).rowid;
            this.users.push(u);
          }
          console.log(this.users);
        })
        .catch(e => console.log(e));
    });
  }

  addUser(){
    this.navCtrl.push(ProfileaddPage);
  }

  editUser(rowidd){
    this.navCtrl.push(ProfileaddPage,{rowid:rowidd});
  }

  reloadData(refresher){
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
          var u: User;
          
          for (var i = 0; i < res.rows.length; i++) {
            u=new User();
            u.name = res.rows.item(i).name;
            u.city = res.rows.item(i).city;
            u.address = res.rows.item(i).address;
            u.gender = res.rows.item(i).gender;
            u.image = res.rows.item(i).image;
            u.dob = res.rows.item(i).dob;
            u.timestamp = res.rows.item(i).timestamp;
            u.rowid=res.rows.item(i).rowid;
            this.users.push(u);
          }
          console.log(this.users);
        })
        .catch(e => console.log(e));
    }).then((x)=>{
      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
    })
  }

}
