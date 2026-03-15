import { Request, Response } from 'express'
import {
  obterUnidades,
  obterUnidadePorId,
  cadastrarUnidade,
  editarUnidade
} from '../servicos/unidadeServico'

export const listar = async (
  requisicao: Request,
  resposta: Response
): Promise<void> => {
  try {
    const unidades = await obterUnidades()
    resposta.status(200).json(unidades)
  } catch (erro: any) {
    resposta.status(erro.codigo || 500).json({
      erro: 'ERRO_LISTAR_UNIDADES',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: requisicao.path
    })
  }
}

export const buscarPorId = async (
  requisicao: Request,
  resposta: Response
): Promise<void> => {
  try {
    const id = Number(requisicao.params.id)
    const unidade = await obterUnidadePorId(id)
    resposta.status(200).json(unidade)
  } catch (erro: any) {
    resposta.status(erro.codigo || 500).json({
      erro: 'ERRO_BUSCAR_UNIDADE',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: requisicao.path
    })
  }
}

export const criar = async (
  requisicao: Request,
  resposta: Response
): Promise<void> => {
  try {
    const { nome, endereco, cidade } = requisicao.body

    if (!nome || !endereco || !cidade) {
      resposta.status(400).json({
        erro: 'DADOS_INVALIDOS',
        mensagem: 'Nome, endereço e cidade são obrigatórios.',
        detalhes: [],
        timestamp: new Date().toISOString(),
        caminho: requisicao.path
      })
      return
    }

    const unidade = await cadastrarUnidade({ nome, endereco, cidade })
    resposta.status(201).json(unidade)
  } catch (erro: any) {
    resposta.status(erro.codigo || 500).json({
      erro: 'ERRO_CRIAR_UNIDADE',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: requisicao.path
    })
  }
}

export const atualizar = async (
  requisicao: Request,
  resposta: Response
): Promise<void> => {
  try {
    const id = Number(requisicao.params.id)
    const dados = requisicao.body
    const unidade = await editarUnidade(id, dados)
    resposta.status(200).json(unidade)
  } catch (erro: any) {
    resposta.status(erro.codigo || 500).json({
      erro: 'ERRO_ATUALIZAR_UNIDADE',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: requisicao.path
    })
  }
}