import { Request, Response } from 'express'
import { processarPagamentoMock, obterPagamentoPorPedido } from '../servicos/pagamentoServico'

export const processar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pedidoId, formaPagamento } = req.body

    if (!pedidoId || !formaPagamento) {
      res.status(400).json({
        erro: 'DADOS_INVALIDOS',
        mensagem: 'pedidoId e formaPagamento são obrigatórios.',
        detalhes: [],
        timestamp: new Date().toISOString(),
        caminho: req.path
      })
      return
    }

    const resultado = await processarPagamentoMock({ pedidoId, formaPagamento })
    res.status(200).json(resultado)
  } catch (erro: any) {
    res.status(erro.codigo || 500).json({
      erro: 'ERRO_PROCESSAR_PAGAMENTO',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: req.path
    })
  }
}

export const buscarPorPedido = async (req: Request, res: Response): Promise<void> => {
  try {
    const pedidoId = Number(req.params.pedidoId)
    const pagamento = await obterPagamentoPorPedido(pedidoId)
    res.status(200).json(pagamento)
  } catch (erro: any) {
    res.status(erro.codigo || 500).json({
      erro: 'ERRO_BUSCAR_PAGAMENTO',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: req.path
    })
  }
}