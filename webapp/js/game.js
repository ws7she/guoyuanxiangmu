$(function () {
    var chutouStatus = false, guaptStatus = false, zhaiptStatus = false;

    var game = {
        init: function () {
            this.initEvent();
        },
        initEvent: function () {
            $(".chutou").on("click", this.chutou);
            $(".guaputao").on("click", this.guapt);
            $(".zhaiputao").on("click", this.zhaipt);
            $(".ld1").on("click", this.ld1);
            $(".ld2").on("click", this.ld2);
            $(".ld3").on("click", this.ld3);
            $(".ld4").on("click", this.ld4);
            $(".ld5").on("click", this.ld5);
            $(".hj1").on("click", this.hj1);
            $(".hj2").on("click", this.hj2);
            $(".hj3").on("click", this.hj3);
            $(".hj4").on("click", this.hj4);
            $(".hj5").on("click", this.hj5);
            $(".td1").on("click", this.td1);
            $(".td2").on("click", this.td2);
            $(".td3").on("click", this.td3);
            $(".td4").on("click", this.td4);
            $(".td5").on("click", this.td5);
        },
        chutou: function () {
            chutouStatus = true;
        },
        guapt: function () {
            guaptStatus = true;
        },
        zhaipt: function () {
            zhaiptStatus = true;
        },
        common: function (selector, main, land_id) {
            var xiaoshu = $("<div class='putao'></div>"),
                zhongshu = $("<div class='putao_2'></div>"),
                dashu = $("<div class='putao_3'></div>"),
                kuwei = $("<div class='kuwei'></div>");
            if ($(selector).hasClass("zero")) {
                var land_state = false;
                var land_time = new Date().getTime();
                if (chutouStatus) {
                    $(selector).attr('class', main + " one");
                    $(selector).css("transform", "rotate(0) skew(0)");
                    $(selector).html(xiaoshu);
                    chutouStatus = false;
                    // $.ajax({
                    //     url: "http://121.199.52.79:8080/index.php/farm/plant",
                    //     data: ({
                    //         u_Id: "13800000000",
                    //         land_id: 1,
                    //         land_state: "0",
                    //         land_time: land_time
                    //     }),
                    //     type: "post",
                    //     dataType: "JSON",
                    //     success: function (data) {
                    //         console.log(data);
                            
                    //         chutouStatus = false;
                    //     },
                    //     error: function (res) {
                    //         console.log(res);
                    //         alert("接口请求失败，请重试")
                    //     }
                    // })

                }
            }
            // if ($(selector).hasClass("one")) {
            //     if (guaptStatus) {
            //         $(selector).attr("class", main + " two");
            //         $(selector).css("transform", "rotate(0) skew(0)");
            //         $(selector).html(zhongshu);
            //         guaptStatus = false;
            //     }
            // }
            if ($(selector).hasClass("one")) {
                if (guaptStatus) {
                    $(selector).attr("class", main + " three");
                    $(selector).css("transform", "rotate(0) skew(0)");
                    $(selector).html(dashu);
                    guaptStatus = false;
                }
                if (zhaiptStatus) {
                    // $(selector).attr("class", main + " four");
                    // $(selector).css("transform", "rotate(0) skew(0)");
                    // $(selector).html(kuwei);
                    alert("不能摘！")
                    zhaiptStatus = false;
                }
            }
            if ($(selector).hasClass("three")) {
                if (guaptStatus) {
                    // $(selector).attr("class", main + " three");
                    // $(selector).css("transform", "rotate(0) skew(0)");
                    // $(selector).html(dashu);
                    alert("不能挂！")
                    guaptStatus = false;
                }
                if (zhaiptStatus) {
                    $(selector).attr("class", main + " four");
                    $(selector).css("transform", "rotate(0) skew(0)");
                    $(selector).html(kuwei);
                    zhaiptStatus = false;
                }
            }
            if ($(selector).hasClass("four")) {
                if (chutouStatus) {
                    $(selector).attr("class", main + " zero");
                    $(selector).css("transform", "rotate(35deg) skew(-30deg)");
                    $(selector).html("");
                    chutouStatus = false;
                }
            }
        },
        ld1: function () {
            game.common(".ld1", "ld1", "ld1")
        },
        ld2: function () {
            game.common(".ld2", "ld2")
        },
        ld3: function () {
            game.common(".ld3", "ld3")
        },
        ld4: function () {
            game.common(".ld4", "ld4")
        },
        ld5: function () {
            game.common(".ld5", "ld5")
        },
        hj1: function () {
            game.common(".hj1", "hj1")
        },
        hj2: function () {
            game.common(".hj2", "hj2")
        },
        hj3: function () {
            game.common(".hj3", "hj3")
        },
        hj4: function () {
            game.common(".hj4", "hj4")
        },
        hj5: function () {
            game.common(".hj5", "hj5")
        },
        td1: function () {
            game.common(".td1", "td1")
        },
        td2: function () {
            game.common(".td2", "td2")
        },
        td3: function () {
            game.common(".td3", "td3")
        },
        td4: function () {
            game.common(".td4", "td4")
        },
        td5: function () {
            game.common(".td5", "td5")
        },
    }
    return game.init();
});