import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = String(process.env.DATABASE_URL)
const adapter = new PrismaPg({ connectionString })

// Prisma 7 - importação correta
const { PrismaClient } = require('@prisma/client')
const clientePrisma = new PrismaClient({ adapter })

export default clientePrisma