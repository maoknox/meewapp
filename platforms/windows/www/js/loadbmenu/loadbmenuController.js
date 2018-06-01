define(["js/loadbmenu/loadbmenuView"], function(LoadbmenuView) {
 
//    var state = {isNew: false};
//    var contact = null;
 
    function init(query){//query
//        console.log(JSON.stringify(query));
//        var contacts = tempInitializeStorage();
//        alert(query.idmod)
            LoadbmenuView.render({
                id:query.id,
                idmod:query.idmod,
                tipomod:query.tipomod,
                nombremod:query.nombremod
            });
//        if (query && query.id) {
//            var contacts = JSON.parse(localStorage.getItem("f7Base"));
//            for (var i = 0; i < contacts.length; i++) {
//                if (contacts[i].id === query.id) {
//                    contact = contacts[i];
//                    state.isNew = false;
//                    break;
//                }
//            }
//        }
//        else {
//            contact = { id: Math.floor((Math.random() * 100000) + 5).toString()};
//            state.isNew = true;
//        }
//        ServicesView.render();
    }    return {
        init: init
    };
});