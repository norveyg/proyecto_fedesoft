import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare const google;

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  myLocation;
  map;
  marker;
  markers=[];
  coordenadas=[{lat:4.603899,lng: -74.067230},
    {lat:4.609375,lng: -74.082079},
    {lat:4.613610,lng: -74.066372},
    {lat:4.581586,lng: -74.080585},
    {lat:4.556693,lng: -74.112414},
    {lat:4.521438,lng: -74.089390},
    {lat:4.550937,lng: -74.141717}]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    setTimeout(() => {
      this.initMap();
          }, 1000);
  }

  addMarker(coord){
    console.log("ubicado en: "+coord.lat);
    let infowindow = new google.maps.InfoWindow({
      content: "ubicado en: "+coord.lat
          });
          console.log("ubicado en: "+coord.lat);
    let internalMarker= new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: coord
    });
    internalMarker.addListener('click', ()=> {
      infowindow.open(this.map, internalMarker);
          })     
          console.log(internalMarker);
          this.markers.push(internalMarker);          
  }  


  initMap2() {
    
    this.myLocation = {lat: 4.646412, lng: -74.077778};
    console.log(this.myLocation)
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom:17,
      center: this.myLocation,
      mapTypeId: 'satellite'
    });
  }

  initMap1_1() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: 59.325, lng: 18.070}
    });

    this.marker = new google.maps.Marker({
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      //position: {lat: 59.327, lng: 18.067}
      position:this.myLocation
    });
    this.marker.addListener('click', this.toggleBounce);
  }

  clearAllMarkers(){
    this.markers.forEach((marker)=>{
    marker.setMap(null);
    })
    this.markers=[];
  }

  initMap() {

    this.myLocation = { lat: 4.646412, lng: -74.077778 };
    console.log(this.myLocation)
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: this.myLocation,
      mapTypeId: 'satellite'
    });
    
    /*this.coordenadas.forEach((coord)=>{
      this.addMarker(coord);
    })*/

    let bounds = new google.maps.LatLngBounds();
    this.coordenadas.forEach((coord) => {
      this.addMarker(coord);
      bounds.extend(coord);
      this.map.fitBounds(bounds);
    })
    this.map.fitBounds(bounds);
       
    this.marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: this.myLocation
    });
    /*this.marker.addListener('click', ()=>{
      if (this.marker.getAnimation() !== null) {
        this.marker.setAnimation(null);
      } else {
        this.marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    });*/
    this.marker.addListener('click',this.toggleBounce.bind(this));
    

    setTimeout(() => {
      this.clearAllMarkers();
    }, 60000);
  }

  toggleBounce() {
    if (this.marker.getAnimation() !== null) {
      this.marker.setAnimation(null);
    } else {
      this.marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
}
