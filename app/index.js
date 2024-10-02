import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express();
app.use(express.json());


// configuracion
app.use(express.static(path.join(__dirname, "..")))

// Rutas GET
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/categorias', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'categorias.html'));
});

app.get('/producto', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'producto.html'));
});

app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'contact.html'));
});

app.get('/pagues/registro.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pagues', 'registro.html'));
});


// POST

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    // Si todo está bien, responde con éxito
    res.status(200).json({ msg: 'Registro exitoso' });
});


// server

app.set("port", 4000);
app.listen(app.get("port"));

console.log("servidor corriendo");