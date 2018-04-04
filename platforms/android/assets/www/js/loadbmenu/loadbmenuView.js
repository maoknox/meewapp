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
//                $('.titlecont').html(params.nombremod);
                $('.planes-page'+params.id+' .page-content-views').html(viewGallery);
        //        $('.textogallery').html("texto de la galería");
        //        $('.imagesgallery').html("imagesgallery");
        //        $('.videosgallery').html("videosgallery"); 
                var imagenes="";
                var videos="";//console.log(data.img+"--- ");
                var stClass="photo_gallery_1";
                if(data.img==2){
                    stClass="photo_gallery_12";
                }
                if(data.img==1){
                    stClass="photo_gallery_11";
                }
                if(data.img>=3){
                    stClass="photo_gallery_12";
                }
                var imagesIni='<ul id="photoslist" class="'+stClass+'">';
                var imagesFin='<div class="clearleft"></div></ul>';
                var numim=0;
                    var numvid=0;
                    console.log(data.content);
                $.each(data.content,function(key,value){
                    
                    
                    if(value.tipo_contenido==1){
                        imagenes+='<li><a  href="http://meew.co/dashmeew'+value.file_name+'"  title="'+value.name+'" class="swipebox"><img src="http://meew.co/dashmeew'+value.file_name+'" alt="image"/></a>'+value.name+'</li>'
//                        imagenes+='<div class="'+stClass+'"><a rel="gallery-1" href="http://meew.co/dashmeew'+value.file_name+'"  title="Photo title" class="swipebox"><img src="http://meew.co/dashmeew'+value.file_name+'" style="width: 100%"></a></div>';
                        numim+=1;
                    }
                    else if(value.tipo_contenido==2){
                        videos+='<div class="row" style="text-align: left; ">'+
                                value.description+
                                '</div> <br>'+
                                '<iframe style="width: 100%;height:250px" src="https://www.youtube.com/embed/'+value.url_video+'" frameborder="0" allowfullscreen></iframe>';
                        numvid+=1
                    }
                });
                var imagesEnd=imagesIni+imagenes+imagesFin;
                if(numim>0 && numvid==0){
                    $('.planes-page'+params.id+' .page-content-views').html(imagesEnd);
                }
                else if(numim==0 && numvid>0){
                    $('.planes-page'+params.id+' .page-content-views').html(videos);
                }
                else if(numim>0 && numvid>0){
                    $('.imagesgallerylbm').html(imagesEnd);
                    $('.videosgallerylbm').html(videos); 
                }
                
                
//                $(".content-block-tabs").css("background-color", localStorage.getItem('color'));
//                $(".content-block-tabs").css("opacity","0.7");
                $(".button").css("background-color",localStorage.getItem('color'));
                $(".button").css("opacity","0.8");
//                $(".button.active").css("background-color",localStorage.getItem('color'));
//                $(".active").css("background",localStorage.getItem('color'));
//                $("#gallerysection").on("click",function(){
//                    $("#gallerysection").removeClass(".button.active");
////                    $("#gallerysection")
//                    $(this).addClass(".button.active");
//                    console.log("pasa");
//                });
//                $(".button.active").css("opacity","1");
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
//                    if(value.tipo_contenido==1){Prducto: '+value.name+' <br> Precio: '+value.precio_txt+
                        imagenes+='<div style="padding-top:20px"><div class="row" style="margin:0px 10px" >'+
                            '<div class="col-50"><img src="http://meew.co/dashmeew'+value.file_name+'" style="width: 100%"></div>'+
                            '<div class="col-50">'+
                                '<div class="row"><strong>Producto: </strong></div><div clas="row">'+value.name+'</div>'+
                                '<div class="row"><strong>Precio: </strong></div><div clas="row">'+value.precio_txt+'</div>'+
                                '<div class="row"><strong>Descripción: </strong></div><div class="row" style="text-align: justify">'+value.description+'</div>'+
                                '<div class="row" style="text-align: center"><a href="#" class="swiper_read_more link-loginii btncompra">comprar</a></div>'+
                                
                                
                            '</div></div><hr></div>';
                        
                    
                });
                
                $('.planes-page'+params.id+' .page-content-views').html(imagenes);
//                $('.planes-page'+params.id+' .page-content-views').append('<a href="#" class="share-link">compartir</a>');
                $(".btncompra").css("color",localStorage.getItem('color'))
                $(".btncompra").css("border","1px solid "+localStorage.getItem('color'));
                $(".btncompra").css({"margin-left":"auto","margin-right":"auto"});
                break;
            case "3":
//                var textohtml='<div class="page-content">'+data.content+'</div>';
                $('.planes-page'+params.id+' .page-content-views').html(viewContainer);
                $('.page-content-articulo').html(data.content);
                break;
            case "4":
                $('.planes-page'+params.id+' .page-content-views').html(viewContacto);
//                $('.nombre').text(localStorage.getItem('personanombre'));
//                initialize();
console.log(data.content);
                break;
            case "5":
//                console.log(data.content);
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