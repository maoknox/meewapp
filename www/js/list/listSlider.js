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
        var iniContent='<div class="page-content-swiper" >'+
            '<div class="swiper-container">'+
            '<div class="swiper-wrapper">';
    
        var endContent='</div>'+
            '<div class="swiper-pagination"></div>'+
            '</div>'+
            '</div>';
    var allContent=iniContent+endContent;
        $$('.main-page').html(allContent);
        var mySwiper = new Swiper('.swiper-container', {
            autoplay:5000,
            speed: 400,
            disableOnInteraction: false,
            spaceBetween: 30,
            pagination: '.swiper-pagination',
            loop:true
        });
    var contentM="";
        $.each(JSON.parse(retrivedContent),function(k,v){
            contentM=' <div class="swiper-slide">'+
                        '<div class="content-block">'+
                        '<span>'+v.nombre_modulo+'</span>'+
                        '<span class="subtitle">'+v.texto_descripcion+'</span>'+
                        '<a href="container.html?idmod='+v.id_modulo_app+'&tipomod='+encodeURIComponent(v.tipo_modulo)+'&nombremod='+encodeURIComponent(v.nombre_modulo)+'" class="swiper_read_more loadcontent">'+v.texto_button+'</a>'+                        
                        '</div>'+
                     '</div>';
            mySwiper.appendSlide(contentM);
       });
       mySwiper.startAutoplay();
       mySwiper.init();
      $('.swiper_read_more').css('color',localStorage.getItem('color_icon'));

    }	
    return {
        render: render
    };
});