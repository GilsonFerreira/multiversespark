const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();
const app = express();

// Configuração da sessão
app.use(session({
  secret: 'multiverse_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Middleware de autenticação simples
function authMiddleware(req, res, next) {
  if (req.session && req.session.loggedIn) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// Configurações básicas
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rotas
const panelRoutes = require('./routes/panel');
app.use('/painel', authMiddleware, panelRoutes);

app.get('/', (req, res) => res.redirect('/login'));

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.PANEL_PASSWORD) {
    req.session.loggedIn = true;
    res.redirect('/painel');
  } else {
    res.render('login', { error: 'Senha incorreta' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Painel rodando na porta ${PORT}`);
});