/**
 * MÓDULO DE PROMOÇÕES E CAMPANHAS
 * 
 * Regras de negócio para aplicação de promoções:
 * 
 * 1. DESCONTO POR QUANTIDADE: Se o cliente comprar 3 ou mais itens do mesmo produto,
 *    recebe 10% de desconto nesse produto.
 * 
 * 2. COMBO: Se o pedido contiver um lanche + uma bebida, aplica 5% de desconto no total.
 * 
 * 3. FIDELIDADE: Se o cliente tiver mais de 100 pontos, recebe 5% de desconto no pedido.
 * 
 * 4. CAMPANHA NORDESTE: Toda sexta-feira, todos os pratos têm 15% de desconto.
 * 
 * Em produção, essas regras seriam configuráveis via banco de dados,
 * permitindo que o gerente crie e gerencie campanhas sem alterar o código.
 */

interface ItemPedido {
  produtoId: number
  quantidade: number
  precoUnitario: number
  categoria?: string
}

interface ResultadoPromocao {
  descontoAplicado: boolean
  percentualDesconto: number
  descricao: string
  totalOriginal: number
  totalComDesconto: number
}

export const calcularPromocao = (
  itens: ItemPedido[],
  totalOriginal: number,
  pontosFidelidade: number = 0
): ResultadoPromocao => {
  let percentualDesconto = 0
  const descontosAplicados: string[] = []

  // Regra 1: Desconto por quantidade
  for (const item of itens) {
    if (item.quantidade >= 3) {
      percentualDesconto += 10
      descontosAplicados.push(`10% de desconto por quantidade no produto ${item.produtoId}`)
      break
    }
  }

  // Regra 2: Combo lanche + bebida
  const temLanche = itens.some(i => i.categoria === 'Lanches')
  const temBebida = itens.some(i => i.categoria === 'Bebidas')
  if (temLanche && temBebida) {
    percentualDesconto += 5
    descontosAplicados.push('5% de desconto combo lanche + bebida')
  }

  // Regra 3: Fidelidade
  if (pontosFidelidade >= 100) {
    percentualDesconto += 5
    descontosAplicados.push('5% de desconto por fidelidade')
  }

  // Regra 4: Campanha Nordeste (sexta-feira)
  const hoje = new Date()
  if (hoje.getDay() === 5) {
    percentualDesconto += 15
    descontosAplicados.push('15% Campanha Nordeste (sexta-feira)')
  }

  // Limite máximo de desconto: 30%
  percentualDesconto = Math.min(percentualDesconto, 30)

  const totalComDesconto = totalOriginal * (1 - percentualDesconto / 100)

  return {
    descontoAplicado: percentualDesconto > 0,
    percentualDesconto,
    descricao: descontosAplicados.join(', ') || 'Nenhuma promoção aplicável',
    totalOriginal,
    totalComDesconto: Number(totalComDesconto.toFixed(2))
  }
}

export const listarPromocoesAtivas = () => {
  const hoje = new Date()
  const promocoes = [
    {
      id: 1,
      nome: 'Desconto por Quantidade',
      descricao: 'Compre 3 ou mais itens do mesmo produto e ganhe 10% de desconto',
      percentual: 10,
      ativa: true
    },
    {
      id: 2,
      nome: 'Combo Nordestino',
      descricao: 'Peça um lanche + bebida e ganhe 5% de desconto',
      percentual: 5,
      ativa: true
    },
    {
      id: 3,
      nome: 'Desconto Fidelidade',
      descricao: 'Clientes com 100+ pontos ganham 5% de desconto',
      percentual: 5,
      ativa: true
    },
    {
      id: 4,
      nome: 'Campanha Nordeste',
      descricao: 'Toda sexta-feira, 15% de desconto em todos os pratos',
      percentual: 15,
      ativa: hoje.getDay() === 5
    }
  ]

  return promocoes
}