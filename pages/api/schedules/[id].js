import { prisma } from "../../../src/prisma"

export default async function handler(req, res) {
  const { id } = req.query
  const ID = parseInt(id)
  if (req.method === "DELETE") {
    await prisma.schedule
      .delete({
        where: {
          id: ID,
        },
      })
      .then(() => res.status(204).end())
  } else {
    res.json("Error")
  }
}
