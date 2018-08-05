const express = require('express');

const app = express();

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

app.get('/api/get-circles', (req, res) => {
  const numbers = [
    {id: 1, x: 45, y: 60}
  ];
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);