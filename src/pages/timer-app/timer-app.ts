import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, Platform } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the TimerAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-timer-app',
  templateUrl: 'timer-app.html',
})
export class TimerAppPage {
  hours: number;
  minutes: number;
  seconds: number;

  countedSeconds: number;
  countedMinutes: number;
  countedHours: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, private backgroundMode: BackgroundMode,
    private localNotifications: LocalNotifications, public alertCtrl: AlertController,
    private pltfrm: Platform) {

    this.pltfrm.ready().then((rdy) => {
      this.localNotifications.on('trigger', (notification, state) => {
        let json = JSON.parse(notification.data);

        let alert = this.alertCtrl.create({
          title: notification.title,
          subTitle: json.secret
        });
        alert.present();
      });

    });
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.backgroundMode.enable();
    this.backgroundMode.setDefaults({
      silent: true
    });




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimerAppPage');
  }


  start() {
    let totalSeconds = ((this.hours * 60 * 60) + (this.minutes * 60) + this.seconds);
    let myvar = setInterval(() => {

      if (totalSeconds < 0) {
        clearInterval(myvar);
        // let toast=this.toastCtrl.create({
        //   message:"Time Completed",
        //   duration:3000,
        //   position:"top"
        // });

        //toast.present();

        this.localNotifications.schedule({
          id: 1,
          text: 'Timer Notification',
          sound: 'file://sound.mp3',
          data: { secret: '12233' }

        });



      }
      else {
        this.countedHours = Math.floor(totalSeconds / 3600);
        this.countedMinutes = Math.floor(totalSeconds % 3600 / 60);
        this.countedSeconds = Math.floor(totalSeconds % 3600 % 60);
      }

      totalSeconds = totalSeconds - 1;
    }, 1000);
  }



}
