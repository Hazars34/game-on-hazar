import { prisma } from '../../../src/prisma'
import { Prisma } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const reqData = req.body
    console.log(reqData)
    if (
      reqData.username === '' ||
      reqData.firstName === '' ||
      reqData.lastName === ''
    ) {
      return res.status(400).json({ error: 'Please enter valid input values' })
    }
    await prisma.player
      .create({
        data: {
          firstName: reqData.firstName,
          lastName: reqData.lastName,
          username: reqData.username,
        },
      })
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            return res
              .status(400)
              .json({ error: 'This username already exists.' })
          }
        }
      })
      .then(() => {
        res.status(201).end()
      })
      .finally(async () => await prisma.$disconnect())
  } else if (req.method === 'GET') {
    const players = await prisma.player
      .findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      })
      .finally(async () => await prisma.$disconnect())

    await res.json(players)
  }
}
