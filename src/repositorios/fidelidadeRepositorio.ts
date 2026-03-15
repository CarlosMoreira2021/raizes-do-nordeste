import clientePrisma from '../utilitarios/clientePrisma'

export const buscarFidelidadePorUsuario = async (usuarioId: number) => {
  return await clientePrisma.fidelidade.findUnique({
    where: { usuarioId },
    include: {
      historico: {
        orderBy: { criadoEm: 'desc' },
        take: 10
      }
    }
  })
}

export const resgatarPontos = async (usuarioId: number, pontos: number) => {
  return await clientePrisma.fidelidade.update({
    where: { usuarioId },
    data: {
      pontos: { decrement: pontos },
      historico: {
        create: {
          pontos,
          tipo: 'RESGATE',
          descricao: `Resgate de ${pontos} pontos`
        }
      }
    }
  })
}