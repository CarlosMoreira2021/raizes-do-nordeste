import clientePrisma from '../utilitarios/clientePrisma'

export const encontrarUsuarioPorEmail = async (email: string) => {
  return await clientePrisma.usuario.findUnique({
    where: { email }
  })
}

export const criarUsuario = async (dados: {
  nome: string
  email: string
  senha: string
}) => {
  return await clientePrisma.usuario.create({
    data: {
      ...dados,
      fidelidade: {
        create: {
          pontos: 0
        }
      }
    },
    select: {
      id: true,
      nome: true,
      email: true,
      perfil: true,
      criadoEm: true
    }
  })
}