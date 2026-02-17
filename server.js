const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get('/', (req, res) => {
  res.send('Servidor conectado ao banco 🚀');
});

// Criar agendamento
app.post('/agendar', async (req, res) => {
  const { fornecedor, cnpj, volumes, data } = req.body;

  const { data: result, error } = await supabase
    .from('agendamentos')
    .insert([
      {
        fornecedor,
        cnpj,
        volumes,
        data,
        status: 'PENDENTE'
      }
    ])
    .select();

  if (error) {
    return res.status(400).json({ error });
  }

  res.json(result);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
