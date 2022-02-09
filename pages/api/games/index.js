import { prisma } from '../../../src/prisma'
import { Prisma } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const reqData = req.body
    console.log(reqData)
    if (reqData.title === '') {
      return res.status(400).json({ error: 'Please enter a valid game title' })
    }
    await prisma.game
      .create({
        data: {
          title: reqData.title,
        },
      })
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            return res.status(400).json({ error: 'This game already exists.' })
          }
        }
      })
      .then(() => {
        res.status(201).end()
      })
      .finally(async () => await prisma.$disconnect())
  } else if (req.method === 'GET') {
    const games = await prisma.game
      .findMany({
        select: {
          id: true,
          title: true,
        },
      })
      .finally(async () => await prisma.$disconnect())
    await res.json(games)
  }
}
