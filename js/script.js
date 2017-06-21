/**
 * Created by px on 2017/3/28.
 */

var fn = require("./common");
require("../less/public.less");
require("../less/style.less");

$(document).ready(function () {
    document.oncontextmenu = function () {
        return false;
    }
    login();
    mainWindow();
})
/**
 *login
 */
function login() {
    let password = $(".password"),
        type = "password",
        eye = $(".eye"),
        btn = $(".btn"),
        login = $(".loginWrap"),
        windowBg = $(".windowWrap");
    password.on({
        input : function () {
            if ($(this).val()){
                eye.css("display", "block");
            }else {
                eye.css("display", "none");
            }
        }
    })
    eye.on({
        click : function (e) {
            type = type === "password" ? "text" : "password";
            password.attr("type", type);
        }
    })
    btn.on({
        click : function (e) {
            if (password.val() === "xx"){
                login.addClass("page-fall");
                windowBg.addClass("page-current")
                setTimeout(function () {
                    login.css("zIndex", -5);
                    windowBg.css("zIndex", 1)
                }, 800)
            }
        }
    })
}
/**
 * window
 */
function mainWindow() {
    let date = $(".date"), content = $(".content"),
        time = $(".time"), idx = 0, temp = null,
        dateFn = new Date(), maxNum = Math.floor(content.height() / 100),
        timeStr = dateFn.toLocaleTimeString().slice(0, -3),
        dateStr = dateFn.toLocaleDateString().replace(/-/g, "/"),
        timeout = null, detailed = $(".detailed"), detClose = $(".det-close");
    $.getJSON("data/file.json", function (data) {
        let curNum = 0, startTime = new Date();
        createUl();
        $(window).on({
            resize : function () {
                let current = new Date();
                if (current - startTime >= 100){
                    curNum = Math.floor(content.height() / 100);
                    if (curNum !== maxNum){
                        content.children().remove();
                        maxNum = curNum;
                        createUl();
                    }
                }
            }
        })
        detClose.on({
            click : function () {
                detailed.removeClass("rotateShow");
                console.log(11)
            }
        })
        function createUl() {
            let unselected = null, ul, liItem;
            $.each(data, function (i, val) {
                temp = i / maxNum;
                idx = Math.ceil(temp);
                if (temp === idx){
                    ul = $("<ul class='flie-icon'>").appendTo(content);
                }
                let li = $(`
                <li  class='flie-icon-item'>
                    <img src="${val.icon}" alt="">
                    <h3>${val.name}</h3>
                </li>
            `).appendTo(ul);
                // let timeout = null;
            })
            liItem = $(".flie-icon-item");
            liItem.on({
                click : function (e) {
                    let self = this,
                        idx = liItem.index(self);
                    clearTimeout(timeout);
                    timeout = setTimeout(function () {
                        $(self).addClass("fakeSelec");
                        removeCla(idx);
                    }, 200)
                },
                dblclick : function (e) {
                    clearTimeout(timeout);
                    removeCla(null);
                    detailed.addClass("rotateShow");
                }
            })
            function removeCla(idx) {
                for (let i = 0, leng = liItem.length; i < leng; i++){
                    unselected = liItem.eq(i);
                    if (i === idx){
                        continue;
                    }
                    if (unselected.hasClass("fakeSelec")){
                        unselected.removeClass("fakeSelec");
                        return;
                    }
                }
            }
        }
    })
    date.text(dateStr);
    time.text(timeStr);
}
















































