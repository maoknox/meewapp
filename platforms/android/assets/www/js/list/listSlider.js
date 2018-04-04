define(['hbs!js/container/gallery','hbs!js/container/container','hbs!js/container/contacto','hbs!js/container/soporte'], function(viewGallery,viewContainer,viewContacto,viewSoporte) {
    var f7 = new Framework7();
    var $$ = Framework7.$;
    function render() {
        var f7 = new Framework7();
        var idmods =[]; 
        var retrivedContent=localStorage.getItem('content');
        $.each(JSON.parse(retrivedContent),function(k,v){
            idmods.push(v.id_modulo_app);
       });
       var dataSl=[];
//       $.ajax({
////                url: 'http://meew.co/dashmeew/index.php/site/dataContentSlider',
//                url: 'http://localhost/meew/index.php/site/dataContentSlider',
//                dataType: 'json',
//                data:{idmods:idmods},
//                type: 'post',
//                async:true,
//                crossDomain : true,
////                before: f7.showPreloader(),
//                success: function(data) {
//                    console.log(JSON.stringify(data));
//                    console.log(data.content);
//                    dataSl=data.content;
////                    $('.titlecont').html(data.content.nombre_modulo);
////                    $('.container-page').html(data.content.texto_html);
////console.log(data.content.texto_html);
//                },
//                error:function(error){
//                    f7.hidePreloader();
//                    $('.main-page').html(JSON.stringify(error));
//                    f7.alert("error en la comunicación con el servidor");
//                },
//            });



        var iniContent='<div class="page-content-swiper" >'+
            '<div class="swiper-container">'+
            '<div class="swiper-wrapper">';
    
        var endContent='</div>'+
            '<div class="swiper-pagination"></div>'+
            '</div>'+
            '</div>';
    var allContent=iniContent+endContent;
        $$('.main-page').html(allContent);
//        var mySwiper = f7.swiper.create('.swiper-container', {
//            speed: 400,
//            spaceBetween: 100,
//            pagination:'.swiper-pagination'
//        });
        var mySwiper = new Swiper('.swiper-container', {
            autoplay:5000,
            speed: 400,
            disableOnInteraction: false,
            spaceBetween: 30,
            pagination: '.swiper-pagination',
            loop:true
        });
    var contentM="";
//    console.log(retrivedContent+"--------------------------------------------------------------------");
        $.each(JSON.parse(retrivedContent),function(k,v){
            contentM=' <div class="swiper-slide">'+
//                        '<div class="content-block-title">'+v.nombre_modulo+'</div>'+
                        '<div class="content-block">'+
                        '<span>'+v.nombre_modulo+'</span>'+
                        '<span class="subtitle">'+v.texto_descripcion+'</span>'+
                        '<a href="container.html?idmod='+v.id_modulo_app+'&tipomod='+encodeURIComponent(v.tipo_modulo)+'&nombremod='+encodeURIComponent(v.nombre_modulo)+'" class="swiper_read_more loadcontent">'+v.texto_button+'</a>'+
                          
                          
                        '</div>'+
                     '</div>';
            mySwiper.appendSlide(contentM);
//            idmods.push(v.id_modulo_app);
//            dataSl
       });
       mySwiper.startAutoplay();
       mySwiper.init();
//       console.log(dataSl);
      $('.swiper_read_more').css('color',localStorage.getItem('color_icon'));
//      $('.page').css('background',localStorage.getItem('color'));
//        f7.alert("asdf");

    }	
    return {
        render: render
    };
});