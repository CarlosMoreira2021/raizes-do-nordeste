import { Request, Response } from 'express'
import { registrarUsuario, loginUsuario } from '../servicos/autenticacaoServico'

export const registrar = async (
  requisicao: Request,
  resposta: Response
): Promise<void> => {
  try {
    const { nome, email, senha } = requisicao.body

    if (!nome || !email || !senha) {
      resposta.status(400).json({
        erro: 'DADOS_INVALIDOS',
        mensagem: 'Nome, email e senha são obrigatórios.',
        detalhes: [],
        timestamp: new Date().toISOString(),
        caminho: requisicao.path
      })
      return
    }

    const usuario = await registrarUsuario({ nome, email, senha })
    resposta.status(201).json(usuario)
  } catch (erro: any) {
    console.log('ERRO REGISTRO:', erro)
    resposta.status(erro.codigo || 500).json({
      erro: 'ERRO_REGISTRO',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: requisicao.path
    })
  }
}

export const login = async (
  requisicao: Request,
  resposta: Response
): Promise<void> => {
  try {
    const { email, senha } = requisicao.body

    if (!email || !senha) {
      resposta.status(400).json({
        erro: 'DADOS_INVALIDOS',
        mensagem: 'Email e senha são obrigatórios.',
        detalhes: [],
        timestamp: new Date().toISOString(),
        caminho: requisicao.path
      })
      return
    }

    const resultado = await loginUsuario({ email, senha })
    resposta.status(200).json(resultado)
  } catch (erro: any) {
    console.log('ERRO LOGIN:', erro)
    resposta.status(erro.codigo || 500).json({
      erro: 'ERRO_LOGIN',
      mensagem: erro.mensagem || 'Erro interno do servidor.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: requisicao.path
    })
  }
}