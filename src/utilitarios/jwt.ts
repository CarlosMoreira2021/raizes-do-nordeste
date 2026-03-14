import jwt, { SignOptions } from 'jsonwebtoken'

const SEGREDO = process.env.JWT_SEGREDO || 'segredo_padrao'

interface CargoToken {
  id: number
  email: string
  perfil: string
}

export const gerarToken = (dados: CargoToken): string => {
  const opcoes: SignOptions = { expiresIn: 86400 }
  return jwt.sign(dados, SEGREDO, opcoes)
}

export const verificarToken = (token: string): CargoToken => {
  return jwt.verify(token, SEGREDO) as CargoToken
}