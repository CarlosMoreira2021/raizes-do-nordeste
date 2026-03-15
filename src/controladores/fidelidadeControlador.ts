import { Request, Response } from 'express'
import { obterFidelidade, realizarResgate } from '../servicos/fidelidadeServico'

export const buscarMeusSaldo = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = req.usuarioAutenticado!.id
    const fidelidade = await obterFidelidade(usuarioId)
    res.status(200).json(fidelidade)
  } catch (erro: any) {
    res.status(erro.codigo || 500).json({
      erro: 'ERRO_BUSCAR_FIDELIDADE',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: req.path
    })
  }
}

export const resgatar = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = req.usuarioAutenticado!.id
    const { pontos } = req.body

    if (!pontos) {
      res.status(400).json({
        erro: 'DADOS_INVALIDOS',
        mensagem: 'Quantidade de pontos é obrigatória.',
        detalhes: [],
        timestamp: new Date().toISOString(),
        caminho: req.path
      })
      return
    }

    const resultado = await realizarResgate(usuarioId, pontos)
    res.status(200).json(resultado)
  } catch (erro: any) {
    res.status(erro.codigo || 500).json({
      erro: 'ERRO_RESGATAR_PONTOS',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: req.path
    })
  }
}