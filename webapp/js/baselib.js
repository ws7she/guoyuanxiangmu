var base = {
    init: function () {
        this.initEvent();
        this.wrapDom();
    },
    initEvent: function () {
        $("#content").click(function () {
            alert("hahahaha")
        });
        $("#update").on("click", function () {
            var uid = $("#uid").val();
            var pwd = $("#pwd").val();
            if (uid == "" || uid == null || pwd == "" || pwd == null) {
                alert("用户名和密码都不为空")
            } else {
                $.ajax({
                    //url里面是请求的地址
                    url: "http://www.baidu.com",
                    data: ({
                        //这里是 post请求时后端需要传的用户名和密码
                        uid: uid,
                        pwd: pwd
                    }),
                    type: "post",
                    dataType:"json",
                    success: function (data) {
                        //这里是请求成功后返回的数据
                        console.log(data);

                    },
                    error: function (res) {
                        console.log(res);
                        console.log("请求失败")
                    }
                })
            }
        })
    },
    wrapDom: function () {

    }
}
base.init();