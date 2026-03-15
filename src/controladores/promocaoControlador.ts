import { Request, Response } from 'express'
import { listarPromocoesAtivas, calcularPromocao } from '../servicos/promocaoServico'

export const listar = async (req: Request, res: Response): Promise<void> => {
  try {
    const promocoes = listarPromocoesAtivas()
    res.status(200).json(promocoes)
  } catch (erro: any) {
    console.log('ERRO PROMOCOES:', erro)
    res.status(500).json({
      erro: 'ERRO_LISTAR_PROMOCOES',
      mensagem: 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: req.path
    })
  }
}

export const simular = async (req: Request, res: Response): Promise<void> => {
  try {
    const { itens, totalOriginal, pontosFidelidade } = req.body

    if (!itens || !totalOriginal) {
      res.status(400).json({
        erro: 'DADOS_INVALIDOS',
        mensagem: 'itens e totalOriginal são obrigatórios.',
        detalhes: [],
        timestamp: new Date().toISOString(),
        caminho: req.path
      })
      return
    }

    const resultado = calcularPromocao(itens, totalOriginal, pontosFidelidade || 0)
    res.status(200).json(resultado)
  } catch (erro: any) {
    console.log('ERRO SIMULAR PROMOCAO:', erro)
    res.status(500).json({
      erro: 'ERRO_SIMULAR_PROMOCAO',
      mensagem: 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: req.path
    })
  }
}