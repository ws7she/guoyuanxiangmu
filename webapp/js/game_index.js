$(function () {
    var chutouStatus = false,
        guaptStatus = false,
        zhaiptStatus = false;
    var uid;
    var game = {
        init: function () {
            // uid = $.getUrlParam("uid");
            uid = "13800000000";
            if (uid != null) {
                this.wrapDom();
                this.initEvent();
            } else {
                window.location = "index.html"
            }
            $(".gylink").on("click", function () {
                window.location.href = "guoyuan.html?uid=" + uid + "";
            });
            $(".hylink").on("click", function () {
                window.location.href = "friend.html?uid=" + uid + "";
            });
            $(".jylink").on("click", function () {
                window.location.href = "business.html?uid=" + uid + "";
            });
            $(".jflink").on("click", function () {
                window.location.href = "shopping.html?uid=" + uid + "";
            });
            $(".yxlink").on("click", function () {
                window.location.href = "game.html?uid=" + uid + "";
            });
            $(".grlink").on("click", function () {
                window.location.href = "personal.html?uid=" + uid + "";
            });
            $(".lxlink").on("click", function () {
                window.location.href = "friend.html?uid=" + uid + "";
            })
        },
        wrapDom: function () {
            var leftData, rightData;

            $.ajax({
                url: "http://121.199.52.79:8080/farm_grape/index.php/farm/farm_msgL",
                data: ({
                    u_Id: uid,
                }),
                type: "post",
                dataType: "json",
                success: function (res) {
                    console.log(res.content[0])
                    leftData = res.content[0];
                    document.getElementById('user-info').innerHTML = template('gameUser', leftData);
                    document.getElementById('game-money').innerHTML = template('gameMoney', leftData);
                },
                error: function (res) {
                    alert("接口问题")
                }
            })
            $.ajax({
                url: "http://121.199.52.79:8080/farm_grape/index.php/farm/farm_msgR",
                data: ({
                    u_Id: uid,
                }),
                type: "post",
                dataType: "json",
                success: function (res) {
                    rightData = res.content[0];
                    console.log(res)
                    document.getElementById('game-plant').innerHTML = template('gamePlant', rightData);
                    if (res.code == "300") {
                        for (var i = res.content.length - 1; i >= 0; i--) {
                            $(".gy:eq(" + i + ")").attr("data-grape", res.content[i].f_grape)
                            $(".gy:eq(" + i + ")").attr("data-index", res.content[i].f_Id);
                            $(".gy:eq(" + i + ")").attr("data-status", res.content[14 - i].f_Val);
                            if (res.content[i].f_State == 1) {
                                $(".gy:eq(" + i + ")").attr("class", "gy one");
                                $(".gy:eq(" + i + ")").css("transform", "rotate(0) skew(0)");
                                $(".gy:eq(" + i + ")").html($("<div class='putao'></div>"));
                            } else if (res.content[i].f_State == 3) {
                                $(".gy:eq(" + i + ")").attr("class", "gy four");
                                $(".gy:eq(" + i + ")").css("transform", "rotate(0) skew(0)");
                                $(".gy:eq(" + i + ")").html($("<div class='kuwei'></div>"));
                            } else if (res.content[i].f_State == 2) {
                                $(".gy:eq(" + i + ")").attr("class", "gy three");
                                $(".gy:eq(" + i + ")").css("transform", "rotate(0) skew(0)");
                                $(".gy:eq(" + i + ")").html($("<div class='putao_3'></div>"));
                            } else if (res.content[i].f_State == 0) {
                                $(".gy:eq(" + i + ")").attr("class", "gy zero");
                            }
                        }
                    }
                },
                error: function (res) {
                    console.log(res)
                }
            })
        },
        initEvent: function () {
            $(".chutou").on("click", this.chutou);
            $(".guaputao").on("click", this.guapt);
            $(".zhaiputao").on("click", this.zhaipt);
            $(".gy").on("click", this.plantEvent);
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
        common: function (selector, main) {
            var xiaoshu = $("<div class='putao'></div>"),
                zhongshu = $("<div class='putao_2'></div>"),
                dashu = $("<div class='putao_3'></div>"),
                kuwei = $("<div class='kuwei'></div>"),
                mainValue = $(selector).data("index");
            pickFruit = $(selector).data("grape");
            var hangFruit;
            if ($(selector).data("status") == "1") {
                hangFruit = "5000"
                // pickFruit = "1000" 
            } else if ($(selector).data("status") == "2") {
                hangFruit = "10000"
                //  pickFruit = "2000" 
            } else if ($(selector).data("status") == "3") {
                hangFruit = "20000"
                //  pickFruit = "3000" 
            }
            if ($(selector).hasClass("zero")) {
                if (chutouStatus) {
                    $.ajax({
                        url: "http://121.199.52.79:8080/farm_grape/index.php/farm/plant",
                        data: ({
                            u_Id: uid,
                            f_Id: mainValue
                        }),
                        type: "post",
                        dataType: "JSON",
                        success: function (data) {
                            console.log(data)
                            if (data.code == "200") {
                                $(selector).attr('class', main + " one");
                                $(selector).css("transform", "rotate(0) skew(0)");
                                $(selector).html(xiaoshu);

                            } else if (data.code == "4003") {
                                alert("种植失败")
                            } else if (data.code == "4004") {
                                alert("已经种植")
                            } else if (data.code == "4005") {
                                alert("已经枯萎")
                            } else if (data.code == "4008") {
                                alert("土地和用户id不符合")
                            }
                        },
                        error: function (res) {
                            console.log(res);
                            alert("接口请求失败，请重试")
                        }
                    })
                    chutouStatus = false;
                }
                if (guaptStatus) {
                    alert("还没种植，不能挂")
                    guaptStatus = false;
                }
                if (zhaiptStatus) {
                    alert("还没种植，不能摘！")
                    zhaiptStatus = false;
                }
            }
            if ($(selector).hasClass("one")) {
                if (guaptStatus) {
                    $.ajax({
                        url: "http://121.199.52.79:8080/farm_grape/index.php/farm/hang",
                        data: ({
                            u_Id: uid,
                            f_Id: mainValue,
                            hang: hangFruit
                        }),
                        type: "post",
                        dataType: "JSON",
                        success: function (data) {
                            console.log(data)
                            if (data.code == "200") {
                                $(selector).attr("class", main + " three");
                                $(selector).css("transform", "rotate(0) skew(0)");
                                $(selector).html(dashu);
                            } else if (data.code == "4003") {
                                alert(data.Msg)
                            } else if (data.code == "4005") {
                                alert("已经枯萎")
                            }

                        },
                        error: function (res) {
                            console.log(res);
                            alert("接口请求失败，请重试")
                        }
                    })
                    guaptStatus = false;
                }
                if (zhaiptStatus) {
                    alert("还没挂，不能摘！")
                    zhaiptStatus = false;
                }
                if (chutouStatus) {
                    alert("还没摘，不能种！")
                    chutouStatus = false;
                }
            }
            if ($(selector).hasClass("three")) {
                if (chutouStatus) {
                    alert("已经成熟了，不能种！")
                    chutouStatus = false;
                }
                if (guaptStatus) {
                    alert("已经成熟了，不能挂！")
                    guaptStatus = false;
                }
                if (zhaiptStatus) {
                    $.ajax({
                        url: "http://121.199.52.79:8080/farm_grape/index.php/farm/pick",
                        data: ({
                            u_Id: uid,
                            f_Id: mainValue,
                            pick: pickFruit
                        }),
                        type: "post",
                        dataType: "JSON",
                        success: function (data) {
                            console.log(data)
                            if (data.code == "200") {
                                // $(selector).attr("class", main + " four");
                                $(selector).attr("class", main + " one");
                                $(selector).css("transform", "rotate(0) skew(0)");
                                $(selector).html(xiaoshu);
                            } else if (data.code == "4007") {
                                alert("超出范围")
                            } else if (data.code == "4006") {
                                alert("未种植")
                            } else if (data.code == "4005") {
                                alert("已经枯萎")
                            }
                            zhaiptStatus = false;
                        },
                        error: function (res) {
                            console.log(res);
                            alert("接口请求失败，请重试")
                        }
                    })

                }
            }
            // if ($(selector).hasClass("four")) {
            //     if (chutouStatus) {
            //         $(selector).attr("class", main + " zero");
            //         $(selector).css("transform", "rotate(35deg) skew(-30deg)");
            //         $(selector).html("");
            //         chutouStatus = false;
            //     }
            // }
        },
        plantEvent: function (selector) {
            game.common($(this), "gy")
        }
    }
    return game.init();
});