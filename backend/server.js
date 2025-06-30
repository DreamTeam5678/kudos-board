const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

app.use(cors())
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})
app.get('/', (req, res) => {
    res.send("Yay our backend is working! ")
})

app.get('/api/boards', async (req, res) => {
  try {
    const boards = await prisma.board.findMany({
      include: { cards: true },
    });
    res.json(boards);
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({ error: "Failed to fetch boards" });
  }
});

app.get('/api/boards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const board = await prisma.board.findUnique({
      where: { id: parseInt(id) },
      include: { cards: true },
    });
    res.json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Board not found" });
  }
});

