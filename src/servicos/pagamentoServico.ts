import clientePrisma from '../utilitarios/clientePrisma'
import { atualizarStatusPedido } from '../repositorios/pedidoRepositorio'
import { buscarPedidoPorId } from '../repositorios/pedidoRepositorio'
import { auditoria } from '../utilitarios/logger'

export const processarPagamentoMock = async (dados: {
  pedidoId: number
  formaPagamento: string
}) => {
  const pedido = await buscarPedidoPorId(dados.pedidoId)

  if (!pedido) {
    throw { codigo: 404, mensagem: 'Pedido não encontrado.' }
  }

  if (pedido.status !== 'AGUARDANDO_PAGAMENTO') {
    throw { codigo: 409, mensagem: 'Pedido não está aguardando pagamento.' }
  }

  const aprovado = Math.random() > 0.2

  const respostaMock = {
    gateway: 'MOCK_GATEWAY',
    transacaoId: `TXN-${Date.now()}`,
    status: aprovado ? 'APROVADO' : 'RECUSADO',
    valor: pedido.total,
    formaPagamento: dados.formaPagamento,
    processadoEm: new Date().toISOString()
  }

  const pagamento = await clientePrisma.pagamento.create({
    data: {
      pedidoId: dados.pedidoId,
      status: aprovado ? 'APROVADO' : 'RECUSADO',
      formaPagamento: dados.formaPagamento,
      valor: pedido.total,
      respostaMock: respostaMock
    }
  })

  const novoStatus = aprovado ? 'PAGAMENTO_APROVADO' : 'CANCELADO'
  await atualizarStatusPedido(dados.pedidoId, novoStatus)

  // Log de auditoria
  auditoria('PAGAMENTO_PROCESSADO', pedido.usuarioId, {
    pedidoId: dados.pedidoId,
    status: aprovado ? 'APROVADO' : 'RECUSADO',
    valor: pedido.total,
    formaPagamento: dados.formaPagamento,
    transacaoId: respostaMock.transacaoId
  })

  if (aprovado) {
    const pontos = Math.floor(Number(pedido.total))
    await clientePrisma.fidelidade.upsert({
      where: { usuarioId: pedido.usuarioId },
      update: {
        pontos: { increment: pontos },
        historico: {
          create: {
            pontos,
            tipo: 'GANHO',
            descricao: `Pontos por pedido #${dados.pedidoId}`
          }
        }
      },
      create: {
        usuarioId: pedido.usuarioId,
        pontos,
        historico: {
          create: {
            pontos,
            tipo: 'GANHO',
            descricao: `Pontos por pedido #${dados.pedidoId}`
          }
        }
      }
    })
  }

  return {
    pagamento,
    statusPedido: novoStatus,
    respostaMock
  }
}

export const obterPagamentoPorPedido = async (pedidoId: number) => {
  const pagamento = await clientePrisma.pagamento.findUnique({
    where: { pedidoId }
  })

  if (!pagamento) {
    throw { codigo: 404, mensagem: 'Pagamento não encontrado.' }
  }

  return pagamento
}