var base = {
    init:function(){
        this.initEvent();
        this.wrapDom();
    },
    initEvent:function() {
        $("#content").click(function() {
            alert("hahahaha")
        })
    },
    wrapDom:function(){

    }
}
base.init();