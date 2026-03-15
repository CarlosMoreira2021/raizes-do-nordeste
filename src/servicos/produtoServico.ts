import {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto
} from '../repositorios/produtoRepositorio'

export const obterProdutos = async (page: number, limit: number) => {
  return await listarProdutos(page, limit)
}

export const obterProdutoPorId = async (id: number) => {
  const produto = await buscarProdutoPorId(id)
  if (!produto) throw { codigo: 404, mensagem: 'Produto não encontrado.' }
  return produto
}

export const cadastrarProduto = async (dados: {
  nome: string
  descricao?: string
  preco: number
  categoria: string
}) => {
  return await criarProduto(dados)
}

export const editarProduto = async (id: number, dados: {
  nome?: string
  descricao?: string
  preco?: number
  categoria?: string
  ativo?: boolean
}) => {
  await obterProdutoPorId(id)
  return await atualizarProduto(id, dados)
}