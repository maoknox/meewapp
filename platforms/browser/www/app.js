require.config({
    paths: {
        handlebars: "lib/handlebars",
        text: "lib/text",
        hbs: "lib/hbs"
    },
    shim: {
        handlebars: {
            exports: "Handlebars"
        }
    }
});
define('app',['js/router','js/contactModel'], function(Router,Contact) {
    Router.init();
    FacebookInAppBrowser.settings.appId = '1999950346892051';
    FacebookInAppBrowser.settings.redirectUrl = 'https://www.facebook.com/connect/login_success.html';
    FacebookInAppBrowser.settings.permissions = 'email';

// Optional
    FacebookInAppBrowser.settings.timeoutDuration = 7500;
   
    
    //mensajes push
    
    var contact=null;
    var $$=Dom7;
    var f7 = new Framework7({
        // Enabled pages rendering using Template7
//            swipeBackPage: true,
//            pushState: true,
//            animateNavBackIcon: true,
//            template7Pages: true
    }); 
//    f7.alert('Body','Título',function(){
//        f7.alert('You have clicked the button!!!')
//    });
    FCMPlugin.onNotification(function(data){
//            navigator.vibrate([1000]);
        if(data.wasTapped){
            f7.alert(data.body,data.title);
        }else{
            f7.alert(data.body,data.title);
        }
    });
    var ret={
        f7: f7
//        mainView: mainView,
//        view1:view1,
//        view2:view2,
////        view3:view3,
//        router: Router
    };
    $(".loadcontent").on('click',function(){
//        console.log("load");
    });
    localStorage.setItem("pagina",0);
    localStorage.setItem('email', "");
    var email=localStorage.getItem('email');
//    f7.alert(email);
    var ini=false;
    if(email==null || email.length==0){
        f7.popup('.popup-about',false);
    }
    $$('.share-link').on('click',function(){
        console.log("Entonces");
        if (!FacebookInAppBrowser.exists(FacebookInAppBrowser.settings.appId) || !FacebookInAppBrowser.exists(window.localStorage.getItem('facebookAccessToken')) || window.localStorage.getItem('facebookAccessToken') === null) {
                console.log('[FacebookInAppBrowser] You need to set your app id in FacebookInAppBrowser.settings.appId and have a facebookAccessToken (try login first)');
                iniciaSesionFb();
        }
        else{
            FacebookInAppBrowser.post({
                name: 'Cortés del monte',
                link: 'http://cortesdelmonte.com/',
                message: 'Nuestro café excelso',
                picture: 'http://cortesdelmonte.com/wp-content/uploads/2017/07/Presentacion-Excelso-Cundinamarca.jpg',
                description: 'Nuestro café excelso'}, function(response) {
                    if(response) {
                        console.log('post successful');
                    }
            });
        }
    });
    $$('#cerrarSesion').on('click',function(){
        if (!FacebookInAppBrowser.exists(FacebookInAppBrowser.settings.appId) || !FacebookInAppBrowser.exists(window.localStorage.getItem('facebookAccessToken')) || window.localStorage.getItem('facebookAccessToken') === null) {
                FacebookInAppBrowser.logout(function() {
                f7.popup('.popup-about',false);
            });
        }
        else{
            navigator.app.exitApp();
        }
        
    });
    $$('.loginfb').on('click',function(){
//        console.log("entra a login facebook");
        iniciaSesionFb();
        
    });
    function iniciaSesionFb(){
        f7.showPreloader();
        FacebookInAppBrowser.login({
            send: function() {
                    console.log('login opened');
//                    f7.hidePreloader();
            },
            success: function(access_token) {
                f7.hidePreloader();
                localStorage.setItem('email', "email");
                    console.log('done, access token: ' + access_token);
                    f7.closeModal(".login-screen",false);
            },
            denied: function() {
                f7.hidePreloader();
                    console.log('user denied');
            },
            timeout: function(){
                f7.hidePreloader();
                console.log('a timeout has occurred, probably a bad internet connection');
            },
            complete: function(access_token) {
                f7.hidePreloader();
                    console.log('window closed');
                    if(access_token) {
                            console.log(access_token);
                    } else {
                            console.log('no access token');
                    }
            },
            userInfo: function(userInfo) {
                    if(userInfo) {
                            console.log(JSON.stringify(userInfo));
                    } else {
                            console.log('no user info');
                    }
            }
        });
    }
    
    var mainView = f7.addView('.view-main', {
        dynamicNavbar: true
    });
    ret['mainView']=mainView;
    
    
    $$('.close-popupi').on('click', function () {
        $("#form-login").validate({
            rules: {
                "usuario": "required",
                "password":"required",
            },
            messages: {
                "usuario": "Debe digitar uario",
                "password":"Debe digitar contraseña",
            }});
        $$('.login-screen .link-loginii').on('click', loginMeew);
        f7.loginScreen(".login-screen",false);
        f7.closeModal(".popup-about",false);
    });
    $$('.popback-register').on('click', function () {
        f7.loginScreen(".popup-about",false);
        f7.closeModal(".popup-register",false);
    });
     
    function loginMeew(){
        if ($("#form-login").valid()) {
            contact = new Contact();
            var formInput = f7.formToJSON('#form-login');
            contact.setValues(formInput);
            var datos=JSON.stringify(contact);
            $.ajax({//http://meew.co/dashmeew/
                url: 'http://meew.co/dashmeew/index.php/site/loginPlatformMovile',
//                url: 'http://localhost/meew/index.php/site/loginPlatformMovile',
                dataType: 'json',
                data:JSON.parse(datos),
                type: 'post',
                async:true,
                crossDomain : true,
                before: f7.showPreloader(),
                success: function(data) {
//                    Router.init();
//                    console.log(JSON.stringify(data)+"------------|||||----------------");
//                    var retrivedContent=localStorage.getItem('content');
//                    console.log(JSON.parse(retrivedContent));
                    
                    f7.hidePreloader();
                    if(data.status=='exito'){
                        
//                        $('.toolbar').css('background',data.color);
//                        $('.navbar').css('background',data.color);
//                        $('.subnavbar').css('background',data.color);
                        localStorage.setItem('content', JSON.stringify(data.contplantilla));
                        localStorage.setItem('email', data.usuario.email);
                        localStorage.setItem('personid', data.usuario.personid);
                        localStorage.setItem('personanombre', data.usuario.nombre);
                        localStorage.setItem('token', data.usuario.token);
                        localStorage.setItem("idplantilla", data.idplantilla);
                        f7.closeModal(".login-screen",false);
                        cargaEstilos(data.image,data.color_icon,data.color);
                        cargaMenuBottom(JSON.stringify(data.contmb),data.color_icon,data.color);
//                        console.log(localStorage.getItem("personanombre")+"---------------------");
                        Router.load("list");
                        $("#nombre-usuario").text(localStorage.getItem('personanombre'));
//                        Router.init();
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
    function cargaMenuBottom(contmb,colorIcon,color){
        var number=2;
        var contmbAux=JSON.parse(contmb);
//        console.log(contmbAux);
        
        $.each(contmbAux,function(key,v){
            number=number+1;
            
            var contentmb='<div id="view-'+number+'" class="view tab">'+
          '<div class="navbar">'+
             '<div class="navbar-inner">'+
               '<div class="center sliding"><span class="navbar-logo"></span></div>'+
             '</div>'+
           '</div>'+
           '<div class="pages navbar-through">'+
                '<div class="page planes-page'+number+'">'+
                    '<div class="page-content-views ">'+
                        
                    '</div>'+
                '</div>'+
           '</div>'+
         '</div>';
            $('.views').append(contentmb);
            var menBottom='<a href="#view-'+number+'" class="tab-link view-'+number+'">'+
                    '<i class="f7-icons size-50" >'+v.icon+'</i><span class="tabbar-label" >'+v.nombre_modulo+'</span>'
                '</a>';
                $('.toolbar-inner').append(menBottom);
                
            window["view"+number] = f7.addView('#view-'+number,{dynamicNavbar:true});
            $('.tab-link').css('color',colorIcon);
//            $('.tab-link').click(function(){
//                    $(this).parent().addClass('active').siblings().removeClass('active')	
//            });
//            $('.tab-link .active').css('color','#000');
            ret["view"+number]=window["view"+number];
            $('.view-1').css('color',"#ffffff");
//            $('.view-1').on('click',function(){
//                $('.tab-link').css('color',colorIcon);
//                $(".view-1").css('color',"#fff");
//                mainView.router.back();
//            });
            $(".bars-pers").css("color",colorIcon);
            $(".toolbar-inner").css("background-color",color);
            $(".toolbar-inner").css("opacity","0.6");
            
            creaEvento(number,v,colorIcon,color);
//            $('.pages').css('background',color);
//            $('.page').css('background',color);
//            $('a.swiper-read_more').css('color',color);
        });
        
    }
    function creaEvento(n,v,colorIcon,color){
        
        $(".view-"+n).on('click',function(){
            $('.tab-link').css('color',colorIcon);
//                console.log("pasa a vista "+n);
                $(".view-"+n).css('color',"#fff");
//                $('.toolbar').css('background',color);
                if(n==1){
                    Router.load("list");
                }else{
                    Router.load("loadbmenu",{id:n,idmod:v.id_modulo_app,tipomod:v.tipo_modulo,nombremod:v.nombre_modulo});
                }
            });
    }
    function cargaEstilos(image,colorIcon,color){
        $(".main-page").css("background",'url(http://meew.co/dashmeew/'+image+') no-repeat center center');
        $(".main-page").css("background-attachment",'scroll');
        $(".main-page").css("background-size",'auto auto');
        $(".main-page").css("background-attachment",'fixed');
        $(".main-page").css("-webkit-background-size",'100%');
        $(".main-page").css("-moz-background-size",'100%');
        $(".main-page").css("-o-background-size",'100%');
        $(".main-page").css("background-size",'100%');
        $(".main-page").css("-webkit-background-size",'cover');
        $(".main-page").css("-moz-background-size",'cover');
        $(".main-page").css("-o-background-size",'cover');
        $(".main-page").css("background-size",'cover');
        $('.view').css('background-color',color);
                   $('.views').css('background-color',color);
//        $(".bars-pers").css('color',colorIcon);
//        $('.navbar .toolbar .subnavbar').css('background',color);
    }
    $$('.link-volver').on('click', function () {
        f7.popup('.popup-about',false); 
        f7.closeModal(".popup-register",false);  
    });
    $$('.link-register').on('click', function () {       
        f7.popup('.popup-register',false); 
        $("#fomr-serv").validate();
        $.each(JSON.parse(localStorage.getItem('campos_form')),function(key,value){
            if(value.activo==1){
                if(key!='rango_edad' && key!='genero' && key!='politicas_privacidad_activo'){
                    $('.popup-register #inputs-reg').append('<div class="input-login" ><input name="'+key+'" id="'+key+'" placeholder="'+value.label+'" type="text"  ></div><br>');
                }
                else{
                    if(key=='politicas_privacidad_activo'){
                        $('.popup-register #inputs-reg').append('<div class="input-login" ><label class="labelerr">Acepta términos y condiciones?</label></div><br>');                                                                        
                        $('.popup-register #inputs-reg').append('<div class="input-login" ><label><input type="checkbox" name="'+key+'" id="'+key+'_si" value="1">Si</label></div><br>');                                                
                        $('.popup-register #inputs-reg').append('<div class="input-login" ><label><input type="checkbox" name="'+key+'" id="'+key+'_no" value="0">No</label></div><br>'); 
                    
                    }else {
                        $('.popup-register #inputs-reg').append('<div class="input-login" ><select name="'+key+'" id="'+key+'" ><option value="">Seleccione '+value.label+'...</option></select></div><br>');                        
                        $.each(JSON.parse(localStorage.getItem('parametros')),function(keypar,valuepar){
                            if(key=="rango_edad" && valuepar.tipo=="rango_edad"){
                                $("#"+key).append("<option value='"+valuepar.idparametros+"'>"+valuepar.nombre+"</option>");
                            }
                            else if(key=="genero" && valuepar.tipo=="genero"){
                                $("#"+key).append("<option value='"+valuepar.idparametros+"'>"+valuepar.nombre+"</option>");
                            }

                        });
                    }

                }
                
                $("[name="+key+"]").rules("add",{required: true,messages:{required:"Campo requerido"}});
            }
         });
        
        
        $$(".creaCuenta").on("click", registerUser);
        f7.closeModal(".popup-about",false);  
    });
    $$('.open-services').on('click', function () {
        f7.popup('.popup-services');
    });var mainView = f7.addView('.view-main', {
        dynamicNavbar: true
    }); 
    
    document.addEventListener("backbutton", onBackKeyDown, false); 
    var view1=f7.addView('#view-1',{dynamicNavbar:true});
    ret['view1']=view1;
    ret['router']=Router;
    f7.onPageInit('*',function(page){
        $$(page.navbarInnerContainer).find('.envia_cserv').on('click',function(){ 
            var formData = f7.formToJSON('#fomr-serv');
            f7.alert(JSON.stringify(formData));
        });
    });
    function onBackKeyDown(e){
        mainView.activePage.name="apphome";
        mainView.router.back();
    }
    function registerUser(){
        if ($("#fomr-serv").valid()) {
            contact = new Contact();
            var formInput = $('#fomr-serv').serialize();
//            contact.setValues(formInput);
//            f7.alert(contact.Usuario["accept"]);
//            return false;
//            if (!contact.validate()) {
//                f7.alert("Debe aceptar los términos y condiciones");
//                return;
//            }
            var datos=formInput;
            $.ajax({
                url: 'http://meew.co/dashmeew/index.php/site/registerPlatformMovile',
                dataType: 'json',
                data:datos,
                type: 'post',
                async:true,
                crossDomain : true,
                before: f7.showPreloader(),
                success: function(data) {
                    f7.hidePreloader();
                    f7.alert(data.msg);
                    if(data.status=='exito'){
//                        console.log(contact.Usuario["email"]);
                        localStorage.setItem('email', contact.Usuario["email"]);
                        f7.closeModal(".popup-register",false);
                    }
                },
                error:function(error){
                    f7.hidePreloader();
                    f7.alert("error en la comunicación con el servidor");
                },
                
            });
            
        }
    }
    
   return ret;
});

