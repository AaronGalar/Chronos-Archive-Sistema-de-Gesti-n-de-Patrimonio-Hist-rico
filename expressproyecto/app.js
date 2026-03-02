const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const mustacheExpress = require('mustache-express');
const cors = require('cors'); 

// Repositorios
const users = require("./repositories/users");
const teachers = require("./repositories/teachers");
const students = require("./repositories/students");

// --- INICIALIZACIÓN DE LA APP ---
const app = express(); 
const port = 3000;
const JWT_SECRET = "examen_secret_2026";

// --- MIDDLEWARES ---
app.use(cors()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- CONFIGURACIÓN MUSTACHE  ---
app.engine('html', mustacheExpress(path.join(__dirname, 'views', 'partials'), '.html'));
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// --- MIDDLEWARES ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 

app.use(session({
    secret: "clave_secreta_pro",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));

// --- RUTAS DE VISTAS ---

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/home", async (req, res) => {
    if (req.session && req.session.isLoggedIn) {
        if (req.session.user.type === "admin") {
            return res.redirect("/users");
        }

        try {
            const teacherData = await teachers.getByUserId(req.session.user.id);
            
            let nameToSend;
            let lastNameToSend;

            if (teacherData) {
                nameToSend = teacherData.name;
                lastNameToSend = teacherData.last_name;
            } else {
                nameToSend = "Profesor";
                lastNameToSend = "";
            }

            res.render("home", { 
                email: req.session.user.email,
                nombre: nameToSend,
                apellido: lastNameToSend
            });

        } catch (err) { 
            res.status(500).send("Error en el servidor"); 
        }
    } else { 
        res.redirect("/login"); 
    }
});
app.get("/users", async (req, res) => {
    if (req.session.isLoggedIn && req.session.user.type === "admin") {
        try {
            const allUsers = await users.getAll();
            res.render("users", { adminEmail: req.session.user.email, listaUsuarios: allUsers });
        } catch (err) { res.status(500).send("Error al cargar usuarios"); }
    } else { res.status(401).send("Acceso denegado"); }
});

// --- AUTENTICACIÓN Y LOGOUT ---

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    users.getByEmail(username).then((user) => {
        if (!user) return res.status(401).send("Usuario no existe <a href='/login'>Volver</a>");
        return bcrypt.compare(password, user.password).then((match) => {
            if (match) {
                req.session.isLoggedIn = true;
                req.session.user = { id: user.id, email: user.email, type: user.type };
                return res.redirect("/home");
            }
            res.status(401).send("Contraseña incorrecta <a href='/login'>Volver</a>");
        });
    });
});

app.post("/logout", (req, res) => {
    req.session.destroy(() => { 
        res.clearCookie("connect.sid"); 
        res.redirect("/login"); 
    });
});

// --- API ENDPOINTS ---

// Generar Token JWT
app.post("/api/token", (req, res) => {
    const { username, password } = req.body;
    users.getByEmail(username).then((user) => {
        if (!user) return res.status(401).json({ message: "Usuario no existe" });
        
        bcrypt.compare(password, user.password).then((match) => {
            if (match) {
                
                const payload = { 
                    id: user.id, 
                    username: user.email, 
                    type: user.type 
                };

                const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
                res.json({ token });
            } else { 
                res.status(401).json({ message: "Contraseña incorrecta" }); 
            }
        });
    });
});
// --- CRUD USERS 
app.get("/api/users", (req, res) => {
    users.getAll().then(results => res.json(results));
});

app.get("/api/users/:id", (req, res) => {
    users.getById(req.params.id).then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).send("No encontrado");
        }
    });
});

app.post("/api/users", body("email").isEmail(), body("password").notEmpty(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const result = await users.insert(req.body);
        res.status(201).json(result);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put("/api/users/:id", (req, res) => {
    users.update(req.params.id, req.body)
        .then(() => res.json({ success: true }))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.delete("/api/users/:id", (req, res) => {
    users.delete(req.params.id)
        .then(() => res.json({ success: true }))
        .catch((err) => res.status(400).json({ error: err.message })); 
});

// Activar usuario (POST y GET)
app.post("/api/users/:id/active", async (req, res) => {
    try {
        await users.update(req.params.id, { active: true });
        const updatedUser = await users.getById(req.params.id);
        res.json(updatedUser);
    } catch (err) { res.status(404).json({ error: "No encontrado" }); }
});

app.get("/api/users/:id/active", async (req, res) => {
    try {
        const user = await users.getById(req.params.id);
        res.json({ active: user.active });
    } catch (err) { res.status(404).json({ error: "No encontrado" }); }
});

// --- CRUD TEACHERS 
app.get("/api/teachers", (req, res) => {
    teachers.getAll().then(results => res.json(results));
});

app.get("/api/teachers/:id", (req, res) => {
    teachers.getById(req.params.id).then(t => {
        if (t) {
            res.json(t);
        } else {
            res.status(404).send("No encontrado");
        }
    });
});

app.post("/api/teachers", (req, res) => {
    teachers.insert(req.body).then(result => res.status(201).json(result)).catch(err => res.status(400).json({ error: err.message }));
});

app.put("/api/teachers/:id", (req, res) => {
    teachers.update(req.params.id, req.body).then(() => res.json({ success: true })).catch(err => res.status(400).json({ error: err.message }));
});

app.delete("/api/teachers/:id", (req, res) => {
    teachers.delete(req.params.id)
        .then(() => res.json({ success: true }))
        .catch((err) => res.status(400).json({ error: err.message })); 
});


app.get("/api/teachers/:teacher_id/students", (req, res) => {
    teachers.getStudentsByTeacher(req.params.teacher_id)
        .then(results => res.json(results))
        .catch(err => {
            if (err.message === "401") return res.status(401).send("Profesor no encontrado o usuario inactivo");
            res.status(500).send(err.message);
        });
});

// --- CRUD STUDENTS  ---
app.get("/api/students", (req, res) => {
    students.getAll().then(results => res.json(results));
});

app.get("/api/students/:id", (req, res) => {
    students.getById(req.params.id).then(s => {
        if (s) {
            res.json(s);
        } else {
            res.status(404).send("No encontrado");
        }
    });
});

app.post("/api/students", (req, res) => {
    students.insert(req.body).then(result => res.status(201).json(result)).catch(err => res.status(400).json({ error: err.message }));
});

app.put("/api/students/:id", (req, res) => {
    students.update(req.params.id, req.body).then(() => res.json({ success: true })).catch(err => res.status(400).json({ error: err.message }));
});

app.delete("/api/students/:id", (req, res) => {
    students.delete(req.params.id).then(() => res.json({ success: true })).catch(err => res.status(400).json({ error: err.message }));
});

// --- ARRANQUE DEL SERVIDOR ---
app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`);
});