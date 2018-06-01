define(['hbs!js/container/gallery','hbs!js/container/container','hbs!js/container/contacto','hbs!js/container/soporte'], function(viewGallery,viewContainer,viewContacto,viewSoporte) {
    var f7 = new Framework7({
        modalTitle: "Cortes del monte"
    });
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
                console.log(data.content);
                $.each(data.content,function(key,value){
                    var shareA="";  
                    if(value.tipo_contenido==1){
                        if(localStorage.getItem('compartir')==1){
                            shareA='<a href="javascript:window.plugins.socialsharing.share(\''+value.description+'\', \''+value.name+'\', \'http://meew.co/dashmeew'+value.file_name+'\', \'\');" style="color:#999"><span class="icon-share"></span><span class="tabbar-label">Compartir</span></a>';
                        }
                        imagenes+='<li>'+
                                '<a rel="gallery-1" href="http://meew.co/dashmeew'+value.file_name+'"  title="'+value.name+'" class="swipebox">'+
                                    '<img src="http://meew.co/dashmeew'+value.file_name+'" alt="image"/>'+
                                '</a>'+
                                shareA+
                                '</li>';
//                        imagenes+='<div class="'+stClass+'"><a rel="gallery-1" href="http://meew.co/dashmeew'+value.file_name+'"  title="Photo title" class="swipebox"><img src="http://meew.co/dashmeew'+value.file_name+'" style="width: 100%"></a></div>';
                    }
                    else if(value.tipo_contenido==2){
                        if(localStorage.getItem('compartir')==1){
                            shareA='<a href="javascript:window.plugins.socialsharing.share(\''+value.description+'\', \''+value.name+'\',\'\' ,\'http://meew.co/dashmeew'+value.url_video+'\);" style="color:#999"><i class="f7-icons size-25 color-custom">home</i><span class="tabbar-label">Compartir</span></a>';
                        }
                        videos+='<div class="row" style="text-align: left; ">'+
                            value.description+shareA+
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
//                $(".container-page").css("height","80%");
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
                
                break;
            case "3":
//                var textohtml='<div class="page-content">'+data.content+'</div>';
                $('.container-page').html(viewContainer);
                $('.page-content-articulo').html(data.content);
                break;
            case "4":
                $('.container-page').html(viewContacto);
                $('.nombre').text("Mi nombre es: "+localStorage.getItem('personanombre'));
                $('.email').val(localStorage.getItem('email'));
                $("#emailpersona").text(data.content.correo_contacto);
                $("#celularpersona").text(data.content.telefono);
                $("#address").text("  "+data.content.direccion);
                $("#form-contacto").validate();
                $("[name=email]").rules("add",{
                    required: true,
                    emailcheck: true
                    ,messages:{
                        required:"Campo requerido",
                        emailcheck: "El correo debe tener formato 1234@abcd.com"
                    }
                });
                $.validator.addMethod("emailcheck", function(value) {
                    return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
                });
                $("[name=asunto]").rules("add",{
                    required: true,
                    messages:{
                        required:"Campo requerido",
                    }
                });
                $("[name=message]").rules("add",{
                    required: true,
                    messages:{
                        required:"Campo requerido",
                    }
                });
                console.log(data.content);
                initializeMap(data.content);
                $(".btncompra").css("color",localStorage.getItem('color'))
                $(".btncompra").css("border","1px solid "+localStorage.getItem('color'));
                $(".btncompra").css({"margin-left":"auto","margin-right":"auto"});
                $(".line-bottom").css("border-bottom","2px solid "+localStorage.getItem('color'));
                $(".item-cl-srv").css("border-bottom","2px solid "+localStorage.getItem('color'));
                $(".bder-left").css("border-left","2px solid "+localStorage.getItem('color'));
                $(".line-input").css("border","1px solid "+localStorage.getItem('color'));
                $(".msjcontacto").on("click",function(){
                    enviaMsjContacto();
                });
                break;
            case "5":
                $('.container-page').html(viewSoporte);
                var soporteDiv="";
                $.each(data.content,function(key,value){
                    soporteDiv+="<h3 '>"+value.titulo+"</h3><div>";
                    $.each(value.subtema,function(keys,values){
                        soporteDiv+='<div class="tema-sub" ><div class="subtema-sub">'+values.titulo+'</div><div><textarea class="tema-inqu" name="Soporte['+value.idtema_soporte+'_'+values.idtema_soporte+']" placeholder="Escriba aquí si desea agregar un detalle adicional a su inquietud"></textarea></div></div>';
                    });
                    soporteDiv+="</div>";
                });
                $("#menu-sl").html('<a href="#" class="envia-form-sop">enviar</a>');
                $(".envia-form-sop").on('click',function(){
                    var datosSop=$("#form_temasop").serialize()+"&persona_correo="+localStorage.getItem('email')+"&idapp="+localStorage.getItem('idapplication');
                    enviaComentario(datosSop);
                });
                $( "#accordion" ).html(soporteDiv);
                $(".line-bottom").css("border-bottom","2px solid "+localStorage.getItem('color'));
//                $(".tema-sub").css("opacity",'0.8');
                
                $( "#accordion" ).accordion({
                    collapsible: true,
                     active: false
                });
                $("#accordion h3 ").css("background-color",localStorage.getItem('color_icon'));
                $("#accordion h3").css("color",localStorage.getItem('color'));
                $("#accordion h3").css("border","2px solid "+localStorage.getItem('color'));
//                $("#accordion h3").css("margin","0.2em 0.2em");
//                $("#accordion h3").css("padding","0.2em 0.2em");
                
                $(".tema-sub").css("color",localStorage.getItem('color_icon'));
                $(".tema-sub").css("background-color",localStorage.getItem('color'));
                $(".tema-sub").css("opacity","0.5");
                $(".tema-inqu").css("width","100%");
                $(".tema-inqu").css("height","50px");
                $(".subtema-sub").css("padding","5px 5px");
//                $(".ui-accordion .ui-accordion-content").css("margin",".2em .2em");
                $(".ui-accordion .ui-accordion-content").css("margin-bottom","5px");
                $(".ui-accordion .ui-accordion-content").css("padding","0.2em 0.1em");
                $(".ui-accordion .ui-accordion-content").css("height","auto");
                $(".ui-accordion .ui-accordion-content").css("overflow","hidden");
//                $('.temasoporte').html(opciones);
                
                break;
                
        }
        
//        $('.page').css('background',localStorage.getItem('color'));
//        $('.button').css('background',localStorage.getItem('color'));
//        $('.tab-link').css({'background':localStorage.getItem('color'),'color':localStorage.getItem('color_icon')});
//        $('.buttons-row').on('click',function(){
//            console.log("sadsf");
//        });
        
    }
    function compartir(){
        console.log("comparte");
    }
    function enviaMsjContacto(){
       if($("#form-contacto").valid()){
           var dataContacto=$("#form-contacto").serialize()+"&persona_correo="+localStorage.getItem('email')+"&idapp="+localStorage.getItem('idapplication');
           $.ajax({//http://meew.co/dashmeew/
            url: 'http://meew.co/dashmeew/index.php/site/enviaTemaContacto',
//                url: 'http://localhost/meew/index.php/site/enviaTemaContacto',
                dataType: 'json',
                data:dataContacto,
                type: 'post',
                async:true,
                crossDomain : true,
                before: f7.showPreloader(),
                success: function(data) {

                    f7.hidePreloader();
                    if(data.status=='exito'){
                      f7.alert(data.msg);
                    }
                    else{
                        f7.alert(data.msg);
                    }
                },
                error:function(error){
                    f7.hidePreloader();
                    f7.alert("Error en comunicación con el servidor, revise la conexión a internet o inténtelo más tarde.");
    //                    $('.list-block-label').html(JSON.stringify(error));
                },

            });
       }
    }
    function enviaComentario(datosSop){
        console.log(datosSop);
        $.ajax({//http://meew.co/dashmeew/
//            url: 'http://meew.co/dashmeew/index.php/site/enviaTemaSoporte',
                url: 'http://meew.co/dashmeew/index.php/site/enviaTemaSoporte',
            dataType: 'json',
            data:datosSop,
            type: 'post',
            async:true,
            crossDomain : true,
            before: f7.showPreloader(),
            success: function(data) {

                f7.hidePreloader();
                if(data.status=='exito'){
                  f7.alert(data.msg);
                }
                else{
                    f7.alert(data.msg);
                }
            },
            error:function(error){
                f7.hidePreloader();
                f7.alert("Error en comunicación con el servidor, revise la conexión a internet o inténtelo más tarde.");
//                    $('.list-block-label').html(JSON.stringify(error));
            },

        });
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