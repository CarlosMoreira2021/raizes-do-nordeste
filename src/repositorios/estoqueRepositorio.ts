import clientePrisma from '../utilitarios/clientePrisma'

export const buscarEstoque = async (unidadeId: number, produtoId: number) => {
  return await clientePrisma.estoque.findUnique({
    where: { unidadeId_produtoId: { unidadeId, produtoId } },
    include: { produto: true, unidade: true }
  })
}

export const listarEstoquePorUnidade = async (unidadeId: number) => {
  return await clientePrisma.estoque.findMany({
    where: { unidadeId },
    include: { produto: true }
  })
}

export const criarOuAtualizarEstoque = async (
  unidadeId: number,
  produtoId: number,
  quantidade: number
) => {
  return await clientePrisma.estoque.upsert({
    where: { unidadeId_produtoId: { unidadeId, produtoId } },
    update: { quantidade },
    create: { unidadeId, produtoId, quantidade }
  })
}

export const decrementarEstoque = async (
  unidadeId: number,
  produtoId: number,
  quantidade: number
) => {
  return await clientePrisma.estoque.update({
    where: { unidadeId_produtoId: { unidadeId, produtoId } },
    data: { quantidade: { decrement: quantidade } }
  })
}