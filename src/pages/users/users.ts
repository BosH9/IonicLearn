import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
//import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { User } from '../../user';
import { ProfileaddPage } from '../profileadd/profileadd';
import { MomentjsPipe } from '../../dateformatPipe';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

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
  base64Image = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4ge4SUNDX1BST0ZJTEUAAQEAAAeoYXBwbAIgAABtbnRyUkdCIFhZWiAH2QACABkACwAaAAthY3NwQVBQTAAAAABhcHBsAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWFwcGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAAG9kc2NtAAABeAAABWxjcHJ0AAAG5AAAADh3dHB0AAAHHAAAABRyWFlaAAAHMAAAABRnWFlaAAAHRAAAABRiWFlaAAAHWAAAABRyVFJDAAAHbAAAAA5jaGFkAAAHfAAAACxiVFJDAAAHbAAAAA5nVFJDAAAHbAAAAA5kZXNjAAAAAAAAABRHZW5lcmljIFJHQiBQcm9maWxlAAAAAAAAAAAAAAAUR2VuZXJpYyBSR0IgUHJvZmlsZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbWx1YwAAAAAAAAAeAAAADHNrU0sAAAAoAAABeGhySFIAAAAoAAABoGNhRVMAAAAkAAAByHB0QlIAAAAmAAAB7HVrVUEAAAAqAAACEmZyRlUAAAAoAAACPHpoVFcAAAAWAAACZGl0SVQAAAAoAAACem5iTk8AAAAmAAAComtvS1IAAAAWAAACyGNzQ1oAAAAiAAAC3mhlSUwAAAAeAAADAGRlREUAAAAsAAADHmh1SFUAAAAoAAADSnN2U0UAAAAmAAAConpoQ04AAAAWAAADcmphSlAAAAAaAAADiHJvUk8AAAAkAAADomVsR1IAAAAiAAADxnB0UE8AAAAmAAAD6G5sTkwAAAAoAAAEDmVzRVMAAAAmAAAD6HRoVEgAAAAkAAAENnRyVFIAAAAiAAAEWmZpRkkAAAAoAAAEfHBsUEwAAAAsAAAEpHJ1UlUAAAAiAAAE0GFyRUcAAAAmAAAE8mVuVVMAAAAmAAAFGGRhREsAAAAuAAAFPgBWAWEAZQBvAGIAZQBjAG4A/QAgAFIARwBCACAAcAByAG8AZgBpAGwARwBlAG4AZQByAGkBDQBrAGkAIABSAEcAQgAgAHAAcgBvAGYAaQBsAFAAZQByAGYAaQBsACAAUgBHAEIAIABnAGUAbgDoAHIAaQBjAFAAZQByAGYAaQBsACAAUgBHAEIAIABHAGUAbgDpAHIAaQBjAG8EFwQwBDMEMAQ7BEwEPQQ4BDkAIAQ/BEAEPgREBDAEOQQ7ACAAUgBHAEIAUAByAG8AZgBpAGwAIABnAOkAbgDpAHIAaQBxAHUAZQAgAFIAVgBCkBp1KAAgAFIARwBCACCCcl9pY8+P8ABQAHIAbwBmAGkAbABvACAAUgBHAEIAIABnAGUAbgBlAHIAaQBjAG8ARwBlAG4AZQByAGkAcwBrACAAUgBHAEIALQBwAHIAbwBmAGkAbMd8vBgAIABSAEcAQgAg1QS4XNMMx3wATwBiAGUAYwBuAP0AIABSAEcAQgAgAHAAcgBvAGYAaQBsBeQF6AXVBeQF2QXcACAAUgBHAEIAIAXbBdwF3AXZAEEAbABsAGcAZQBtAGUAaQBuAGUAcwAgAFIARwBCAC0AUAByAG8AZgBpAGwAwQBsAHQAYQBsAOEAbgBvAHMAIABSAEcAQgAgAHAAcgBvAGYAaQBsZm6QGgAgAFIARwBCACBjz4/wZYdO9k4AgiwAIABSAEcAQgAgMNcw7TDVMKEwpDDrAFAAcgBvAGYAaQBsACAAUgBHAEIAIABnAGUAbgBlAHIAaQBjA5MDtQO9A7kDugPMACADwAPBA78DxgOvA7sAIABSAEcAQgBQAGUAcgBmAGkAbAAgAFIARwBCACAAZwBlAG4A6QByAGkAYwBvAEEAbABnAGUAbQBlAGUAbgAgAFIARwBCAC0AcAByAG8AZgBpAGUAbA5CDhsOIw5EDh8OJQ5MACAAUgBHAEIAIA4XDjEOSA4nDkQOGwBHAGUAbgBlAGwAIABSAEcAQgAgAFAAcgBvAGYAaQBsAGkAWQBsAGUAaQBuAGUAbgAgAFIARwBCAC0AcAByAG8AZgBpAGkAbABpAFUAbgBpAHcAZQByAHMAYQBsAG4AeQAgAHAAcgBvAGYAaQBsACAAUgBHAEIEHgQxBEkEOAQ5ACAEPwRABD4ERAQ4BDsETAAgAFIARwBCBkUGRAZBACAGKgY5BjEGSgZBACAAUgBHAEIAIAYnBkQGOQYnBkUARwBlAG4AZQByAGkAYwAgAFIARwBCACAAUAByAG8AZgBpAGwAZQBHAGUAbgBlAHIAZQBsACAAUgBHAEIALQBiAGUAcwBrAHIAaQB2AGUAbABz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blTkBbZRCcfVkY/iaAPnaiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAO9+F3jG4+H37RHg3xlbuyHSdVhnkwcbogwEi/QoWH41/TRbXEN5ptvd27rJbzxLJE6nIZWAII/A1/K1X9Gv7MfipvGX7Bfwx1qSVZrkaMlpcMDyZLcmBs+5MefxoA93ooooAKKKKACiiigAooooAKKKKAKWpXsWneHdQ1CckQ2ts80hHZVUsf0Ffy7+IdSl1nx7rerzkme+v5rmTPJ3PIzH9TX9KvxZumsP2WPiZfKSrW/hTUZQfQrayH+lfzKEksSepoASiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACv22/4J36//aX7FWqaK7EyaR4gmRRnokqJIP8Ax4vX4k1+tn/BNC8d/A/xbsS2VhvtPlA9N6XA/wDZKAP1AooooAKKKKACiiigAooooAKKKKAPLPjm2z9if4wv12+CNWOP+3Kav5pq/pZ+OYz+xP8AGEevgjVv/SKav5pqACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACv1Z/4JlNm3+NaejaQc/X7d/hX5TV+rP/BMofuPjWf9rSP/AG+oA/VOiiigAooooAKKKKACiiigAooooA8u+OH/ACZX8X/+xJ1X/wBIpq/mkr+lv44f8mV/F/8A7EnVf/SKav5pKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACv1b/4Jlf8efxp/wB/Sf5X1flJX6t/8Eyv+PP40/7+k/yvqAP1RooooAKKKKACiiigAooooAKKKKAPLvjh/wAmV/F//sSdV/8ASKav5pKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACv1b/4Jlf8efxp/wB/Sf5X1FFAH6o0UUUAFFFFABRRRQB//9k=";
  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite,
    private pltfrm: Platform, private toast: Toast) {
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
    this.getUserData();
  }


  getUserData() {
    this.pltfrm.ready().then((rdy) => {
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
            u = new User();
            u.name = res.rows.item(i).name;
            u.city = res.rows.item(i).city;
            u.address = res.rows.item(i).address;
            u.gender = res.rows.item(i).gender;
            u.image = res.rows.item(i).image;
            u.dob = res.rows.item(i).dob;
            u.timestamp = res.rows.item(i).timestamp;
            u.rowid = res.rows.item(i).rowid;
            this.users.push(u);
          }
          console.log(this.users);
        })
        .catch(e => console.log(e));
    });
  });
  }

  addUser() {
    this.navCtrl.push(ProfileaddPage);
  }

  editUser(rowidd) {
    this.navCtrl.push(ProfileaddPage, { rowid: rowidd });
  }

  reloadData(refresher) {
    this.pltfrm.ready().then((rdy) => {
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
            u = new User();
            u.name = res.rows.item(i).name;
            u.city = res.rows.item(i).city;
            u.address = res.rows.item(i).address;
            u.gender = res.rows.item(i).gender;
            u.image = res.rows.item(i).image;
            u.dob = res.rows.item(i).dob;
            u.timestamp = res.rows.item(i).timestamp;
            u.rowid = res.rows.item(i).rowid;
            this.users.push(u);
          }
          console.log(this.users);
        })
        .catch(e => console.log(e));
    }).then((x) => {
      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
    });
  });
  }

  deleteUser(rowid){
    this.pltfrm.ready().then((rdy) => {
    this.sqlite.create({
      name: 'ionicusersampledb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM usersample WHERE rowid=?', [rowid])
        .then(res => {
          this.toast.show('User deleted', '5000', 'center').subscribe(
            toast => {
              
            }
          );
          this.getUserData();
        })
        .catch(e => console.log(e));
    }).catch(e=> console.log(e));
  });
  }

  addSampleData(){

    this.users =new Array<User>();

    var obj1=new User();
    obj1.name="Ram";
    obj1.address="Dilsuknagar";
    obj1.city="Hyderabad";
    obj1.dob= "1994-12-15T13:47";
    obj1.gender="male";
    obj1.image=this.base64Image;
    obj1.timestamp=1517474336372;
    obj1.rowid=null;

    var obj1=new User();
    obj1.name="Nagesh";
    obj1.address="Uppal";
    obj1.city="Hyderabad";
    obj1.dob="1990-10-15T13:22";
    obj1.gender="male";
    obj1.image=this.base64Image;
    obj1.timestamp=1517474336372;
    obj1.rowid=null;

    var obj2=new User();
    obj2.name="Shankar";
    obj2.address="Nagole";
    obj2.city="Hyderabad";
    obj2.dob="1999-10-21T13:22";
    obj2.gender="male";
    obj2.image=this.base64Image;
    obj2.timestamp=1517474336372;
    obj2.rowid=null;

    var obj3=new User();
    obj3.name="Shiva";
    obj3.address="Dilsuknagar";
    obj3.city="Banglore";
    obj3.dob="1985-12-12T13:12";
    obj3.gender="male";
    obj3.image=this.base64Image;
    obj3.timestamp=1517474336372;
    obj3.rowid=null;

    var obj4=new User();
    obj4.name="Reshma";
    obj4.address="Lb nagar";
    obj4.city="Hyderabad";
    obj4.dob="1991-10-15T13:43";
    obj4.gender="female";
    obj4.image=this.base64Image;
    obj4.timestamp=1517474336372;
    obj4.rowid=null;

    var obj5=new User();
    obj5.name="Rehana";
    obj5.address="Dilsuknagar";
    obj5.city="Hyderabad";
    obj5.dob="1989-01-12T13:22";
    obj5.gender="female";
    obj5.image=this.base64Image;
    obj5.timestamp=1517474336372;
    obj5.rowid=null;


    this.users.push(obj1);
    this.users.push(obj2);
    this.users.push(obj3);
    this.users.push(obj4);
    this.users.push(obj5);



    this.users.forEach(element => {
      this.sqlite.create({
        name: 'ionicusersampledb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO usersample VALUES(NULL,?,?,?,?,?,?,?)', [element.name, element.address, element.gender, element.city, element.image, element.dob, element.timestamp])
          .then(res => {
            console.log(res);
            this.toast.show('Data saved', '5000', 'center').subscribe(
              toast => {
                //this.navCtrl.push(UsersPage);
                this.navCtrl.popToRoot();
              }
            );
          })
          .catch(e => {
            console.log(e);
            this.toast.show(e.message, '5000', 'center').subscribe(
              toast => {
                console.log(toast);
              }
            );
          });
      }).catch(e => {
        console.log(e);
        this.toast.show(e, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    });


  }

}
