define(["js/list/listView","js/list/listSlider"], function(ListView,ListSlider) {
	function init() {
            if(localStorage.getItem("email")!="" && localStorage.getItem("email")!=null){
                if(localStorage.getItem("idplantilla")!=null){
                    if(localStorage.getItem("idplantilla")==1){
                        ListView.render();
                    }
                    else{
                        ListSlider.render();
                    }
                }
            }
	}
	return {
		init: init
	};
});