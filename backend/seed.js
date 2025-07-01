const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const data = fs.readFileSync('../data/boards.json', 'utf8');
  const boards = JSON.parse(data);

  for (const board of boards.boards) {
    const newBoard = await prisma.board.create({
      data: {
        title: board.title,
        description: board.description,
        image: board.image,
        category: board.category,
      },
    });

    for (const card of board.cards) {
      await prisma.card.create({
        data: {
          message: card.message || "No message provided",
          author: card.author || "Anonymous",
          gifUrl: card.gifUrl || "https://media.giphy.com/media/l0MYGb1LuZ3n7dRnO/giphy.gif", 
          upvotes: card.upvotes || 0,
          boardId: newBoard.id,
        }
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });           