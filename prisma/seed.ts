import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const connectionString = String(process.env.DATABASE_URL)
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter } as any)

async function main() {
  console.log('Iniciando seed...')

  // Cria usuários
  const senhaAdmin = await bcrypt.hash('Admin@123', 10)
  const senhaCliente = await bcrypt.hash('Cliente@123', 10)

  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@raizes.com' },
    update: {},
    create: {
      nome: 'Admin Raízes',
      email: 'admin@raizes.com',
      senha: senhaAdmin,
      perfil: 'ADMIN',
      fidelidade: { create: { pontos: 0 } }
    }
  })

  const cliente = await prisma.usuario.upsert({
    where: { email: 'cliente@raizes.com' },
    update: {},
    create: {
      nome: 'Carlos Cliente',
      email: 'cliente@raizes.com',
      senha: senhaCliente,
      perfil: 'CLIENTE',
      fidelidade: { create: { pontos: 0 } }
    }
  })

  // Cria unidade
  const unidade = await prisma.unidade.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: 'Raízes do Nordeste - Centro',
      endereco: 'Rua das Flores, 123',
      cidade: 'Fortaleza'
    }
  })

  // Cria produtos
  const produto1 = await prisma.produto.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: 'X-Nordestino',
      descricao: 'Hamburguer com carne de sol e queijo coalho',
      preco: 32.90,
      categoria: 'Lanches'
    }
  })

  const produto2 = await prisma.produto.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nome: 'Baião de Dois',
      descricao: 'Arroz com feijão verde, queijo e bacon',
      preco: 28.90,
      categoria: 'Pratos'
    }
  })

  const produto3 = await prisma.produto.upsert({
    where: { id: 3 },
    update: {},
    create: {
      nome: 'Suco de Caju',
      descricao: 'Suco natural de caju',
      preco: 12.90,
      categoria: 'Bebidas'
    }
  })

  // Cria estoque
  await prisma.estoque.upsert({
    where: { unidadeId_produtoId: { unidadeId: unidade.id, produtoId: produto1.id } },
    update: {},
    create: { unidadeId: unidade.id, produtoId: produto1.id, quantidade: 50 }
  })

  await prisma.estoque.upsert({
    where: { unidadeId_produtoId: { unidadeId: unidade.id, produtoId: produto2.id } },
    update: {},
    create: { unidadeId: unidade.id, produtoId: produto2.id, quantidade: 30 }
  })

  await prisma.estoque.upsert({
    where: { unidadeId_produtoId: { unidadeId: unidade.id, produtoId: produto3.id } },
    update: {},
    create: { unidadeId: unidade.id, produtoId: produto3.id, quantidade: 100 }
  })

  console.log('Seed concluído!')
  console.log('Usuários criados:')
  console.log('  Admin: admin@raizes.com / Admin@123')
  console.log('  Cliente: cliente@raizes.com / Cliente@123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })