import {
  buscarEstoque,
  listarEstoquePorUnidade,
  criarOuAtualizarEstoque,
  decrementarEstoque
} from '../repositorios/estoqueRepositorio'

export const obterEstoquePorUnidade = async (unidadeId: number) => {
  return await listarEstoquePorUnidade(unidadeId)
}

export const movimentarEstoque = async (
  unidadeId: number,
  produtoId: number,
  quantidade: number,
  tipo: 'ENTRADA' | 'SAIDA'
) => {
  const estoqueAtual = await buscarEstoque(unidadeId, produtoId)

  if (tipo === 'SAIDA') {
    if (!estoqueAtual || estoqueAtual.quantidade < quantidade) {
      throw { codigo: 409, mensagem: 'Estoque insuficiente.' }
    }
    return await decrementarEstoque(unidadeId, produtoId, quantidade)
  }

  const novaQuantidade = (estoqueAtual?.quantidade || 0) + quantidade
  return await criarOuAtualizarEstoque(unidadeId, produtoId, novaQuantidade)
}

export const verificarDisponibilidade = async (
  unidadeId: number,
  produtoId: number,
  quantidade: number
) => {
  const estoque = await buscarEstoque(unidadeId, produtoId)
  if (!estoque || estoque.quantidade < quantidade) {
    throw { codigo: 409, mensagem: 'Estoque insuficiente para o produto solicitado.' }
  }
  return estoque
}