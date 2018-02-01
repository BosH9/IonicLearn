import { Component,ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MomentjsPipe } from '../dateformatPipe';

import { HomePage } from '../pages/home/home';
import { TimerAppPage } from '../pages/timer-app/timer-app';
import { CameraAppPage } from '../pages/camera-app/camera-app';
import { GooglemapPage } from '../pages/googlemap/googlemap';
import { LifeCyCleEventsPage } from '../pages/life-cy-cle-events/life-cy-cle-events';
import { IonicPage } from 'ionic-angular';
import { ProfileaddPage } from '../pages/profileadd/profileadd';
import { UsersPage } from '../pages/users/users';
import { TimeOffRequestPage } from '../pages/time-off-request/time-off-request';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mycontent') nav: NavController
  //rootPage:any = UsersPage;
  rootPage:any = TimeOffRequestPage;
  pages: Array<{title: string, component: any}>;



  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Timer', component: TimerAppPage },
      { title: 'Camera', component: CameraAppPage },
      { title: 'Map', component: GooglemapPage },
      { title: 'Life Cycle', component: LifeCyCleEventsPage },
      { title: 'Registration', component: ProfileaddPage },
      { title: 'User', component: UsersPage },
      { title: 'Request Leave', component: TimeOffRequestPage },
      
    ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  ngOnInit() {
    // Let's navigate from TabsPage to Page1
    //this.nav.push(HomePage);
 }
  gotoPage(Page){
    this.nav.setRoot(Page.component);
  }
}

