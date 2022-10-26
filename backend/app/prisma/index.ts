import { PrismaClient } from '@prisma/client'
import { type } from 'os'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  const deletedCategory = await prisma.category.deleteMany()
  console.log(deletedCategory,"start");

  const cate = [
    {id: 1, name: 'study'},
    {id: 2, name: 'friend'},
    {id: 3, name: 'hobby'},
    {id: 4, name: 'shopping'},
    {id: 5, name: 'other'}
  ]

  cate.map(async (category) => {
      await prisma.category.create({
        data: category
      })
  })

  const allCategory = await prisma.category.findMany({})
  console.log(allCategory,"ok")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })