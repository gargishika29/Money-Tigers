

$(document).ready(function () {

    // eye validation
    $(".fa").mouseenter(function () {
        $(".eyeeee").prop("type", "text");
        $(".fa").removeClass("fa-eye").addClass("fa-eye-slash");
    });

    $(".fa").mouseleave(function () {
        $(".eyeeee").attr("type", "password");
        $(".fa").removeClass("fa-eye-slash").addClass("fa-eye");
    });

    // signup validationds
    // Signup email
    $("#emaill").blur(function () {
        var email = $("#emaill").val();
        var exp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        if (exp.test(email) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        } else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });
    // Signup pswd
    $("#eyee").blur(function () {
        var pass = $("#eyee").val();
        var r = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        if (r.test(pass) == true) {
            $(this).css("border", "2px solid green");
        }
        else {
            $(this).css("border", "2px solid red");
        }
    });
    // signup mob
    $(".mob").blur(function () {
        var mob = $(".mob").val();
        var r = /^[6-9]{1}[0-9]{9}$/;
        if (r.test(mob) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        }
        else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });
    // signup user
    $("#sel").blur(function () {
        var sel = $("#sel").val();

        if (sel == 'Select') {
            $(this).css("border", "2px solid red");
        } else {
            $(this).css("border", "2px solid green");
        }
    });

    // login validations
    // login email
    $("#email").blur(function () {
        var email = $("#email").val();
        var exp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        if (exp.test(email) == true) {
            $(this).css("border", "2px solid green");
            $(this).removeClass("is-invalid");
        } else {
            $(this).css("border", "2px solid red");
            $(this).addClass("is-invalid");
        }
    });

    // login password
    $("#eyeeee").blur(function () {
        var pass = $("#eyeeee").val();
        var r = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        if (r.test(pass) == true) {
            $(this).css("border", "2px solid green");
        }
        else {
            $(this).css("border", "2px solid red");
        }
    });



    //Login button ajax
    $("#btnLogin").click(function () {
        var email = $("#email").val();
        var pswd = $("#eyeeee").val();

        var obj = {
            type: "post",
            url: "/db-Login",
            data: {
                emaill: email,
                pswdd: pswd,
            }
        }
        $.ajax(obj).done(function (msg) {
            // $("#result1").html(msg);
            // alert(msg);
            localStorage.setItem("activeUser", email); //************

            if (msg.trim() == "Investor") {
                window.location.href = "dash-investor.html"
            } else if (msg.trim() == "Business") {
                window.location.href = "dash-business.html"
            }
            else {
                $("#result1").html(msg);
            }
        }).fail(function (msgerr) {
            $("#result1").html(msgerr);
        });
    });


    //signup button ajax
    $("#btnSignup").click(function () {
        var email = $("#emaill").val();
        var pswd = $("#eyee").val();
        var mob = $("#mob").val();
        var Type = "";
        if ($("#Investor").prop("selected") == true) {
            Type = "Investor";
        }
        else if ($("#Business").prop("selected") == true) {
            Type = "Business";
        }

        var obj = {
            type: "post",
            url: "/db-Signup",
            data: {
                emaill: email,
                pswdd: pswd,
                mobb: mob,
                type: Type,
            }
        }
        $.ajax(obj).done(function (msg) {
            localStorage.setItem("activeUser", email); //************
            $("#result2").html(msg);
        }).fail(function (msgerr) {
            $("#result2").html(msgerr);
        });
    });
});

// email valid or not
$("#emaill").blur(function () {
    var myEmail = $("#emaill").val();
    var obj = {
        type: "get",
        url: "/ajax-chk-user",
        data: {
            emaill: myEmail,
        }
    }
    $.ajax(obj).done(function (myResponse) {
        // alert("hello");
        $("#result").html(myResponse);

    }).fail(function (err) {
        alert(err.toString());
    });

});
