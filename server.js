var express = require("express");
var path = require("path");
var mysql = require("mysql");
const nodemailer = require('nodemailer');
var fileuploader = require("express-fileupload");

var app = express();
app.listen(2023, function () {
    console.log("server started.....");
});
// connectivity
var dbConfig = {
    host: "localhost", //127.0.0.1
    user: "root",
    password: "",
    database: "project",
    dateStrings: true
}
var dbRef = mysql.createConnection(dbConfig);

dbRef.connect(function (err) {
    if (err == null) {
        console.log("Connected Successfully......");
    }
    else {
        console.log(err);
    }
});
app.use(express.static("public"));
app.get("/", function (req, resp) {
    var dir = process.cwd();
    console.log(dir);

    var dir2 = __dirname;
    var file = __filename;
    console.log(dir2 + "" + file);

    var pathFile = path.join(__dirname, "public", "index.html");
    resp.sendFile(pathFile);
});

app.use(express.urlencoded(true));


// login  button
app.post("/db-Login", function (req, resp) {
    var Email = req.body.emaill;
    var pass = req.body.pswdd;

    dbRef.query("Select * from signup where email=? and password = ?", [Email, pass], function (err, jsonAryResult) {
        if (err) {
            resp.send(err.toString());
        }
        else if (jsonAryResult.length == 0) {
            resp.send("Invalid Id Or Password! Please Try Valid Id Or Password!!");
        }
        else {
            if (jsonAryResult[0].status == 0)
                resp.send("User is blocked");
            else
                // resp.send("Login Successfully....")
                resp.send(jsonAryResult[0].usertype)
        }
    });
});

// Signup button
app.post("/db-Signup", function (req, resp) {
    var Email = req.body.emaill;
    var pass = req.body.pswdd;
    var mob = req.body.mobb;
    var sel = req.body.type;
    var mailer = req.body.emaill;

    dbRef.query("Insert into signup(email,password,mobile,usertype,dos,status) values(?,?,?,?,current_date,1)", [Email, pass, mob, sel], function (err, jsonAryResult) {
        if (err) {
            console.log(err.toString());
            resp.send(err.toString());
        }else if (jsonAryResult.length == 0) {
            resp.send("Invalid Id Or Password! Please Try Valid Id Or Password!!");
        }else{
            resp.send("Signed Up Successfully.....");
            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ishikadhuri@gmail.com',
                    pass: 'lxonnknpasrckpzb'
                }
            });
            let mailDetails = {
                from: 'ishikadhuri@gmail.com',
                to: mailer,
                subject: 'Welcome to Money Tigers',
                html: '<center><img src="https://www.pushengage.com/wp-content/uploads/2022/02/Best-Website-Welcome-Message-Examples.png" height="250px" width="500px"><h1>Welcome to Money Tigers!!</h1></center><center style="line-height:30px;"><br> We are so happy to have you on our site.<br> With Money Tigers you can find best <br> Investors and Entrepreneurs for your business.<br>Dont hesitate to get in touch if you have any <br>questions; we will always get back to you :)</center>'
            };
            mailTransporter.sendMail(mailDetails, function(err, info) {
                if(err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully' + info.resp);
                }
            });
        }
    });
});


// User available or not
app.get("/ajax-chk-user", function (req, resp) {
    var emailll = req.query.emaill;

    dbRef.query("select * from signup where email=?", [emailll], function (err, jsonAryResult) {
        if (err != null) {
            resp.send(err.toString());
        }
        else if (jsonAryResult.length == 1) {
            resp.send("Email Not Available! Try Another One!!");
        }
        else {
            resp.send("Email Available!!");
        }
    });
});
app.use(fileuploader());

// submit pitcher
app.post("/submitpitcher", function (req, resp) {
    var email = req.body.txtEmail;
    var name = req.body.txtName;
    var mob = req.body.txtMob;
    var add = req.body.txtAdd;
    var city = req.body.txtCity;
    var state = req.body.txtState;
    var zip = req.body.txtZip;
    var id = req.body.txtId;
    var img = req.files.txtPic.name;
    var desPath = path.join(__dirname, "public/uploads", img);

    req.files.txtPic.mv(desPath, function () {
        console.log("file uploaded");
    });

    var category = req.body.txtCategory;
    var company = req.body.txtCompany;
    var estd = req.body.txtEstd;
    var product = req.body.txtArea;
    var rev = req.body.txtRev;
    var margin = req.body.txtMargin;
    var other = req.body.txtOther;

    dbRef.query("Insert into pprofile values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [email, name, mob, add, city, state, zip, id, img, category, company, estd, product, rev, margin, other], function (err) {
        if (err == null) {
            console.log("Submited Successfully..........................");
            resp.send("Submited Successfully..........................");
        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    });
});

// picher update button
app.post("/updatePitcher", function (req, resp) {
    console.log(req.body);
    var email = req.body.txtEmail;
    var name = req.body.txtName;
    var mob = req.body.txtMob;
    var add = req.body.txtAdd;
    var city = req.body.txtCity;
    var zip = req.body.txtZip;
    var state = req.body.txtState;
    var id = req.body.txtId;
    var category = req.body.txtCategory;

    var img;
    if (req.files != null) {
        img = req.files.txtPic.name; //want to change pic
        var desPath = path.join(__dirname, "public/uploads", img);
        req.files.txtPic.mv(desPath, function () {
            console.log("file saved");
        });
    }
    else {
        img = req.body.hdn; //keep old image file
    }
    var company = req.body.txtCompany;
    var estd = req.body.txtEstd;
    var product = req.body.txtArea;
    var rev = req.body.txtRev;
    var margin = req.body.txtMargin;
    var other = req.body.txtOther;
    dbRef.query("update pprofile set name=?,contact=?,address=?,city=?,state=?,zip=?,id=?,ppic=?,category=?,company=?,estd=?,product=?,revenue=?,gross=?,other=? where email=?", [name, mob, add, city, state, zip, id, img, category, company, estd, product, rev, margin, other, email], function (err, result) {

        if (err != null) {
            resp.send(err.toString());
        }
        else if (result.affectedRows == 1) {
            console.log("record updated");
            resp.send("Update successfully");
        }
        else if (result.affectedRows == 0) {
            resp.send("Invalid Id");
        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    });
});

// pitcher search button
app.get("/json-pitcher-search", function (req, resp) {
    var emailll = req.query.emaill;
    console.log(emailll);
    dbRef.query("select * from pprofile where email=?", [emailll], function (err, jsonAryResult) {
        console.log(jsonAryResult);
        if (err != null) {
            resp.send(err.toString());
        }
        else {
            resp.json(jsonAryResult);
        }
    });
});


// submit Shark 
app.post("/submitshark", function (req, resp) {
    var email = req.body.txtEmail;
    var name = req.body.txtName;
    var lname = req.body.txtLname;
    var dob = req.body.txtDate;
    var add = req.body.txtAdd;
    var mob = req.body.txtMob;
    var city = req.body.txtCity;
    var state = req.body.txtState;
    var zip = req.body.txtZip;
    var img = req.files.txtPic.name;
    var desPath = path.join(__dirname, "public/uploads", img);

    req.files.txtPic.mv(desPath, function () {
        console.log("file uploaded");
    });
    var company = req.body.txtCompany;
    var profession = req.body.txtPro;
    var estd = req.body.txtEstd;
    var Noofinv = req.body.txtInv;
    var Incomp = req.body.txtComp;
    var domain = req.body.txtField;
    var selfield = req.body.txtSel;
    var other = req.body.txtOther;

    dbRef.query("Insert into profileshark values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [email, name, lname, dob, add, mob, city, state, zip, img, company, profession, estd, Noofinv, Incomp, domain, selfield, other], function (err) {
        if (err == null) {
            console.log("Submited Successfully..........................");
            resp.send("Submited Successfully..........................");
        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    });
});

// shark update button
app.post("/updateshark", function (req, resp) {
    var email = req.body.txtEmail;
    var name = req.body.txtName;
    var lname = req.body.txtLname;
    var dob = req.body.txtDate;
    var add = req.body.txtAdd;
    var mob = req.body.txtMob;
    var city = req.body.txtCity;
    var state = req.body.txtState;
    var zip = req.body.txtZip;

    var img;
    if (req.files != null) {
        img = req.files.txtPic.name; //want to change pic
        var desPath = path.join(__dirname, "public/uploads", img);
        req.files.txtPic.mv(desPath, function () {
            console.log("file saved");
        });
    }
    else {
        img = req.body.hdn; //keep old image file
    }
    var company = req.body.txtCompany;
    var profession = req.body.txtPro;
    var estd = req.body.txtEstd;
    var Noofinv = req.body.txtInv;
    var Incomp = req.body.txtComp;
    var domain = req.body.txtField;
    var selfield = req.body.txtSel;
    var other = req.body.txtOther;

    dbRef.query("update profileshark set name=?,lname=?,dob=?,address=?,contact=?,city=?,state=?,zip=?,ppic=?,company=?,profession=?,estd=?,noofinv=?,incomp=?,domain=?,selfeild=?,other=? where email=?", [name, lname, dob, add, mob, city, state, zip, img, company, profession, estd, Noofinv, Incomp, domain, selfield, other,email], function (err, result) {

        if (err != null) {
            resp.send(err.toString());
        }
        else if (result.affectedRows == 1) {
            console.log("record updated");
            resp.send("Update successfully");
        }
        else if (result.affectedRows == 0) {
            resp.send("Invalid Id");
        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    });
});

// Investor Search button
app.get("/json-investor-search", function (req, resp) {
    var emailll = req.query.emaill;
    console.log(emailll);
    dbRef.query("select * from profileshark where email=?", [emailll], function (err, jsonAryResult) {
        console.log(jsonAryResult);
        if (err != null) {
            resp.send(err.toString());
        }
        else {
            resp.json(jsonAryResult);
        }
    });
});


app.post("/db-change-shark", function (req, resp) {
    var Email = req.body.emaill;
    var oldp = req.body.oldpswdd;
    var newp = req.body.newpswdd;

    dbRef.query("update signup set password=? where email=? and password = ? and usertype = 'Investor' and status = 1 ", [newp, Email, oldp], function (err, result) {
        if (err != null) {
            resp.send(err.toString());
        }
        else if (result.affectedRows == 1) {
            console.log("record updated");
            resp.send("Update successfully");
        }
        else if (result.affectedRows == 0) {
            resp.send("Invalid Id Or Password! Please Try Valid Id Or Password!!");
        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    });
});

app.post("/db-change-pitcher", function (req, resp) {
    var Email = req.body.emaill;
    var oldp = req.body.oldpswdd;
    var newp = req.body.newpswdd;

    dbRef.query("update signup set password=? where email=? and password = ? and usertype = 'Business' and status = 1", [newp, Email, oldp], function (err, result) {
        if (err != null) {
            resp.send(err.toString());
        }
        else if (result.affectedRows == 1) {
            console.log("record updated");
            resp.send("Update successfully");
        }
        else if (result.affectedRows == 0) {
            resp.send("Invalid Id Or Password! Please Try Valid Id Or Password!!");
        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    });
});

// Angular Start---------------------------------------------------------------------

// Admin all Users

app.get("/angular-get-all-users", function (req, resp) {
    dbRef.query("select * from signup", function (err, jsonAryResult) {
        if (err != null)
            resp.send(err.toString());
        else
            resp.json(jsonAryResult);
    })
})

app.get("/angular-block-user", function (req, resp) {
    var email = req.query.x;
    dbRef.query("update signup set status=0 where email=?", [email], function (err, result) {
        if (err != null)
            resp.send(err.toString());
        else if (result.affectedRows == 1)
            resp.send("Blocked Successfullyyy");
        else
            resp.send("Invalid ID");
    })
})

app.get("/angular-unblock-user", function (req, resp) {
    var email = req.query.x;
    dbRef.query("update signup set status=1 where email=?", [email], function (err, result) {
        if (err != null)
            resp.send(err.toString());
        else if (result.affectedRows == 1)
            resp.send("Unblock Successfullyyy");
        else
            resp.send("Invalid ID");
    })
})

// Admin all Sharks
app.get("/angular-get-all-sharks", function (req, resp) {
    dbRef.query("select * from profileshark", function (err, jsonAryResult) {
        if (err != null)
            resp.send(err.toString());
        else
            resp.json(jsonAryResult);
    })
})

// Admin all Pitcher
app.get("/angular-get-all-pitcher", function (req, resp) {
    dbRef.query("select * from pprofile", function (err, jsonAryResult) {
        if (err != null)
            resp.send(err.toString());
        else
            resp.json(jsonAryResult);
    })
})


// find Investor
app.get("/angular-find-all-sharks", function (req, resp) {

    console.log(req.query);
    var data = [ "%" + req.query.domain + " %",req.query.city,req.query.no];
    dbRef.query("select * from profileshark where selfeild like ? and city =? and noofinv>=? ",data , function (err, jsonAryResult) {
       
       console.log(jsonAryResult);

        if (err != null)
            resp.send(err.toString());
        else
            resp.json(jsonAryResult);
    })
})

// fetch domain in comobox from db
app.get("/fetch-domain", function (req, resp) {
    dbRef.query("select distinct domain from profileshark", function (err, jsonAryResult) {
        if (err == null) {
            resp.json(jsonAryResult);
        }
        else
            resp.send(err.toString());
    })
})

// fetch city in combobox from db
app.get("/fetch-city", function (req, resp) {
    dbRef.query("select distinct city from profileshark", function (err, jsonAryResult) {
        if (err == null) {
            resp.json(jsonAryResult);
        }
        else
            resp.send(err.toString());
    })
})

// find Pitchers
app.get("/angular-find-all-pitchers", function (req, resp) {

    console.log(req.query);
    var data = [req.query.category ,req.query.revenue,req.query.gross];
    dbRef.query("select * from pprofile where category=? and revenue>=? and gross>=? ",data, function (err, jsonAryResult) {
        console.log(jsonAryResult);
        if (err != null)
            resp.send(err.toString());
        else
            resp.json(jsonAryResult);
    });
});

// fetch category in combobox from db
app.get("/fetch-category", function (req, resp) {
    dbRef.query("select distinct category from pprofile", function (err, jsonAryResult) {
        if (err == null) {
            resp.json(jsonAryResult);
        }
        else
            resp.send(err.toString());
    })
})

