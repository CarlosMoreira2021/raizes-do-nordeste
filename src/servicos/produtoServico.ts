import {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto
} from '../repositorios/produtoRepositorio'
import clientePrisma from '../utilitarios/clientePrisma'

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
  // Verifica se já existe produto com mesmo nome
  const existente = await clientePrisma.produto.findFirst({
    where: { nome: dados.nome, ativo: true }
  })

  if (existente) {
    throw { codigo: 409, mensagem: 'Já existe um produto com esse nome.' }
  }

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