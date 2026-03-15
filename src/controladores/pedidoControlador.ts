import { Request, Response } from 'express'
import { realizarPedido, obterPedidoPorId, obterPedidos, atualizarStatus } from '../servicos/pedidoServico'

export const criar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { unidadeId, canalPedido, itens } = req.body
    const usuarioId = req.usuarioAutenticado!.id

    if (!unidadeId || !canalPedido || !itens || itens.length === 0) {
      res.status(400).json({
        erro: 'DADOS_INVALIDOS',
        mensagem: 'unidadeId, canalPedido e itens são obrigatórios.',
        detalhes: [],
        timestamp: new Date().toISOString(),
        caminho: req.path
      })
      return
    }

    const pedido = await realizarPedido({ usuarioId, unidadeId, canalPedido, itens })
    res.status(201).json(pedido)
  } catch (erro: any) {
    res.status(erro.codigo || 500).json({
      erro: 'ERRO_CRIAR_PEDIDO',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: req.path
    })
  }
}

export const buscarPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const pedido = await obterPedidoPorId(id)
    res.status(200).json(pedido)
  } catch (erro: any) {
    res.status(erro.codigo || 500).json({
      erro: 'ERRO_BUSCAR_PEDIDO',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: req.path
    })
  }
}

export const listar = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const { canalPedido, status } = req.query

    const resultado = await obterPedidos({
      canalPedido: canalPedido as string,
      status: status as string,
      page,
      limit
    })
    res.status(200).json(resultado)
  } catch (erro: any) {
    res.status(erro.codigo || 500).json({
      erro: 'ERRO_LISTAR_PEDIDOS',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: req.path
    })
  }
}

export const atualizarStatusPedido = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const { status } = req.body

    if (!status) {
      res.status(400).json({
        erro: 'DADOS_INVALIDOS',
        mensagem: 'Status é obrigatório.',
        detalhes: [],
        timestamp: new Date().toISOString(),
        caminho: req.path
      })
      return
    }

    const pedido = await atualizarStatus(id, status)
    res.status(200).json(pedido)
  } catch (erro: any) {
    res.status(erro.codigo || 500).json({
      erro: 'ERRO_ATUALIZAR_STATUS',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: req.path
    })
  }
}