import clientePrisma from '../utilitarios/clientePrisma'

export const listarUnidades = async () => {
  return await clientePrisma.unidade.findMany({
    where: { ativo: true },
    orderBy: { nome: 'asc' }
  })
}

export const buscarUnidadePorId = async (id: number) => {
  return await clientePrisma.unidade.findUnique({
    where: { id }
  })
}

export const criarUnidade = async (dados: {
  nome: string
  endereco: string
  cidade: string
}) => {
  return await clientePrisma.unidade.create({
    data: dados
  })
}

export const atualizarUnidade = async (id: number, dados: {
  nome?: string
  endereco?: string
  cidade?: string
  ativo?: boolean
}) => {
  return await clientePrisma.unidade.update({
    where: { id },
    data: dados
  })
}