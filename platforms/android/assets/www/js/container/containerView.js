define(['hbs!js/container/gallery','hbs!js/container/container','hbs!js/container/contacto','hbs!js/container/soporte'], function(viewGallery,viewContainer,viewContacto,viewSoporte) {
    var f7 = new Framework7();
    function render(params) {
        var content="";
        $.ajax({
                url: 'http://meew.co/dashmeew/index.php/site/dataContent',
//                url: 'http://localhost/meew/index.php/site/dataContent',
                dataType: 'json',
                data:{idmod:params.idmod},
                type: 'post',
                async:true,
                before: f7.showPreloader(),
                success: function(data) {
//                    $('.titlecont').html(data.content.nombre_modulo);
//                    $('.container-page').html(data.content);

                    f7.hidePreloader();
                    $('.navbar-inner').css('background-color',localStorage.getItem('color'));
                    cargaContenido(data,params);
//console.log(data.content.texto_html);
                },
                error:function(error){
                    f7.hidePreloader();
                    f7.alert("error en la comunicación con el servidor");
                },
            });
//            console.log(params.tipomod);
//        
       
//            $('.informacion-page').html(viewTemplate());
    } 
    function cargaContenido(data,params){
        switch(params.tipomod){
            case "1":
                $('.titlecont').html(decodeURI(params.nombremod));
                $('.container-page').html(viewGallery);
        //        $('.textogallery').html("texto de la galería");
        //        $('.imagesgallery').html("imagesgallery");
        //        $('.videosgallery').html("videosgallery"); 
                var imagenes="";
                var videos="";
                var stClass="photo_gallery_1";
                if(data.img==2){
                    stClass="photo_gallery_12";
                }
                if(data.img==1){
                    stClass="photo_gallery_11";
                }
                if(data.img>=3){
                    stClass="photo_gallery_13";
                }
                var imagesIni='<ul id="photoslist" class="'+stClass+'">';
                var imagesFin='<div class="clearleft"></div></ul>';
                $.each(data.content,function(key,value){
                    
                    if(value.tipo_contenido==1){
                        imagenes+='<li><a rel="gallery-1" href="http://meew.co/dashmeew'+value.file_name+'"  title="Photo title" class="swipebox"><img src="http://meew.co/dashmeew'+value.file_name+'" alt="image"/></a></li>'
//                        imagenes+='<div class="'+stClass+'"><a rel="gallery-1" href="http://meew.co/dashmeew'+value.file_name+'"  title="Photo title" class="swipebox"><img src="http://meew.co/dashmeew'+value.file_name+'" style="width: 100%"></a></div>';
                    }
                    else if(value.tipo_contenido==2){
                        videos+='<div class="row" style="text-align: left; ">'+
                                value.description+
                                '</div> <br>'+
                                '<iframe style="width: 100%;height:250px" src="https://www.youtube.com/embed/'+value.url_video+'" frameborder="0" allowfullscreen></iframe>';
                    }
                });
                var imagesEnd=imagesIni+imagenes+imagesFin;
                $('.imagesgallery').html(imagesEnd);
                $('.videosgallery').html(videos); 
                
                
                $(".content-block-tabs").css("background-color", localStorage.getItem('color'));
                $(".button.active").css("background",localStorage.getItem('color'));
                $(".button.active").css("opacity","0.6");
//                f7.alert("asdf");
            break;
            case "2":
                $('.titlecont').html(decodeURI(params.nombremod));
        //        $('.textogallery').html("texto de la galería");
        //        $('.imagesgallery').html("imagesgallery");
        //        $('.videosgallery').html("videosgallery"); 
                var imagenes="";
                var videos="";
                $.each(data.content,function(key,value){
                    if(value.tipo_contenido==1){
                        imagenes+='<div class="col-25"><img src="http://meew.co/dashmeew'+value.file_name+'" style="width: 100%"></div>';
                    }
                    
                });
                $('.container-page').html(imagenes);
                $('.container-page').append('<a href="#" class="share-link">compartir</a>');
                
                break;
            case "3":
//                var textohtml='<div class="page-content">'+data.content+'</div>';
                $('.container-page').html(viewContainer);
                $('.page-content-articulo').html(data.content);
                break;
            case "4":
                $('.container-page').html(viewContacto);
                $('.nombre').text(localStorage.getItem('personanombre'));
                $("#emailpersona").text(data.content.correo_contacto);
                $("#celularpersona").text(data.content.telefono);
                $("#address").text("  "+data.content.direccion);
                console.log(data.content);
                initializeMap(data.content);
                $(".btncompra").css("color",localStorage.getItem('color'))
                $(".btncompra").css("border","1px solid "+localStorage.getItem('color'));
                $(".btncompra").css({"margin-left":"auto","margin-right":"auto"});
                $(".line-bottom").css("border-bottom","2px solid "+localStorage.getItem('color'));
                $(".item-cl-srv").css("border-bottom","2px solid "+localStorage.getItem('color'));
                $(".bder-left").css("border-left","2px solid "+localStorage.getItem('color'));
                $(".line-input").css("border","1px solid "+localStorage.getItem('color'));
                
                break;
            case "5":
//                console.log(data.content);
                var opciones='<option value="">Seleccione...</option>';
                 $.each(data.content,function(key,value){
                        opciones+='<option value="'+value.idtema_soporte+'">'+value.titulo+'</option>';
                });
                $('.container-page').html(viewSoporte);
                $('.temasoporte').html(opciones);
                
                break;
                
        }
        
//        $('.page').css('background',localStorage.getItem('color'));
//        $('.button').css('background',localStorage.getItem('color'));
//        $('.tab-link').css({'background':localStorage.getItem('color'),'color':localStorage.getItem('color_icon')});
//        $('.buttons-row').on('click',function(){
//            console.log("sadsf");
//        });
        
    }
    function initializeMap(dataM) { // define function
        var latitud=dataM.latitud;
        var longitud=dataM.longitud;
        var mapProp = {
          center: new google.maps.LatLng(latitud, longitud),
          zoom: 5,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapProp);
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;
        geocodeLatLng(geocoder, map, infowindow,latitud,longitud);
    }
    function geocodeLatLng(geocoder, map, infowindow,latitud,longitud) {
        var latlng = {lat: parseFloat(latitud), lng: parseFloat(longitud)};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[1]) {
    //            console.log(JSON.stringify(results[1]["formatted_address"]));
//                $("#address").text(results[1]["formatted_address"]);
              map.setZoom(11);
                var marker = new google.maps.Marker({
                  position: latlng,
                  map: map
                });
                infowindow.setContent(results[1].formatted_address);
                infowindow.open(map, marker);
            } else {
                window.alert('No results found');
            }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
    return {
        render: render
    }
});  