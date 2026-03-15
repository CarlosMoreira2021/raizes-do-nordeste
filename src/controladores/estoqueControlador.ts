import { Request, Response } from 'express'
import { obterEstoquePorUnidade, movimentarEstoque } from '../servicos/estoqueServico'

export const listarPorUnidade = async (req: Request, res: Response): Promise<void> => {
  try {
    const unidadeId = Number(req.params.unidadeId)
    const estoque = await obterEstoquePorUnidade(unidadeId)
    res.status(200).json(estoque)
  } catch (erro: any) {
    res.status(erro.codigo || 500).json({
      erro: 'ERRO_LISTAR_ESTOQUE',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: req.path
    })
  }
}

export const movimentar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { unidadeId, produtoId, quantidade, tipo } = req.body

    if (!unidadeId || !produtoId || !quantidade || !tipo) {
      res.status(400).json({
        erro: 'DADOS_INVALIDOS',
        mensagem: 'unidadeId, produtoId, quantidade e tipo são obrigatórios.',
        detalhes: [],
        timestamp: new Date().toISOString(),
        caminho: req.path
      })
      return
    }

    if (!['ENTRADA', 'SAIDA'].includes(tipo)) {
      res.status(400).json({
        erro: 'TIPO_INVALIDO',
        mensagem: 'Tipo deve ser ENTRADA ou SAIDA.',
        detalhes: [],
        timestamp: new Date().toISOString(),
        caminho: req.path
      })
      return
    }

    const resultado = await movimentarEstoque(unidadeId, produtoId, quantidade, tipo)
    res.status(200).json(resultado)
  } catch (erro: any) {
    res.status(erro.codigo || 500).json({
      erro: 'ERRO_MOVIMENTAR_ESTOQUE',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: req.path
    })
  }
}