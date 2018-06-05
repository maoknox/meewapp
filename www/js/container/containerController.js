define(["js/container/containerView"], function(ContainerView) {

    function init(query){
            ContainerView.render({
                idmod:query.idmod,
                tipomod:query.tipomod,
                nombremod:query.nombremod
            });
    }    return {
        init: init
    };
});