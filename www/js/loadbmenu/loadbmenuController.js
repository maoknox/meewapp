define(["js/loadbmenu/loadbmenuView"], function(LoadbmenuView) {

    function init(query){
            LoadbmenuView.render({
                id:query.id,
                idmod:query.idmod,
                tipomod:query.tipomod,
                nombremod:query.nombremod
            });
    }    return {
        init: init
    };
});