import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = String(process.env.DATABASE_URL)

const adapter = new PrismaPg({ connectionString })

const clientePrisma = new PrismaClient({ adapter } as any)

export default clientePrisma