import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';

/**
 * Generated class for the GooglemapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-googlemap',
  templateUrl: 'googlemap.html',
})
export class GooglemapPage {
  map: GoogleMap;
  constructor(public navCtrl: NavController, public navParams: NavParams,private googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    this.loadMap();
    console.log('ionViewDidLoad GooglemapPage');
  }
  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 17.374192,
          lng: 78.551567
        },
        zoom: 20,
        tilt: 30
      }
    };
    var div = document.getElementById("map_canvas");
    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        
      
        var btnZoomout=div.getElementsByClassName('btnZoomOut')[0];
        btnZoomout.addEventListener('click',function(){
          this.map.moveCameraZoomOut();
 
        });
        
        // Now you can use all methods safely.
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: 17.374192,
              lng: 78.551567
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
                
              });
          });

      });
  }

  findme(){
    this.map.addMarker({
      position: {lat: 17.374192, lng: 78.551570},
      title: "Hello Cordova Google Maps for iOS and Android",
      snippet: "This plugin is awesome!"
    });
  }

  addCircle(){
    this.map.addCircle({
      'center':{lat: 17.374192,lng: 78.551567},
      'radius':100,
      'strokeColor':'#AA00FE',
      'strokeWidth':3,
      'fillColor': '#880000'
    }).then(function(map){
      map.moveCameraZoomOut();
    });
  }

}
