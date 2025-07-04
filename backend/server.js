const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// Routes
const boardsRouter = require('./routes/boards');
const boardCardsRouter = require('./routes/boardCards');
const commentRoutes = require('./routes/comments'); // NEW

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Yay our backend is working!");
});

app.use('/boards', boardsRouter);
app.use('/boards', boardCardsRouter);
app.use('/cards', commentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
