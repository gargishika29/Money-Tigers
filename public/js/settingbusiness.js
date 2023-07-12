function doOnLoad()
{
    var active=localStorage.getItem("activeUser");
    // alert(active);
    document.querySelector("#email").value=active;
    document.querySelector("#email").readOnly=true;
}

$(document).ready(function(){
    $("#btnLogout").click(function(){
        localStorage.removeItem("activeUser");
        location.href="index.html";
    });
    
    $('#btnset').click(function(){
        alert("Clicked");
        $("#modalSignin").show();
    });

     
    $(".fa").mouseenter(function()
    {
        $(".eyeeee").prop("type","text");
         $(".fa").removeClass("fa-eye").addClass("fa-eye-slash");
    });

    $(".fa").mouseleave(function()
    {
        $(".eyeeee").attr("type","password");
         $(".fa").removeClass("fa-eye-slash").addClass("fa-eye");
    });
   
    // Setting email
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

    // Setting old pswd
    $("#oldpswd").blur(function () {
        var pass = $("#oldpswd").val();
        var r = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        if (r.test(pass) == true) {
            $(this).css("border", "2px solid green");
        }
        else {
            $(this).css("border", "2px solid red");
        }
    });

    // Setting new pswd
    $("#newpswd").blur(function () {
        var pass = $("#newpswd").val();
        var r = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        if (r.test(pass) == true) {
            $(this).css("border", "2px solid green");
        }
        else {
            $(this).css("border", "2px solid red");
        }
    });

    
      //Update password
      $("#changepswd").click(function(){
        var email = $("#email").val();
        var oldPswd=$("#oldpswd").val();
        var newPswd=$("#newpswd").val();

        var obj={
                    type:"post",
                    url:"/db-change-pitcher",
                    data:{
                        emaill:email,
                        oldpswdd:oldPswd,
                        newpswdd:newPswd,
                    }
                }
                $.ajax(obj).done(function(msg){
                $("#result1").html(msg);
                // alert(msg);
               }).fail(function(msgerr){
                $("#result1").html(msgerr);
                // alert(err.toString());
               });
      });     

});