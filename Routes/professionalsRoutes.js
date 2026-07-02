const express = require('express');
const professionals = require('../Data/professionals');
const router = express.Router();


// ;liddleware to parse JSON request bodies
router.use(express.json());

router.get('/', (req, res) => {
  res.json(professionals);
});

router.get('/:id', (req, res) => {
  const professionalId = parseInt(req.params.id);
  const professional = professionals.find(p => p.id === professionalId);

  if (!professional) {
    return res.status(404).json({ error: 'Professional not found' });
  }

  res.json(professional);
});

router.post('/', (req, res) => {
  if (!req.body.name || !req.body.category) {
    return res.status(400).json({ error: 'Name and category are required' });
  }

  const newProfessional = {
    id: professionals.length + 1,
    name: req.body.name,
    category: req.body.category,
  };

  professionals.push(newProfessional);
  res.status(201).json(newProfessional);
});

router.put('/', (req, res) => {
  const professionalId = parseInt(req.params.id);
  const professional = professionals.find(p => p.id === professionalId);

  if (!professional) {
    return res.status(404).json({ error: 'Professional not found' });
  }

  if (req.body.name) {
    professional.name = req.body.name;
  }
  if (req.body.category) {
    professional.category = req.body.category;
  }

  res.json(professional);
});

router.delete('/', (req, res) => {
  const professionalId = parseInt(req.params.id);
  const index = professionals.findIndex(p => p.id === professionalId);

  if (index === -1) {
    return res.status(404).json({ error: 'Professional not found' });
  }

  professionals.splice(index, 1);
  res.status(204).send();
});


module.exports = router;