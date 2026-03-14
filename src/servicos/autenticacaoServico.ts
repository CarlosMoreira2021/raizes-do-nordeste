import bcrypt from 'bcryptjs'
import { gerarToken } from '../utilitarios/jwt'
import {
  encontrarUsuarioPorEmail,
  criarUsuario
} from '../repositorios/usuarioRepositorio'

export const registrarUsuario = async (dados: {
  nome: string
  email: string
  senha: string
}) => {
  const usuarioExistente = await encontrarUsuarioPorEmail(dados.email)

  if (usuarioExistente) {
    throw { codigo: 409, mensagem: 'Este email já está cadastrado.' }
  }

  const senhaCriptografada = await bcrypt.hash(dados.senha, 10)

  const novoUsuario = await criarUsuario({
    ...dados,
    senha: senhaCriptografada
  })

  return novoUsuario
}

export const loginUsuario = async (dados: {
  email: string
  senha: string
}) => {
  try {
    const usuario = await encontrarUsuarioPorEmail(dados.email)

    if (!usuario) {
      throw { codigo: 401, mensagem: 'Email ou senha inválidos.' }
    }

    const senhaCorreta = await bcrypt.compare(dados.senha, usuario.senha)

    if (!senhaCorreta) {
      throw { codigo: 401, mensagem: 'Email ou senha inválidos.' }
    }

    const token = gerarToken({
      id: usuario.id,
      email: usuario.email,
      perfil: usuario.perfil
    })

    return {
      accessToken: token,
      tipoToken: 'Bearer',
      expiraEm: 86400,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
      }
    }
  } catch (erro) {
    console.log('ERRO LOGIN:', erro)
    throw erro
  }
}