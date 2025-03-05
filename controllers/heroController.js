const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const config = require("../config/config.js");
const { hero, user, type } = require("../models");
require("dotenv").config();

const sequelize = new Sequelize(config.development);

const saltRounds = 10;

async function renderHome(req, res) {
  const User = req.session.user;
  // console.log("usernya adalah :", User);
  res.render("index", { user: User });
}

async function renderLogin(req, res) {
  const User = req.session.user;
  console.log("usernya adalah :", User);

  if (User) {
    req.flash("warning", "User already login.");
    res.redirect("/");
  } else {
    res.render("auth-login", { user: User });
  }
}

async function renderRegister(req, res) {
  const User = req.session.user;
  console.log("usernya adalah :", User);

  if (User) {
    res.redirect("/");
  } else {
    res.render("auth-register", { user: User }); 
  }
}

async function authLogin(req, res) {
  const { email, password } = req.body;
  // check kalau usernya ada atau tidak
  const foundUser = await user.findOne({
    where: {
      email: email,
    },
  });
  
  if (!foundUser) {
    req.flash("error", "User tidak ditemukan.");
    return res.redirect("/login");
  }
  
  // check kalau passwordnya salah
  const isValidated = await bcrypt.compare(password, foundUser.password); // return sebuah boolean, apakah true atau false
  
  if (!isValidated) {
    req.flash("error", "Password mismatch.");
    return res.redirect("/login");
  }
  
  let loggedInUser = foundUser.toJSON(); // convert dari object sequelize ke object biasa ===> object
  
  delete loggedInUser.password; // menghapus properti password pada object new user
  
  console.log("user setelah passwordnya di delete :", loggedInUser);
  req.session.user = loggedInUser;
  
  req.flash("success", `Selamat datang, ${loggedInUser.username || loggedInUser.name}!`);
  res.redirect("/");
}

async function authRegister( req, res) {
    const { username, email, password, confirmPassword } = req. body;  //object desctructuring

    if(password != confirmPassword) {
       return res.render("auth-register", {
            error: "password and confirm password mismatch"})
    }

    const user = await User.findOne ({
        where: {
            email: email,
        },
    });

    if (user) {
        req.flash("error", "Email sudah terdaftar. Silahkan coba lagi.");
        return res.redirect("/register");
    }    
    // console.log(req.body);

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser =  {
        name: name,
        email: email,
        password: hashedPassword,
    };

    console.log("user baru:", newUser);

    const userInsert = await User.create(newUser);

    req.flash("success", "Berhasil mendaftar. Silahkan Login.");
    res.redirect("/login");
}

async function authLogout(req, res) {
  // hapus user dari session
  req.session.user = null;

  res.redirect("/login");
}

async function renderHeroes(req, res) {
  try {
    const heroes = await hero.findAll({
      include: [{ model: type }],
      order: [['createdAt', 'DESC']]
    });
    res.render("heroes", { heroes, user: req.session.user });
  } catch (error) {
    console.error("Error fetching heroes:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function renderAddHero(req, res) {
  try {
    const types = await type.findAll();
    res.render("addHero", { types, user: req.session.user }); // Changed from "addHero" to "add-hero"
  } catch (error) {
    console.error("Error rendering add hero page:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function postHero(req, res) {
    try {
      const { name, typeId } = req.body;
      const image = req.file ? req.file.filename : "default-hero.jpg";
  
      if (!name || !typeId) {
        req.flash("error", "Name and Type are required");
        return res.redirect("/addHero");
      }
  
      await hero.create({ name, typeId, image });
  
      req.flash("success", "Hero added successfully");
      res.redirect("/");
    } catch (error) {
      console.error("Error creating hero:", error);
      req.flash("error", "Failed to add hero");
      res.redirect("/addHero");
    }
  }
  

async function renderHeroDetail(req, res) {
  try {
    const { id } = req.params;
    const heroDetail = await hero.findByPk(id, { include: [{ model: type }] });

    if (!heroDetail) {
      return res.render("404-page");
    }

    res.render("hero-detail", { hero: heroDetail, user: req.session.user });
  } catch (error) {
    console.error("Error fetching hero detail:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function renderHeroEdit(req, res) {
  try {
    const { id } = req.params;
    const heroToEdit = await hero.findByPk(id, { include: [{ model: type }] });

    if (!heroToEdit) {
      return res.render("404-page");
    }

    const types = await type.findAll();
    res.render("hero-edit", { hero: heroToEdit, types, user: req.session.user });
  } catch (error) {
    console.error("Error rendering hero edit page:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function updateHero(req, res) {
  try {
    const { id } = req.params;
    const { name, typeId } = req.body;
    const image = req.file ? req.file.filename : null;

    const heroToUpdate = await hero.findByPk(id);

    if (!heroToUpdate) {
      return res.render("404-page");
    }

    await heroToUpdate.update({
      name,
      typeId,
      image: image || heroToUpdate.image,
    });

    req.flash("success", "Hero updated successfully");
    res.redirect(`/hero/${id}`);
  } catch (error) {
    console.error("Error updating hero:", error);
    req.flash("error", "Failed to update hero");
    res.redirect(`/hero-edit/${req.params.id}`); 
  }
}

async function deleteHero(req, res) {
  try {
    const { id } = req.params;
    const heroToDelete = await hero.findByPk(id);

    if (!heroToDelete) {
      return res.render("404-page");
    }

    await heroToDelete.destroy();

    req.flash("success", "Hero deleted successfully");
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting hero:", error);
    req.flash("error", "Failed to delete hero");
    res.redirect("/");
  }
}

async function renderAddType(req, res) {
  res.render("addType", { user: req.session.user }); // Changed from "addType" to "add-type"
}

async function postType(req, res) {
    try {
      const { type } = req.body;
  
      if (!type) {
        req.flash("error", "Hero type name is required");
        return res.redirect("/addType");
      }
  
      await type.create({ type });
  
      req.flash("success", "Type added successfully");
      res.redirect("/addHero"); // Ensure this matches your intended route
    } catch (error) {
      console.error("Error creating type:", error);
      req.flash("error", "Failed to add type");
      res.redirect("/addType");
    }
  }
  

module.exports = {
  renderHome,
  renderLogin,
  renderRegister,
  authLogin,
  authRegister,
  authLogout,
  renderHeroes,
  renderAddHero,
  postHero,
  renderHeroDetail,
  renderHeroEdit,
  updateHero,
  deleteHero,
  renderAddType,
  postType
};