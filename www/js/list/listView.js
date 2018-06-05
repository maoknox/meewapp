define(['hbs!js/list/contact-list-item'], function(template) {
    var $ = Framework7.$;
    function render() {
        var contenidoIni='<div class="page-content" >'
                +'<div class="content-block-ini">'
                +'<ul class="social_share">';
        var contenidoFin='</ul>'
              +'</div>'
            +'</div>';
        var retrivedContent=localStorage.getItem('content');
    var contenido='';
        $.each(JSON.parse(retrivedContent),function(k,v){
             contenido+='<li>'
                    +'<a href="container.html?idmod='+v.id_modulo_app+'&tipomod='+v.tipo_modulo+'&nombremod='+v.nombre_modulo+'" class="tabbar-label-products">'
                        +'<span class="'+v.icon+' size-50"></span></br><span class="tabbar-label" >'+v.nombre_modulo+'</span>'
                    +'</a>'
                +'</li>';
       });
       var contenidoEnd=contenidoIni+contenido+contenidoFin;
        $('.main-page').html(contenidoEnd);
        
    }	
    
    return {
        render: render
    };
});