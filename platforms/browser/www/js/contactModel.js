define(['app'],function(app) {
	function Contact(values) {
            values = values || {};
            this.Usuario={};
            this.Usuario['persona_nombre'] = values['persona_nombre'] || '';
            this.Usuario['persona_apellidos'] = values['persona_apellidos'] || '';
            this.Usuario['usuario'] = values['usuario'] || '';
            this.Usuario['persona_correo'] = values['persona_correo'] || '';
            this.Usuario['password'] = values['password'] || '';
            this.Usuario['repassword'] = values['repassword'] || '';
            this.Usuario['phone'] = values['phone'] || '';
            this.Usuario['accept'] = values['accept'] || '';
            this.Usuario['id_tipologin'] = values['id_tipologin'] || '';
            this.Usuario['id_rol'] = values['id_rol'] || '';
            this.Usuario['id_app'] = values['id_app'] || 48;
	}

	Contact.prototype.setValues = function(formInput) {
            for(var field in formInput){
                if (this.Usuario[field] !== undefined) {
                        this.Usuario[field] = formInput[field];
                }
            }
	};

	Contact.prototype.validate = function() {
            var result = true;
            if (this.Usuario['accept'].length==0) {
                    result = false;
            }
            return result;
	};
	return Contact;
});