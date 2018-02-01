import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CalendarComponentOptions, CalendarModalOptions, CalendarModal, CalendarResult } from 'ion2-calendar';
// import { DatePicker } from '@ionic-native/date-picker';
import moment from 'moment';
/**
 * Generated class for the TimeOffRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-time-off-request',
  templateUrl: 'time-off-request.html',
})
export class TimeOffRequestPage {
  fromDate: string;
  toDate: string;
  date: string;
  type: 'string';
  dateRange: { from: string; to: string; }
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
    color:'dark'
  };
  leave: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    ) {
      // this.datePicker.show({
      //   date: new Date(),
      //   mode: 'date',
      //   androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT 
      // }).then(
      //   date => console.log('Got date: ', date),
      //   err => console.log('Error occurred while getting date: ', err)
      // );
      //this.leave=0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeOffRequestPage');
  }
  onChange($event) {
    console.log($event);
    this.fromDate=moment(new Date($event.from._i)).format("MMMM DD, YYYY");
    this.toDate=moment(new Date($event.to._i)).format("MMMM DD, YYYY");

    let f=moment(new Date($event.from._i));
    let t=moment(new Date($event.to._i));
    let dif = this.leave = t.diff(f, 'days');

  }

  
  openCalendar() {
    const options: CalendarModalOptions = {
      title: 'CALENDAR',
      pickMode: 'range',
      closeIcon:true
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    // myCalendar.onDidDismiss((date: CalendarResult, type: 'moment') => {
    //   console.log(date);
    // });

    myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {

      if (date) {
        console.log(date);
        // let diff = date.to.unix-date.from.unix;
        // let days = Math.ceil(diff/86400);
        // console.log('Requested Leave for '+(days+1)+' days');

        let stdt = moment(date.from.string, "YYYY-MM-DD");
        let endt = moment(date.to.string, "YYYY-MM-DD");

        let dif = this.leave = endt.diff(stdt, 'days');
        console.log('Requested Leave for ' + (dif + 1) + ' days');
        //console.log(dif);
      }

    });
  }

  

}
