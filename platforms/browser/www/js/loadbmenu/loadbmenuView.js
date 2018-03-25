define(['hbs!js/container/gallerylbm','hbs!js/container/containerlbm','hbs!js/container/contactolbm','hbs!js/container/soporte'], function(viewGallery,viewContainer,viewContacto,viewSoporte) {
    var f7 = new Framework7();
    function render(params) {
//        console.log(params.idmod);
//        $('.planes-page'+params.id).html(viewSoporte);
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
//                $('.titlecont').html(params.nombremod);
                $('.planes-page'+params.id+' .page-content-views').html(viewGallery);
        //        $('.textogallery').html("texto de la galería");
        //        $('.imagesgallery').html("imagesgallery");
        //        $('.videosgallery').html("videosgallery"); 
                var imagenes="";
                var videos="";console.log(data.img+"--- ");
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
                        imagenes+='<li><a  href="http://meew.co/dashmeew'+value.file_name+'"  title="Photo title" class="swipebox"><img src="http://meew.co/dashmeew'+value.file_name+'" alt="image"/></a></li>'
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
                $('.imagesgallerylbm').html(imagesEnd);
                $('.videosgallerylbm').html(videos); 
            break;
            case "2":
//                $('.titlecont').html(params.nombremod);
        //        $('.textogallery').html("texto de la galería");
        //        $('.imagesgallery').html("imagesgallery");
        //        $('.videosgallery').html("videosgallery"); 
                var imagenes="";
                var videos="";
                var imagesIni='<ul id="photoslist" class="photo_gallery_13">';
                var imagesFin='<div class="clearleft"></div></ul>';
                $.each(data.content,function(key,value){
//                    if(value.tipo_contenido==1){
                        imagenes+='<div class="row" ><div class="col-10"></div><div class="col-80" style="color:#7C904A">Prducto: '+value.name+' <br> Precio: '+value.precio_txt+'</div><div class="col-10"></div></div></div>'+
                            '<div class="row" ><div class="col-10"></div><div class="col-80"><img src="http://meew.co/dashmeew'+value.file_name+'" style="width: 100%"></div><div class="col-10"></div></div></div>'+
                            '<div class="row" ><div class="col-10"></div><div class="col-80" style="color:#7C904A">'+value.description+'</div><div class="col-10"></div></div></div><div class="row"><div class="col-10"></div><div class="col-80"><hr></div><div class="col-10"></div></div>';
                        
                    
                });
                $('.planes-page'+params.id+' .page-content-views').html(imagenes);
                break;
            case "3":
//                var textohtml='<div class="page-content">'+data.content+'</div>';
                $('.planes-page'+params.id+' .page-content-views').html(viewContainer);
                $('.page-content-articulo').html(data.content);
                break;
            case "4":
                $('.planes-page'+params.id+' .page-content-views').html(viewContacto);
                $('.nombre').text(localStorage.getItem('personanombre'));
                initialize();
                break;
            case "5":
                console.log(data.content);
                var opciones='<option value="">Seleccione...</option>';
                 $.each(data.content,function(key,value){
                        opciones+='<option value="'+value.idtema_soporte+'">'+value.titulo+'</option>';
                });
                $('.planes-page'+params.id+' .page-content-views').html(viewSoporte);
                $('.temasoporte').html(opciones);
                
                break;
        }
//        $('.tab-link').css('background',localStorage.getItem('color'));
//        $('.page').css('background',localStorage.getItem('color'));
////        $('.button').css('color',localStorage.getItem('color_icon'));
//        $('.tab-link').on('click',function(){
//            $('.tab-link').css('background',localStorage.getItem('color'));
//            $(this).css('background',localStorage.getItem('color'));
//        });
//        $('.button').css({'background':localStorage.getItem('color'),'color':localStorage.getItem('color_icon')});
//        $('.buttons-row').on('click',function(){
//            console.log("sadsf");
//        });
//        f7.alert("asdf");
//        $('.page').css('background',localStorage.getItem('color'));
    }
   
    
    return {
        render: render
    }
});  