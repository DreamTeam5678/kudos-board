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
