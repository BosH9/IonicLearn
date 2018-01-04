import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Camera } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TimerAppPage } from '../pages/timer-app/timer-app';
import { CameraAppPage } from '../pages/camera-app/camera-app';
import { GooglemapPage } from '../pages/googlemap/googlemap';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TimerAppPage,
    CameraAppPage,
    GooglemapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      menuType:'push'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TimerAppPage,
    CameraAppPage,
    GooglemapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundMode,
    Camera,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleMaps
    
  ]
})
export class AppModule {}
