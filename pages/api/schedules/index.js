import { prisma } from '../../../src/prisma'
import { Prisma } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const reqData = req.body
    console.log(reqData)
    if (reqData.game === '' || reqData.player === '') {
      return res
        .status(400)
        .json({ error: 'Please enter a valid player or game' })
    }
    const dateTime = new Date(reqData.dateTime)
    await prisma.schedule
      .create({
        data: {
          dateTime: dateTime,
          player: {
            connect: { id: reqData.player },
          },
          game: {
            connect: {
              id: reqData.game,
            },
          },
        },
      })
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            return res
              .status(400)
              .json({ error: 'This schedule already exists.' })
          }
        } else {
          return console.log(e.message)
        }
      })
      .then(() => {
        res.status(201).end()
      })
      .finally(async () => await prisma.$disconnect())
  } else if (req.method === 'GET') {
    const schedules = await prisma.schedule.findMany({
      select: {
        id: true,
        dateTime: true,
        player: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
        game: {
          select: {
            title: true,
          },
        },
      },
    })
    await res.json(schedules)
  }
}
