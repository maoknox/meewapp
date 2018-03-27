/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
//        document.addEventListener("backbutton", onBackKeyDown, false); 
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        //navigator.splashscreen.show();
        $(".swipebox").swipebox();
//        setTimeout('hideSplashScreen()',5000);
//        navigator.vibrate([1000, 500, 500, 1000, 1000]); 
       // app.setupPush();
        app.loadStyles();
        
    },
    
    loadStyles: function() {
        localStorage.setItem('idapplication', 48);
        console.log("load styles");
        $.ajax({
                url: 'http://meew.co/dashmeew/index.php/site/loadStyles',
//                url: 'http://localhost/meew/index.php/site/loginPlatformMovile',
                dataType: 'json',
                data:{idapp:localStorage.getItem('idapplication')},
                type: 'post',
                async:true,
                crossDomain : true,
//                before: progress.show(),
                success: function(data) {
                    console.log(data);
                    
                    var parametros=data.parametros;
                    var camposForm=data.campo_registro;
                    var loginRs=data.login_rs;
                    if(typeof loginRs !== 'undefined'){
                        var logo="";
                        var rsocial="";
                        console.log(typeof loginRs !== 'undefined');
                        
                        $.each(loginRs,function(keyrs,valrs){
                            logo="";
                            if(valrs==1){
                                $(".ingreso-rs").css("display","block");
                                switch(keyrs){
                                    case "login_facebook":
                                        logo="loginfacebook.png";
                                        rsocial="loginfb";           
                                        break;
                                    case "login_facebook":
                                        logo="logingoogle.png";
                                        rsocial="logingl";           
                                        break;

                                }
                                $(".ingreso-rs-logos").append('<div class="col-25perc" ><img src="images/'+logo+'" alt="" style="width: 100%;cursor: pointer;" class="'+rsocial+'" /></div>');
                            }
                        });
                    }
                    data=data.estilos;
                    localStorage.setItem('campos_form',JSON.stringify(camposForm));
                    localStorage.setItem('login_rs',JSON.stringify(loginRs));
                    localStorage.setItem('parametros',JSON.stringify(parametros));
//                    console.log(localStorage.getItem('campos_form'));
//                    console.log(camposForm);
                    
                    
                    
                    localStorage.setItem('color',data.color);
                    localStorage.setItem('color_icon',data.color_icon); 
        
//                   $('.login-screen-content').css('background',data.color);
//                   $('.login-screen').css('background',data.color);
//                   $('.item-title').css('color',data.color_icon);
//                   $('input').css('color',data.color_icon);
//                   $('.label-secondary').css('color',data.color_icon);
//                   $('.button.active').css('background',data.color);
//                   $('a.swiper_read_more').css('color',data.color_icon);
//                   $('.ini-text').css('color',data.color_icon);
//                   $('.ini-text-link').css('color',data.color_icon);
//                   navigator.splashscreen.hide();
//                    app.hidePreloader();
                    setTimeout('hideSplashScreen()',5000);
                },
                error:function(error){
                    console.log(error);
                },
                
            });
       
    }
};
function hideSplashScreen(){
    navigator.splashscreen.hide();
}
function showMap(){
    alert(document.getElementById("map-canvas"));
//    navigator.notification.alert(
//        position.coords.latitude+"-"+position.coords.longitude,         // message
//        null,                 // callback
//        "Oops",           // title
//        'Ok'                  // buttonName
//    ); 
    var mapOptions = {
    center: new google.maps.LatLng("40.639409", "-73.897900"),
    zoom: 18,
//    mapTypeId: google.maps.MapTypeId.,
//    heading: 90,
//    tilt: 45
  };
    var map; 
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng("40.639409", "-73.897900"),
      map: map,
	  title: 'Última posición'
    });

    google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent("Última posición");
    infowindow.open(map, marker);
  });
}

function loadmap(){
    var latitud="40.639409";
    var longitud="-73.897900";
    var mapOptions = {
        center: new google.maps.LatLng(latitud,longitud),
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        heading: 90,
        tilt: 45
      };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitud,longitud),
        map: map,
	title: 'Mi negocio'
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent("Última posición");
        infowindow.open(map, marker);
    });
    //markers.push(marker);
}
function geocodeLatLng(geocoder, map, infowindow,latitud,longitud) {
    var latlng = {lat: parseFloat(latitud), lng: parseFloat(longitud)};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
//            console.log(JSON.stringify(results[1]["formatted_address"]));
            $("#address").text(results[1]["formatted_address"]);
//          map.setZoom(11);
//            var marker = new google.maps.Marker({
//              position: latlng,
//              map: map
//            });
//            infowindow.setContent(results[1].formatted_address);
//            infowindow.open(map, marker);
        } else {
            window.alert('No results found');
        }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
    });
}
