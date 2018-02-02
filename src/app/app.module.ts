import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Camera } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TimerAppPage } from '../pages/timer-app/timer-app';
import { CameraAppPage } from '../pages/camera-app/camera-app';
import { GooglemapPage } from '../pages/googlemap/googlemap';
import { LifeCyCleEventsPage } from '../pages/life-cy-cle-events/life-cy-cle-events';
import { ProfileaddPage } from '../pages/profileadd/profileadd';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
import { UsersPage } from '../pages/users/users';
import { MainPipe } from '../main-pipe.module';
import { CalendarModule } from 'ion2-calendar';
import { TimeOffRequestPage } from '../pages/time-off-request/time-off-request';
import { DatePicker } from '@ionic-native/date-picker';
import { LeavesPage } from '../pages/leaves/leaves';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TimerAppPage,
    CameraAppPage,
    GooglemapPage,
    LifeCyCleEventsPage,
    ProfileaddPage,
    UsersPage,
    TimeOffRequestPage,
    LeavesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      menuType:'push'
    }),
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    MainPipe,
    CalendarModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TimerAppPage,
    CameraAppPage,
    GooglemapPage,
    LifeCyCleEventsPage,
    ProfileaddPage,
    UsersPage,
    TimeOffRequestPage,
    LeavesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundMode,
    Camera,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleMaps,
    SQLite,
    Toast,
    DatePicker
  ]
})
export class AppModule {}
