import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CalendarComponentOptions, CalendarModalOptions, CalendarModal, CalendarResult } from 'ion2-calendar';
// import { DatePicker } from '@ionic-native/date-picker';
import { Storage } from '@ionic/storage';
import moment from 'moment';
import { LeavesPage } from '../leaves/leaves';
import { ToastController } from 'ionic-angular';

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
    color:'calendar-yellow'
  };
  leave: number;
  reason:string;
  leaveObj= {res:'',from:'',to:''};
  t:LeaveObj[];
  private leaveForm: FormGroup;
  submitClicked:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    private formBuilder: FormBuilder, private storage:Storage, private toastCtrl: ToastController) {
      // this.datePicker.show({
      //   date: new Date(),
      //   mode: 'date',
      //   androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT 
      // }).then(
      //   date => console.log('Got date: ', date),
      //   err => console.log('Error occurred while getting date: ', err)
      // );
      //this.leave=0;
      this.leaveForm = this.formBuilder.group({
        reason: ['', Validators.required],
        dateRange: ['', Validators.required],
        
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeOffRequestPage');
  }
  onChange($event) {
    console.log($event);
    this.fromDate=moment(new Date($event.from._i)).format("MMM DD, YYYY");
    this.toDate=moment(new Date($event.to._i)).format("MMM DD, YYYY");

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
  submitLeave(){
    this.submitClicked =true;
    if(this.leaveForm.valid && this.fromDate && this.toDate){
      
    let from =this.fromDate;
    let to =this.toDate;
    console.log(from.toString());
    let d = new Date(from.toString());
    console.log(d);
    let f=moment(from).format("MM-DD-YYYY");
    let t=moment(to).format("MM-DD-YYYY");
    
    this.leaveObj.from=f;
    this.leaveObj.to=t;
    this.leaveObj.res=this.leaveForm.value.reason;
    
    let val:LeaveObj[];
    val=[];
    //val.push(this.leaveObj);
    this.storage.get('leaves').then((v)=>{
      if(v) val=v;
    });
    val.push(this.leaveObj);
    this.storage.set('leaves',val);
    let toast = this.toastCtrl.create({
      message: 'Added successfully',
      duration: 3000
    });
    toast.present().then((v)=>{
      this.navCtrl.push(LeavesPage);
    });
  }
}

  
  
}

export class LeaveObj {
  res:any;
  from:any;
  to:any;
  constructor(parameters) {
    
  }


}