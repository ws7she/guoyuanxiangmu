$(function () {
    var chutouStatus = false, guaptStatus = false, zhaiptStatus = false;
    var plantLock = false;

    var game = {
        init: function () {
            this.wrapDom();
            this.initEvent();
        },
        wrapDom: function () {
            var leftData, rightData;
            $.ajax({
                url: "http://121.199.52.79:8080/farm_grape/index.php/farm/farm_msgL",
                data: ({
                    u_Id: "13800000000",
                }),
                type: "post",
                dataType: "json",
                success: function (res) {
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
                    u_Id: "13800000000",
                }),
                type: "post",
                dataType: "json",
                success: function (res) {
                    rightData = res.content[0];
                    console.log(res)
                    document.getElementById('game-plant').innerHTML = template('gamePlant', rightData);
                    if (res.code == "300") {
                        for (var i = res.content.length - 1; i >= 0; i--) {
                            if (res.content[i].f_State == 1) {
                                $(".gy:eq(" + i + ")").attr("class", "gy one");
                                $(".gy:eq(" + i + ")").css("transform", "rotate(0) skew(0)");
                                $(".gy:eq(" + i + ")").html($("<div class='putao'></div>"));
                            } else if (res.content[i].f_State == 2) {
                                $(".gy:eq(" + i + ")").attr("class", "gy four");
                                $(".gy:eq(" + i + ")").css("transform", "rotate(0) skew(0)");
                                $(".gy:eq(" + i + ")").html($("<div class='kuwei'></div>"));
                            } else if (res.content[i].f_State == 0) {

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
            if ($(selector).hasClass("zero")) {
                if (chutouStatus) {
                    $.ajax({
                        url: "http://121.199.52.79:8080/farm_grape/index.php/farm/plant",
                        data: ({
                            u_Id: "13800000000",
                            f_Id: mainValue
                        }),
                        type: "post",
                        dataType: "JSON",
                        success: function (data) {
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
                            f_Id: mainValue
                        }),
                        type: "post",
                        dataType: "JSON",
                        success: function (data) {
                            if (data.code == "200") {
                                $(selector).attr("class", main + " three");
                                $(selector).css("transform", "rotate(0) skew(0)");
                                $(selector).html(dashu);
                            } else if (data.code == "4003") {
                                alert("种植失败")
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
                        url: "http://121.199.52.79:8080/farm_grape/index.php/farm/hang",
                        data: ({
                            f_Id: mainValue
                        }),
                        type: "post",
                        dataType: "JSON",
                        success: function (data) {
                            if (data.code == "200") {
                                $(selector).attr("class", main + " four");
                                $(selector).css("transform", "rotate(0) skew(0)");
                                $(selector).html(kuwei);
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
            if ($(selector).hasClass("four")) {
                if (chutouStatus) {
                    $(selector).attr("class", main + " zero");
                    $(selector).css("transform", "rotate(35deg) skew(-30deg)");
                    $(selector).html("");
                    chutouStatus = false;
                }
            }
        },
        plantEvent: function (selector) {
            game.common($(this), "gy")
        }
    }
    return game.init();
});