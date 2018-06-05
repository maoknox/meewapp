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
//    var url="http://localhost/meew";
    var url="http://meew.co/dashmeew";
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
    };
    //Abre link de términos y condiciones
    $(".link-tycond").on("click",function(){
        console.log("terminos");
        $(".popup-tycond .list-block-contact").html(localStorage.getItem('tycond'));
        f7.popup('.popup-tycond',false);
    });
    //abre página de términos y condiciones
    $$('.popback-lintycond').on('click', function () {
        f7.closeModal(".popup-tycond",false);
    });
    //abre página de formulario de perfil de usuario
    $(".link-perfil").on("click",function(){
        $('.popup-dataperfil #inputs-perfil').html("");
        var usuario=JSON.parse(localStorage.getItem('usuarioreg'));
        
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
    //al hacer clic en modificar datos, llama a función modificaDatos
    $(".btnmodifdata").on("click",function(){
        modificaDatos();
    });
    //cierra popup de formulario de perfil
    $$('.popback-linkperfil').on('click', function () {
        f7.closeModal(".popup-dataperfil",false);
    });
    localStorage.setItem("pagina",0);
    var email=localStorage.getItem('email');
    

    var ini=false;
    //si no existe email, abre ventana para registro o login, de lo contrario carga contenido de aplicación
    if(email=="" || email==null || email.length==0){
        f7.popup('.popup-about',false);
    }
    else{
        console.log(JSON.parse(localStorage.getItem('dataapp')));
        data=JSON.parse(localStorage.getItem('dataapp'));
        cargaEstilos(data.image,data.color_icon,data.color);
        cargaMenuBottom(JSON.stringify(data.contmb),data.color_icon,data.color);
    }
    //botón para compartir en facebook
    $$(".btnsharefb").on("click",function(){
        console.log("share");
        window.plugins.socialsharing.share('Message, subject, image and link', 'The subject', 'http://meew.co/dashmeew/uploads/5241PresentacionExcelsoSantander2.jpg', 'http://www.x-services.nl');
//        window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
//        window.plugins.socialsharing.shareViaFacebook('Message via Facebook', "https://i.ytimg.com/vi/URRYB6XNt-w/maxresdefault.jpg", "http://meew.co/dashmeew/uploads/1251-Presentacion%20Excelso%20Cundinamarca.jpg", function() {console.log('share ok')}, function(errormsg){alert(errormsg)});
//        window.plugins.socialsharing.shareViaTwitter('Message and link via Twitter', null, 'http://meew.co/dashmeew/uploads/1251-Presentacion%20Excelso%20Cundinamarca.jpg')
    });
    //función para cerrar sesión
    $$('#cerrarSesion').on('click',function(){
        FacebookInAppBrowser.logout(function() {
            f7.popup('.popup-about',false);
        });
        localStorage.removeItem("datafb");
        localStorage.removeItem("email");
        navigator.app.exitApp();

    });
    //función para realizar login por facebook
    $('.loginfb').on('click',function(){
        console.log("entra a login facebook");
        iniciaSesionFb();
        
    });
    //función que llama a servicio para iniciar sesión
    function iniciaSesionFb(){
        f7.showPreloader();
        var success="";
        var dataUser="";
        FacebookInAppBrowser.login({
            send: function() {
                    console.log('login opened');
//                    f7.hidePreloader();
            },
            success: function(access_token,userInfo) {
                f7.hidePreloader();
                success=1;
                console.log('done, access token: ' + access_token);
                  FacebookInAppBrowser.getInfo(function(response) {
                    if(response) {
                        localStorage.setItem("datafb",response);
                        console.log(response);
                        response.idapp=localStorage.getItem('idapplication');
                        $.ajax({
                            url: url+'/index.php/site/loginMFBook',
                            dataType: 'json',
                            data:response,
                            type: 'post',
                            async:true,
            //                crossDomain : true,
                            before: f7.showPreloader(),
                            success: function(data) {
                                f7.hidePreloader();
                                if(data.status=='exito'){
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
                                    $(".user-icon").append('<span class="icon-user size-29"></span>');
                                    $(".tyc-icon").append('<span class="icon-book size-29"></span>');
                                    $(".cerrar-icon").append('<span class="icon-switch size-29"></span>');
                                    $(".men-lat").css("color",data.color);
                                    $(".border_lat").css("border-top","2px solid "+data.color);
                                    Router.load("list");
                                    $("#nombre-usuario").text(localStorage.getItem('personanombre'));
                                }
                                else{
                                    f7.alert(data.msg);
                                }
                            },
                            error:function(error){
                                f7.hidePreloader();
                                f7.alert("Error en comunicación con el servidor, revise la conexión a internet o inténtelo más tarde.");
                            },

                        });
                    }
                });  
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
                    
                    
            },
            userInfo: function(userInfo) {
                dataUser=userInfo;
                f7.hidePreloader();
            },
            error:function(){
                f7.hidePreloader();
            }
        });
    }
    //añade vista principal
    var mainView = f7.addView('.view-main', {
        dynamicNavbar: true
    });
    ret['mainView']=mainView;
    
    //crea validación de campos de login, usuario y contraseña
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
    //creación de formulario y validación para cambiar clave
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
    //función que llama el servicio para cambiar clave
    $$(".envia_clave").on("click",function(){
        if ($("#form-camclave").valid()) {
            var formClave = f7.formToJSON('#form-camclave');
            formClave.persona_correo=localStorage.getItem('email');
            console.log(formClave);
            $.ajax({
                url: url+'/index.php/site/cambiaClaveMovile',
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
                },
                
            });
        }
    });
    //cierra el popup del formulario de cambio de clave
    $$(".popback-cl").on('click',function(){      
        f7.closeModal('.popup-cl',false);
    });
    
//    cierra el popup de formulario de registro
    $$('.popback-register').on('click', function () {
        f7.loginScreen(".popup-about",false);
        f7.closeModal(".popup-register",false);
    });
    //función que llama el servicio para modificar datos
    function modificaDatos(){
        if ($("#form-perf").valid()) {
            var formModifData = f7.formToJSON('#form-perf');
            $.ajax({
                url: url+'/index.php/site/modificaPerfilMovile',
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
                },
                
            });
        }
    }
    //función que llama el servicio para realizar login con usuario y contraseña
    function loginMeew(){
        if ($("#form-login").valid()) {
            contact = new Contact();
            var formInput = f7.formToJSON('#form-login');
            contact.setValues(formInput);
            var datos=JSON.stringify(contact);
            $.ajax({//http://meew.co/dashmeew/
//                url: 'http://meew.co/dashmeew/index.php/site/loginPlatformMovile',
                url: url+'/index.php/site/loginPlatformMovile',
                dataType: 'json',
                data:JSON.parse(datos),
                type: 'post',
                async:true,
                crossDomain : true,
                before: f7.showPreloader(),
                success: function(data) {
                    f7.hidePreloader();
                    if(data.status=='exito'){
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
                        $(".user-icon").append('<span class="icon-user size-29"></span>');
                        $(".tyc-icon").append('<span class="icon-book size-29"></span>');
                        $(".cerrar-icon").append('<span class="icon-switch size-29"></span>');
                        $(".men-lat").css("color",data.color);
                        $(".border_lat").css("border-top","2px solid "+data.color);
                        Router.load("list");
                        $("#nombre-usuario").text(localStorage.getItem('personanombre'));
                    }
                    else{
                        f7.alert(data.msg);
                    }
                },
                error:function(error){
                    f7.hidePreloader();
                    f7.alert("Error en comunicación con el servidor, revise la conexión a internet o inténtelo más tarde.");
                },
                
            });
        }
    }
    //función que se encarga de crear el menú inferior, cargar estilos y menús en general
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
            ret["view"+number]=window["view"+number];
            $('.view-1').css('color',"#fff");
            $('.view-1').on('click',function(){
                $('.tab-link').css('color',colorIcon);
                $('.view-1').css('color',"#fff");
            });
            $(".bars-pers").css("color",colorIcon);
            $(".toolbar-inner").css("background-color",color);
            $(".toolbar-inner").css("opacity","0.6");
            
            creaEvento(number,v,colorIcon,color);
        });
        
    }
    //función que asocia las funciones al menú inferior
    function creaEvento(n,v,colorIcon,color){
        $(".view-"+n).on('click',function(){
            console.log(colorIcon);
            $('.tab-link').css('color',colorIcon);
                $(".view-"+n).css('color',"#fff");
                if(n==1){
                    Router.load("list");
                }else{
                    Router.load("loadbmenu",{id:n,idmod:v.id_modulo_app,tipomod:v.tipo_modulo,nombremod:v.nombre_modulo});
                }
            });
    }
    //función que carga estilos generados en el dashboard
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
    }
    //cerrar modal de formulario de registro
    $$('.link-volver').on('click', function () {
        f7.popup('.popup-about',false); 
        f7.closeModal(".popup-register",false);  
    });
    //link que crea el formulario y validación del registro del usuario en la aplicación
    $$('.link-register').on('click', function () {       
        f7.popup('.popup-register',false); 
        $('.popup-register #inputs-reg').html("");
        $("#fomr-serv").validate();
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
    //programación del botón volver del teléfono (android)
    document.addEventListener("backbutton", onBackKeyDown, false); 
    //adiciona la vista a framework7
    var view1=f7.addView('#view-1',{dynamicNavbar:true});
    ret['view1']=view1;
    ret['router']=Router;
    
    f7.onPageInit('*',function(page){
        $$(page.navbarInnerContainer).find('.envia_cserv').on('click',function(){ 
            var formData = f7.formToJSON('#fomr-serv');
            f7.alert(JSON.stringify(formData));
        });
    });
    //función para programar botón volver
    function onBackKeyDown(e){
        mainView.activePage.name="apphome";
        mainView.router.back();
    }
    //función que consume servicio para registrar al usuario e iniciar sesión
    function registerUser(){
        if ($("#fomr-serv").valid()) {
            contact = new Contact();
            var formInput = $('#fomr-serv').serialize()+"&idapplication="+localStorage.getItem('idapplication');
            var datos=formInput;
            $.ajax({
                url: url+'/index.php/site/registerPlatformMovile',
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
                        $(".user-icon").append('<span class="icon-user size-29"></span>');
                        $(".tyc-icon").append('<span class="icon-book size-29"></span>');
                        $(".cerrar-icon").append('<span class="icon-switch size-29"></span>');
                        $(".men-lat").css("color",data.color);
                        $(".border_lat").css("border-top","2px solid "+data.color);
                        Router.load("list");
                        $("#nombre-usuario").text(localStorage.getItem('personanombre'));

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

