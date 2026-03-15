import { Request, Response } from 'express'
import {
  obterProdutos,
  obterProdutoPorId,
  cadastrarProduto,
  editarProduto
} from '../servicos/produtoServico'

export const listar = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const resultado = await obterProdutos(page, limit)
    res.status(200).json(resultado)
  } catch (erro: any) {
    res.status(erro.codigo || 500).json({
      erro: 'ERRO_LISTAR_PRODUTOS',
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
    const produto = await obterProdutoPorId(id)
    res.status(200).json(produto)
  } catch (erro: any) {
    res.status(erro.codigo || 500).json({
      erro: 'ERRO_BUSCAR_PRODUTO',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: req.path
    })
  }
}

export const criar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, descricao, preco, categoria } = req.body
    if (!nome || !preco || !categoria) {
      res.status(400).json({
        erro: 'DADOS_INVALIDOS',
        mensagem: 'Nome, preço e categoria são obrigatórios.',
        detalhes: [],
        timestamp: new Date().toISOString(),
        caminho: req.path
      })
      return
    }
    const produto = await cadastrarProduto({ nome, descricao, preco, categoria })
    res.status(201).json(produto)
  } catch (erro: any) {
    res.status(erro.codigo || 500).json({
      erro: 'ERRO_CRIAR_PRODUTO',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: req.path
    })
  }
}

export const atualizar = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const produto = await editarProduto(id, req.body)
    res.status(200).json(produto)
  } catch (erro: any) {
    res.status(erro.codigo || 500).json({
      erro: 'ERRO_ATUALIZAR_PRODUTO',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: req.path
    })
  }
}