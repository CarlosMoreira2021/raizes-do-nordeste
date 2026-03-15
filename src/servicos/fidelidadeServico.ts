import { buscarFidelidadePorUsuario, resgatarPontos } from '../repositorios/fidelidadeRepositorio'

export const obterFidelidade = async (usuarioId: number) => {
  const fidelidade = await buscarFidelidadePorUsuario(usuarioId)
  if (!fidelidade) {
    return { pontos: 0, historico: [] }
  }
  return fidelidade
}

export const realizarResgate = async (usuarioId: number, pontos: number) => {
  const fidelidade = await buscarFidelidadePorUsuario(usuarioId)

  if (!fidelidade || fidelidade.pontos < pontos) {
    throw { codigo: 409, mensagem: 'Pontos insuficientes para resgate.' }
  }

  if (pontos <= 0) {
    throw { codigo: 422, mensagem: 'Quantidade de pontos deve ser maior que zero.' }
  }

  return await resgatarPontos(usuarioId, pontos)
}