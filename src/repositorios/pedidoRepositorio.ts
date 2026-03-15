import clientePrisma from '../utilitarios/clientePrisma'

export const criarPedido = async (dados: {
  usuarioId: number
  unidadeId: number
  canalPedido: string
  total: number
  itens: { produtoId: number; quantidade: number; precoUnitario: number }[]
}) => {
  return await clientePrisma.pedido.create({
    data: {
      usuarioId: dados.usuarioId,
      unidadeId: dados.unidadeId,
      canalPedido: dados.canalPedido as any,
      total: dados.total,
      itens: {
        create: dados.itens
      }
    },
    include: {
      itens: { include: { produto: true } },
      usuario: { select: { id: true, nome: true, email: true } },
      unidade: true
    }
  })
}

export const buscarPedidoPorId = async (id: number) => {
  return await clientePrisma.pedido.findUnique({
    where: { id },
    include: {
      itens: { include: { produto: true } },
      usuario: { select: { id: true, nome: true, email: true } },
      unidade: true,
      pagamento: true
    }
  })
}

export const listarPedidos = async (filtros: {
  canalPedido?: string
  status?: string
  usuarioId?: number
  page: number
  limit: number
}) => {
  const pular = (filtros.page - 1) * filtros.limit
  const where: any = {}

  if (filtros.canalPedido) where.canalPedido = filtros.canalPedido
  if (filtros.status) where.status = filtros.status
  if (filtros.usuarioId) where.usuarioId = filtros.usuarioId

  const [pedidos, total] = await Promise.all([
    clientePrisma.pedido.findMany({
      where,
      skip: pular,
      take: filtros.limit,
      orderBy: { criadoEm: 'desc' },
      include: {
        itens: { include: { produto: true } },
        usuario: { select: { id: true, nome: true } },
        unidade: true,
        pagamento: true
      }
    }),
    clientePrisma.pedido.count({ where })
  ])

  return { pedidos, total, pagina: filtros.page, limite: filtros.limit }
}

export const atualizarStatusPedido = async (id: number, status: string) => {
  return await clientePrisma.pedido.update({
    where: { id },
    data: { status: status as any }
  })
}