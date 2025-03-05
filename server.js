const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const methodOverride = require("method-override");
const flash = require("express-flash");
const session = require("express-session");
const upload = require("./middlewares/upload-file");
require("dotenv").config();

const { 
  renderHome,
  renderLogin,
  renderRegister,
  authLogin,
  authRegister,
  authLogout,
  renderAddHero,
  postHero,
  renderHeroes,
  renderHeroEdit,
  updateHero,
  deleteHero,
  renderHeroDetail,
  renderAddType,
  postType
} = require("./controllers/heroController");


const port = process.env.SERVER_PORT || 4000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use(methodOverride("_method"));
app.use(flash());

app.use(session({
  name: "hero-session",
  secret: "dragon-blood-secret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});


// AUTHENTICATION 
app.get("/login", renderLogin);
app.post("/login", authLogin);
app.get("/register", renderRegister);
app.post("/register", authRegister);
app.get("/logout", authLogout);

// HOME 
app.get("/", renderHome);

// HERO 
app.get("/heroes", renderHeroes);
app.get("/addHero", renderAddHero);
app.post("/add-hero", upload.single('heroImage'), postHero);
app.get("/hero-edit/:id", renderHeroEdit);
app.patch("/hero-update/:id", upload.single('heroImage'), updateHero);
app.delete("/hero/:id", deleteHero);
app.get("/hero/:id", renderHeroDetail);

// TYPE 
app.get("/addType", renderAddType);
app.post("/addType", postType);

// 404 ROUTE
app.use((req, res) => {
  res.status(404).render('404-page');
});

// Server Start
app.listen(port, () => {
  console.log(`Blood of The Dragons app listening on port ${port}`);
});