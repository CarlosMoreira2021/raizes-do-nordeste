import { criarPedido, buscarPedidoPorId, listarPedidos, atualizarStatusPedido } from '../repositorios/pedidoRepositorio'
import { buscarProdutoPorId } from '../repositorios/produtoRepositorio'
import { verificarDisponibilidade, movimentarEstoque } from './estoqueServico'
import { auditoria } from '../utilitarios/logger'

const CANAIS_VALIDOS = ['APP', 'TOTEM', 'BALCAO', 'PICKUP', 'WEB']
const STATUS_VALIDOS = ['AGUARDANDO_PAGAMENTO', 'PAGAMENTO_APROVADO', 'EM_PREPARO', 'PRONTO', 'ENTREGUE', 'CANCELADO']

export const realizarPedido = async (dados: {
  usuarioId: number
  unidadeId: number
  canalPedido: string
  itens: { produtoId: number; quantidade: number }[]
}) => {
  if (!CANAIS_VALIDOS.includes(dados.canalPedido)) {
    throw { codigo: 422, mensagem: `Canal inválido. Use: ${CANAIS_VALIDOS.join(', ')}` }
  }

  const itensComPreco = []
  let total = 0

  for (const item of dados.itens) {
    const produto = await buscarProdutoPorId(item.produtoId)
    if (!produto) {
      throw { codigo: 404, mensagem: `Produto ${item.produtoId} não encontrado.` }
    }

    await verificarDisponibilidade(dados.unidadeId, item.produtoId, item.quantidade)

    const precoUnitario = Number(produto.preco)
    total += precoUnitario * item.quantidade

    itensComPreco.push({
      produtoId: item.produtoId,
      quantidade: item.quantidade,
      precoUnitario
    })
  }

  const pedido = await criarPedido({
    usuarioId: dados.usuarioId,
    unidadeId: dados.unidadeId,
    canalPedido: dados.canalPedido,
    total,
    itens: itensComPreco
  })

  for (const item of itensComPreco) {
    await movimentarEstoque(dados.unidadeId, item.produtoId, item.quantidade, 'SAIDA')
  }

  // Log de auditoria
  auditoria('PEDIDO_CRIADO', dados.usuarioId, {
    pedidoId: pedido.id,
    canalPedido: dados.canalPedido,
    total,
    unidadeId: dados.unidadeId
  })

  return pedido
}

export const obterPedidoPorId = async (id: number) => {
  const pedido = await buscarPedidoPorId(id)
  if (!pedido) throw { codigo: 404, mensagem: 'Pedido não encontrado.' }
  return pedido
}

export const obterPedidos = async (filtros: {
  canalPedido?: string
  status?: string
  usuarioId?: number
  page: number
  limit: number
}) => {
  return await listarPedidos(filtros)
}

export const atualizarStatus = async (id: number, status: string, usuarioId: number) => {
  if (!STATUS_VALIDOS.includes(status)) {
    throw { codigo: 422, mensagem: `Status inválido. Use: ${STATUS_VALIDOS.join(', ')}` }
  }

  await obterPedidoPorId(id)
  const pedido = await atualizarStatusPedido(id, status)

  // Log de auditoria
  auditoria('STATUS_PEDIDO_ATUALIZADO', usuarioId, {
    pedidoId: id,
    novoStatus: status
  })

  return pedido
}