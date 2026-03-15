import clientePrisma from '../utilitarios/clientePrisma'

export const listarProdutos = async (page: number = 1, limit: number = 10) => {
  const pular = (page - 1) * limit
  const [produtos, total] = await Promise.all([
    clientePrisma.produto.findMany({
      where: { ativo: true },
      skip: pular,
      take: limit,
      orderBy: { nome: 'asc' }
    }),
    clientePrisma.produto.count({ where: { ativo: true } })
  ])
  return { produtos, total, pagina: page, limite: limit }
}

export const buscarProdutoPorId = async (id: number) => {
  return await clientePrisma.produto.findUnique({ where: { id } })
}

export const criarProduto = async (dados: {
  nome: string
  descricao?: string
  preco: number
  categoria: string
}) => {
  return await clientePrisma.produto.create({ data: dados })
}

export const atualizarProduto = async (id: number, dados: {
  nome?: string
  descricao?: string
  preco?: number
  categoria?: string
  ativo?: boolean
}) => {
  return await clientePrisma.produto.update({ where: { id }, data: dados })
}