const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const transacaoRoutes = require('./routes/transacaoRoutes');
const orcamentoRoutes = require('./routes/orcamentoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/transacoes', transacaoRoutes);
app.use('/api/orcamentos', orcamentoRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    erro: err.message || 'Erro interno do servidor'
  });
});

module.exports = app;
//test
