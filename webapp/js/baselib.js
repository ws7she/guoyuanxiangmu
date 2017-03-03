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
                    url: "http://192.168.88.117/farm_grape/index.php/login/login_in",
                    data: ({
                        u_Id: uid,
                        u_PassWord: pwd
                    }),
                    type: "post",
                    dataType: "JSON",
                    success: function (data) {
                        //这里是请求成功后返回的数据
                        console.log(data);
                        alert("请求成功");

                    },
                    error: function (res) {
                        console.log(res);
                        console.log("请求失败");

                    }
                })
            }
        })
    },
    wrapDom: function () {

    }
}
base.init();