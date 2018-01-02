import { Component,ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TimerAppPage } from '../pages/timer-app/timer-app';
import { IonicPage } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mycontent') nav: NavController
  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>;



  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Timer', component: TimerAppPage }
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

