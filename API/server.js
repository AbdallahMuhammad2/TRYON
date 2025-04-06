const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Carregar dados do JSON
let jewelryData;
try {
  const rawData = fs.readFileSync(path.join(__dirname, 'jewelry-data.json'));
  jewelryData = JSON.parse(rawData);
  console.log('Dados das joias carregados com sucesso!');
} catch (error) {
  console.error('Erro ao carregar dados das joias:', error);
  jewelryData = { JEWELRY: {} };
}

// Endpoint principal para dados das joias
app.get('/jewelry-data', (req, res) => {
  res.json(jewelryData);
});

// Endpoint para obter uma joia específica
app.get('/jewelry/:id', (req, res) => {
  const { id } = req.params;
  
  if (jewelryData.JEWELRY[id]) {
    res.json(jewelryData.JEWELRY[id]);
  } else {
    res.status(404).json({ error: 'Joia não encontrada' });
  }
});

// Rota para verificar status da API
app.get('/status', (req, res) => {
  res.json({ status: 'online', message: 'API do Provador Virtual está funcionando!' });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor do Provador Virtual rodando em http://localhost:${PORT}`);
  console.log(`Endpoint principal: http://localhost:${PORT}/jewelry-data`);
  console.log(`Verificar status: http://localhost:${PORT}/status`);
});