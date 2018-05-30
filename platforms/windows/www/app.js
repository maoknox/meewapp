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
        modalTitle: "Cortes del monte"
        // Enabled pages rendering using Template7
//            swipeBackPage: true,
//            pushState: true,
//            animateNavBackIcon: true,
//            template7Pages: true

    }); 
//    f7.alert('Body','Título',function(){
//        f7.alert('You have clicked the button!!!')
//    });
if (typeof FCMPlugin != 'undefined') {
   FCMPlugin.onNotification(function(data){
//            navigator.vibrate([1000]); 
        if(data.wasTapped){
            f7.alert(data.body,data.title);
        }else{ 
            f7.alert(data.body,data.title);
        }
    });
}

//    
    var ret={
        f7: f7
//        mainView: mainView,
//        view1:view1,
//        view2:view2,
////        view3:view3,
//        router: Router
    };
    //Abre link de términos y condiciones
    $(".link-tycond").on("click",function(){
        console.log("terminos");
        $(".popup-tycond .list-block-contact").html(localStorage.getItem('tycond'));
        f7.popup('.popup-tycond',false);
    });
    
    $$('.popback-lintycond').on('click', function () {
        f7.closeModal(".popup-tycond",false);
    });
    $(".link-perfil").on("click",function(){
        $('.popup-dataperfil #inputs-perfil').html("");
        var usuario=JSON.parse(localStorage.getItem('usuarioreg'));
        console.log(JSON.stringify(usuario)+"---------------");
        $("#form-perf").validate();
        $.each(JSON.parse(localStorage.getItem('campos_form')),function(key,value){
            console.log(key);
            console.log(usuario[key]);
            if(value.activo==1){
                if(key!='id_rango_edad' && key!='id_genero'  && key!='politicas_privacidad_activo' && key!='nombre_usuario'){                    
                    if(key=='persona_correo'){
                        $('.popup-dataperfil #inputs-perfil').append('<div class="input-login " ><input readonly type="text"  value="'+usuario[key]+'" class="line-input"  ><input name="'+key+'" id="'+key+'" type="hidden"  value="'+usuario[key]+'"  ></div><br>');                   
                    }
                    else{ 
                        $('.popup-dataperfil #inputs-perfil').append('<div class="input-login " ><input name="'+key+'" id="'+key+'" placeholder="'+value.label+'" type="text" class="line-input" value="'+usuario[key]+'"  ></div><br>');                   
                        if(key=='persona_telefono'){
                            $("[name="+key+"]").rules("add",{
                                required: true,
                                phoneUS: true
                                ,messages:{
                                    required:"Campo requerido",
                                    phoneUS: "Teléfono inválido"
                                }
                            });
                        }
                        else{
                            $("[name="+key+"]").rules("add",{required: true,messages:{required:"Campo requerido"}});
                        }
                    }
                }else if(key=='id_rango_edad' || key=='id_genero'){
                    $('.popup-dataperfil #inputs-perfil').append('<div class="input-login" ><select name="'+key+'" id="'+key+'" class="line-input"><option value="">Seleccione '+value.label+'...</option></select></div><br>');                        
                    $("[name="+key+"]").rules("add",{required: true,messages:{required:"Campo requerido"}});
                    $.each(JSON.parse(localStorage.getItem('parametros')),function(keypar,valuepar){
                        if(key=="id_rango_edad" && valuepar.tipo=="rango_edad"){
                            selected="";
                            if(valuepar.idparametros==usuario[key]){selected="selected";}
                            $("#"+key).append("<option value='"+valuepar.idparametros+"' "+selected+">"+valuepar.nombre+"</option>");
                        }
                        else if(key=="id_genero" && valuepar.tipo=="genero"){
                            selected="";
                            if(valuepar.idparametros==usuario[key]){selected="selected";}
                            $("#"+key).append("<option value='"+valuepar.idparametros+"'  "+selected+">"+valuepar.nombre+"</option>");
                        }

                    });
                }
                $(".line-input").css("border","1px solid "+localStorage.getItem('color'));
            }
         });
        $(".btnmodifdata").css("color",localStorage.getItem('color'))
        $(".btnmodifdata").css("border","1px solid "+localStorage.getItem('color'));
        $(".btnmodifdata").css({"margin-left":"auto","margin-right":"auto"});
       f7.popup('.popup-dataperfil',false);
    });
    $(".btnmodifdata").on("click",function(){
        modificaDatos();
    });
    $$('.popback-linkperfil').on('click', function () {
        f7.closeModal(".popup-dataperfil",false);
    });
//    $(".loadcontent").on('click',function(){
////        console.log("load");
//    });
    localStorage.setItem("pagina",0);
    localStorage.setItem('email', "");
    var email=localStorage.getItem('email');
    
//    f7.alert(email);
    var ini=false;
    if(email=="" || email==null || email.length==0){
        f7.popup('.popup-about',false);
    }
    else{
        console.log(JSON.parse(localStorage.getItem('dataapp')));
        data=JSON.parse(localStorage.getItem('dataapp'));
        cargaEstilos(data.image,data.color_icon,data.color);
        cargaMenuBottom(JSON.stringify(data.contmb),data.color_icon,data.color);
    }
    $$(".btnsharefb").on("click",function(){
        console.log("share");
        window.plugins.socialsharing.share('Message, subject, image and link', 'The subject', 'http://meew.co/dashmeew/uploads/5241PresentacionExcelsoSantander2.jpg', 'http://www.x-services.nl');
//        window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
//        window.plugins.socialsharing.shareViaFacebook('Message via Facebook', "https://i.ytimg.com/vi/URRYB6XNt-w/maxresdefault.jpg", "http://meew.co/dashmeew/uploads/1251-Presentacion%20Excelso%20Cundinamarca.jpg", function() {console.log('share ok')}, function(errormsg){alert(errormsg)});
//        window.plugins.socialsharing.shareViaTwitter('Message and link via Twitter', null, 'http://meew.co/dashmeew/uploads/1251-Presentacion%20Excelso%20Cundinamarca.jpg')
    });
//    var options = {
//      message: 'share this', // not supported on some apps (Facebook, Instagram)
//      subject: 'the subject', // fi. for email
//      files: ['', ''], // an array of filenames either locally or remotely
//      url: 'http://meew.co/dashmeew/uploads/1251-Presentacion%20Excelso%20Cundinamarca.jpg',
//      chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
//    }

//    var onSuccess = function(result) {
//      console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
//      console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
//    }

//    var onError = function(msg) {
//      console.log("Sharing failed with message: " + msg);
//    }
    $$('#cerrarSesion').on('click',function(){
//        if (!FacebookInAppBrowser.exists(FacebookInAppBrowser.settings.appId) || !FacebookInAppBrowser.exists(window.localStorage.getItem('facebookAccessToken')) || window.localStorage.getItem('facebookAccessToken') === null) {
                FacebookInAppBrowser.logout(function() {
                    f7.popup('.popup-about',false);
                });
//        }
//        else{
            localStorage.removeItem("email");
            navigator.app.exitApp();
//        }
    });
    $('.loginfb').on('click',function(){
        console.log("entra a login facebook");
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
                f7.hidePreloader();
                    if(userInfo) {
                            console.log(JSON.stringify(userInfo));
                    } else {
                            console.log('no user info');
                    }
            },
            error:function(){
                f7.hidePreloader();
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
    $$(".cambia-clave").on('click',function(){     
        
        f7.popup('.popup-cl',false);
        $('.popup-cl #inputs-cl').html("");
        $("#form-camclave").validate();
        $('.popup-cl #inputs-cl').append('<div class="input-login " ><input name="passwdregc" id="passwdregc" placeholder="Password" type="password" class="line-input"  ></div><br>');
        $('.popup-cl #inputs-cl').append('<div class="input-login " ><input name="passwordiic" id="passwordiic" placeholder="Confirmar password" type="password" class="line-input"  ></div><br>');                        
        $(".btncl").css("color",localStorage.getItem('color'))
        $(".btncl").css("border","1px solid "+localStorage.getItem('color'));
        $(".btncl").css({"margin-left":"auto","margin-right":"auto"});
        $(".line-input").css("border","1px solid "+localStorage.getItem('color'));
//        console.log($("#passwdregc").val()+"-------------");
//        $("#passwdregc").rules("add",{
//            required:true,
//            messages:{
//                required:"Campo requerido"
//            }
//        });
        $("#passwdregc").rules("add",{
            required: true,
            pwcheck: true,
            minlength:8 
            ,messages:{
                required:"Campo requerido",
                pwcheck: "El password debe tener al menos una letra en minúscula y al menos un dígito",
                minlength: "El password debe tener mínimo 8 carácteres"
            }
        });
        $("#passwordiic").rules("add",{
                required: true,
                equalTo: '#passwdregc'
            ,messages:{
                required:"Campo requerido",
                equalTo: "La confirmación de password no coincide",
            }
        });
        $.validator.addMethod("pwcheck", function(value) {
            return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
                && /[a-z]/.test(value) // has a lowercase letter
                && /\d/.test(value) // has a digit
         });
    });
    
    $$(".envia_clave").on("click",function(){
        if ($("#form-camclave").valid()) {
            var formClave = f7.formToJSON('#form-camclave');
            formClave.persona_correo=localStorage.getItem('email');
            console.log(formClave);
            $.ajax({//http://meew.co/dashmeew/
//                url: 'http://meew.co/dashmeew/index.php/site/modificaDatosApp',
                url: 'http://localhost/meew/index.php/site/cambiaClaveMovile',
                dataType: 'json',
                data:formClave,
                type: 'post',
                async:true,
                crossDomain : true,
                before: f7.showPreloader(),
                success: function(data) {
                    
                    f7.hidePreloader();
                    if(data.status=='exito'){
                      f7.alert("Contraseña actualizada");
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
    });
    $$(".popback-cl").on('click',function(){      
        f7.closeModal('.popup-cl',false);
    });
    
//    popback-register
    $$('.popback-register').on('click', function () {
        f7.loginScreen(".popup-about",false);
        f7.closeModal(".popup-register",false);
    });
    function modificaDatos(){
        if ($("#form-perf").valid()) {
            var formModifData = f7.formToJSON('#form-perf');
            $.ajax({//http://meew.co/dashmeew/
//                url: 'http://meew.co/dashmeew/index.php/site/modificaDatosApp',
                url: 'http://localhost/meew/index.php/site/modificaPerfilMovile',
                dataType: 'json',
                data:formModifData,
                type: 'post',
                async:true,
                crossDomain : true,
                before: f7.showPreloader(),
                success: function(data) {
                    
                    f7.hidePreloader();
                    if(data.status=='exito'){
                      f7.alert("Datos modificados satisfactoriamente");
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
    function loginMeew(){
        if ($("#form-login").valid()) {
            contact = new Contact();
            var formInput = f7.formToJSON('#form-login');
            contact.setValues(formInput);
            var datos=JSON.stringify(contact);
            $.ajax({//http://meew.co/dashmeew/
//                url: 'http://meew.co/dashmeew/index.php/site/loginPlatformMovile',
                url: 'http://localhost/meew/index.php/site/loginPlatformMovile',
                dataType: 'json',
                data:JSON.parse(datos),
                type: 'post',
                async:true,
                crossDomain : true,
                before: f7.showPreloader(),
                success: function(data) {
//                    Router.init();
//                    console.log(JSON.stringify(data));
//                    var retrivedContent=localStorage.getItem('content');
//                    console.log(JSON.parse(retrivedContent));
                    
                    f7.hidePreloader();
                    if(data.status=='exito'){
//                        $('.toolbar').css('background',data.color);
//                        $('.navbar').css('background',data.color);
//                        $('.subnavbar').css('background',data.color);
                        localStorage.setItem('dataapp', JSON.stringify(data));
                        localStorage.setItem('tycond', data.tycond);
                        localStorage.setItem('usuarioreg', JSON.stringify(data.usuario));
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
                        $(".user-icon").append('<span class="icon-user size-29"></span>');
                        $(".tyc-icon").append('<span class="icon-book size-29"></span>');
                        $(".cerrar-icon").append('<span class="icon-switch size-29"></span>');
                        $(".men-lat").css("color",data.color);
                        $(".border_lat").css("border-top","2px solid "+data.color);
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
        var number=1;
        var contmbAux=JSON.parse(contmb);
        
        $.each(contmbAux,function(key,v){
            console.log(v);
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
                    '<span class="'+v.icon+' size-29"></span><span class="tabbar-label" >'+v.nombre_modulo+'</span>'
                '</a>';
                $('.toolbar-inner').append(menBottom);
                
            window["view"+number] = f7.addView('#view-'+number,{dynamicNavbar:true});
            $('.tab-link').css('color',colorIcon);
//            $('.tab-link').click(function(){
//                    $(this).parent().addClass('active').siblings().removeClass('active')	
//            });
//            $('.tab-link .active').css('color','#000');
            ret["view"+number]=window["view"+number];
            $('.view-1').css('color',"#fff");
            $('.view-1').on('click',function(){
                $('.tab-link').css('color',colorIcon);
                $('.view-1').css('color',"#fff");
            });
            
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
            console.log(colorIcon);
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
        $('.popup-register #inputs-reg').html("");
        $("#fomr-serv").validate();
        console.log(localStorage.getItem('campos_form'));
        $.each(JSON.parse(localStorage.getItem('campos_form')),function(key,value){
            if(value.activo==1){
                if(key!='id_rango_edad' && key!='id_genero' && key!='politicas_privacidad_activo'){
                    $('.popup-register #inputs-reg').append('<div class="input-login " ><input name="'+key+'" id="'+key+'" placeholder="'+value.label+'" type="text" class="line-input"  ></div><br>');                   
                    if(key=='persona_correo'){
                        $("[name="+key+"]").rules("add",{
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
                    }else if(key=='persona_telefono'){
                        $("[name="+key+"]").rules("add",{
                            required: true,
                            phoneUS: true
                            ,messages:{
                                required:"Campo requerido",
                                phoneUS: "Teléfono inválido"
                            }
                        });
                    }
                    else{
                        $("[name="+key+"]").rules("add",{required: true,messages:{required:"Campo requerido"}});
                    }
                    if(key=='nombre_usuario'){
                        $('.popup-register #inputs-reg').append('<div class="input-login " ><input name="passwdreg" id="passwdreg" placeholder="Password" type="password" class="line-input"  ></div><br>');
                        $('.popup-register #inputs-reg').append('<div class="input-login " ><input name="passwordii" id="passwordii" placeholder="Confirmar password" type="password" class="line-input"  ></div><br>');                        
                        $("#passwdreg").rules("add",{
                            required: true,
                            pwcheck: true,
                            minlength:8 
                            ,messages:{
                                required:"Campo requerido",
                                pwcheck: "El password debe tener al menos una letra en minúscula y al menos un dígito",
                                minlength: "El password debe tener mínimo 8 carácteres"
                            }
                        });
                        $("#passwordii").rules("add",{
                                required: true,
                                equalTo: '#passwdreg'
                            ,messages:{
                                required:"Campo requerido",
                                equalTo: "La confirmación de password no coincide",
                            }
                        });
                        $.validator.addMethod("pwcheck", function(value) {
                            return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
                                && /[a-z]/.test(value) // has a lowercase letter
                                && /\d/.test(value) // has a digit
                        });
                    }
                }
                else{
                    if(key=='politicas_privacidad_activo'){
                        $('.popup-register #inputs-reg').append('<div class="input-login" ><label class="labelerr">Acepta términos y condiciones?</label></div><br>');                                                                        
                        $('.popup-register #inputs-reg').append('<div class="input-login" style="float:left;display:inline"><label><input  type="radio" name="'+key+'" id="'+key+'_si" value="1" class="line-input">Si</label></div>');                                                
                        $('.popup-register #inputs-reg').append('<div class="input-login" ><label><input type="radio" name="'+key+'" id="'+key+'_no" value="0" class="line-input">No</label></div><br>');
                        $('.popup-register #inputs-reg').append('<div class="input-login link-tycondreg" ><a href="#" style="color:#999"><u>Términos y condiciones</u></a></div><br>');
                        $('.link-tycondreg').on("click",function(){                            
                            $(".popup-tycond .list-block-contact").html(localStorage.getItem('tycond'));
                            f7.popup('.popup-tycond',false);
                        });
                        $("[name="+key+"]").rules("add",{required: true,messages:{required:"Campo requerido"}});
                        
                    }else {
                        $('.popup-register #inputs-reg').append('<div class="input-login" ><select name="'+key+'" id="'+key+'" class="line-input"><option value="">Seleccione '+value.label+'...</option></select></div><br>');                        
                        $("[name="+key+"]").rules("add",{required: true,messages:{required:"Campo requerido"}});
                        $.each(JSON.parse(localStorage.getItem('parametros')),function(keypar,valuepar){
                            if(key=="id_rango_edad" && valuepar.tipo=="rango_edad"){
                                $("#"+key).append("<option value='"+valuepar.idparametros+"'>"+valuepar.nombre+"</option>");
                            }
                            else if(key=="id_genero" && valuepar.tipo=="genero"){
                                $("#"+key).append("<option value='"+valuepar.idparametros+"'>"+valuepar.nombre+"</option>");
                            }

                        });
                    }

                }
                $(".line-input").css("border","1px solid "+localStorage.getItem('color'));
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
            var formInput = $('#fomr-serv').serialize()+"&idapplication="+localStorage.getItem('idapplication');
//            contact.setValues(formInput);
//            f7.alert(contact.Usuario["accept"]);
//            return false;
//            if (!contact.validate()) {
//                f7.alert("Debe aceptar los términos y condiciones");
//                return;
//            }
            var datos=formInput;
            $.ajax({
                url: 'http://localhost/meew/index.php/site/registerPlatformMovile',
//                url: 'http://meew.co/dashmeew/index.php/site/registerPlatformMovile',
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
                        localStorage.setItem('tycond', data.tycond);
                        localStorage.setItem('usuarioreg', JSON.stringify(data.usuario));
                        localStorage.setItem('content', JSON.stringify(data.contplantilla));
                        localStorage.setItem('email', data.usuario.email);
                        localStorage.setItem('personid', data.usuario.personid);
                        localStorage.setItem('personanombre', data.usuario.nombre);
                        localStorage.setItem('token', data.usuario.token);
                        localStorage.setItem("idplantilla", data.idplantilla);
                        f7.closeModal(".popup-register",false);
                        cargaEstilos(data.image,data.color_icon,data.color);
                        cargaMenuBottom(JSON.stringify(data.contmb),data.color_icon,data.color);
//                        console.log(localStorage.getItem("personanombre")+"---------------------");
                        $(".user-icon").append('<span class="icon-user size-29"></span>');
                        $(".tyc-icon").append('<span class="icon-book size-29"></span>');
                        $(".cerrar-icon").append('<span class="icon-switch size-29"></span>');
                        $(".men-lat").css("color",data.color);
                        $(".border_lat").css("border-top","2px solid "+data.color);
                        Router.load("list");
                        $("#nombre-usuario").text(localStorage.getItem('personanombre'));
//                        Router.init();

                    }
                    else if(data.status=='novalidate'){
                        var msg="";
                        f7.hidePreloader();
                        $.each(data.validate,function(key,value){
                            if(value!=false){
                                msg=msg+value+"<br>";
                            }
                        });
                        f7.alert(msg);   
                    }
                    else if(data.status=='noexito'){
                        f7.hidePreloader();
                        f7.alert(data.msg);
                    }
                },
                error:function(error){
                    f7.hidePreloader();
                    f7.alert("error en la comunicación con el servidor");
                }
            });
        }
    }
    
   return ret;
});

