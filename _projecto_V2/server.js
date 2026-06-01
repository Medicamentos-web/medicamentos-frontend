const express = require("express"), session = require("express-session"), admin = require("./controllers/adminController"), app = express();
app.use(express.json()); app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "titan_v24", resave: false, saveUninitialized: true }));
const auth = (req, res, next) => req.session.isAdmin ? next() : res.redirect("/admin/login");

app.get("/admin/login", admin.showLogin);               // 1
app.post("/admin/login", admin.processLogin);           // 2
app.get("/admin/dashboard", auth, admin.getDashboard);  // 3
app.get("/admin/user-new", auth, admin.userNew);        // 4
app.post("/admin/user-create", auth, admin.userCreate); // 5
app.get("/admin/user-edit/:id", auth, admin.userEdit);  // 6
app.post("/admin/user-save", auth, admin.userUpdate);   // 7
app.get("/admin/meds/:id", auth, admin.getMeds);        // 8
app.post("/admin/meds-add/:id", auth, admin.addMed);    // 9
app.get("/admin/meds-del/:mid/:uid", auth, admin.delMed); // 10
app.get("/admin/full-backup", auth, admin.runFullBackup); // 11
app.get("/admin/logout", admin.logout);                 // 12

app.listen(5000, '0.0.0.0', () => console.log(" PLATINUM V24 ONLINE"));
