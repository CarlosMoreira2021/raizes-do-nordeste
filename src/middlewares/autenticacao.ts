import { Request, Response, NextFunction } from 'express'
import { verificarToken } from '../utilitarios/jwt'

// Extende o Request do Express para incluir o usuário autenticado
declare global {
  namespace Express {
    interface Request {
      usuarioAutenticado?: {
        id: number
        email: string
        perfil: string
      }
    }
  }
}

// Verifica se o token JWT é válido
export const autenticar = (
  requisicao: Request,
  resposta: Response,
  proximo: NextFunction
): void => {
  const cabecalho = requisicao.headers.authorization

  if (!cabecalho || !cabecalho.startsWith('Bearer ')) {
    resposta.status(401).json({
      erro: 'NAO_AUTENTICADO',
      mensagem: 'Token não fornecido.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: requisicao.path
    })
    return
  }

  const token = cabecalho.split(' ')[1]

  try {
    const dados = verificarToken(token)
    requisicao.usuarioAutenticado = dados
    proximo()
  } catch {
    resposta.status(401).json({
      erro: 'TOKEN_INVALIDO',
      mensagem: 'Token inválido ou expirado.',
      detalhes: [],
      timestamp: new Date().toISOString(),
      caminho: requisicao.path
    })
  }
}

// Verifica se o usuário tem o perfil necessário
export const autorizar = (...perfisPermitidos: string[]) => {
  return (
    requisicao: Request,
    resposta: Response,
    proximo: NextFunction
  ): void => {
    const usuario = requisicao.usuarioAutenticado

    if (!usuario) {
      resposta.status(401).json({
        erro: 'NAO_AUTENTICADO',
        mensagem: 'Usuário não autenticado.',
        detalhes: [],
        timestamp: new Date().toISOString(),
        caminho: requisicao.path
      })
      return
    }

    if (!perfisPermitidos.includes(usuario.perfil)) {
      resposta.status(403).json({
        erro: 'SEM_PERMISSAO',
        mensagem: 'Você não tem permissão para acessar este recurso.',
        detalhes: [],
        timestamp: new Date().toISOString(),
        caminho: requisicao.path
      })
      return
    }

    proximo()
  }
}