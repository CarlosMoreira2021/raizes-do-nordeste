import {
  listarUnidades,
  buscarUnidadePorId,
  criarUnidade,
  atualizarUnidade
} from '../repositorios/unidadeRepositorio'

export const obterUnidades = async () => {
  return await listarUnidades()
}

export const obterUnidadePorId = async (id: number) => {
  const unidade = await buscarUnidadePorId(id)

  if (!unidade) {
    throw { codigo: 404, mensagem: 'Unidade não encontrada.' }
  }

  return unidade
}

export const cadastrarUnidade = async (dados: {
  nome: string
  endereco: string
  cidade: string
}) => {
  return await criarUnidade(dados)
}

export const editarUnidade = async (id: number, dados: {
  nome?: string
  endereco?: string
  cidade?: string
  ativo?: boolean
}) => {
  await obterUnidadePorId(id)
  return await atualizarUnidade(id, dados)
}