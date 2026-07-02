const express = require('express');
const professionals = require('../Data/professionals');
const router = express.Router();
const Professional = require('../models/Professional');

// middleware to parse JSON request bodies
router.use(express.json());

router.get('/',async  (req, res) => {
  const professionals = await Professional.find();
  res.json(professionals);
});

router.get('/:id', async (req, res) => {
  const professionalId = req.params.id;
  const professional = await Professional.findById(professionalId);

  if (!professional) {
    return res.status(404).json({ error: 'Professional not found' });
  }

  res.json(professional);
});

router.post('/', async  (req, res) => {
  if (!req.body.name || !req.body.category) {
    return res.status(400).json({ error: 'Name and category are required' });
  }

  const newProfessional = {
    name: req.body.name,
    category: req.body.category,
    tags: req.body.tags || [],
    isActive: req.body.isActive ?? true,
  };

  
  const professional = await Professional.create(newProfessional);
  res.status(201).json(professional);
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