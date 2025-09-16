import { PrismaClient } from './src/generated/prisma/index.js'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  const data = JSON.parse(fs.readFileSync('students.json', 'utf-8'))

  for (const student of data) {
    await prisma.student.create({
      data: student
    })
  }

  console.log("Students inserted successfully!")
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect()
    })