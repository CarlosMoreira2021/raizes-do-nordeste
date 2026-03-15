import swaggerJsdoc from 'swagger-jsdoc'

const opcoes = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Raízes do Nordeste',
      version: '1.0.0',
      description: 'API REST para gerenciamento da rede de lanchonetes Raízes do Nordeste',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Auth', description: 'Autenticação e registro' },
      { name: 'Unidades', description: 'Gestão de unidades da rede' },
      { name: 'Produtos', description: 'Gestão do cardápio' },
      { name: 'Estoque', description: 'Controle de estoque por unidade' },
      { name: 'Pedidos', description: 'Gestão de pedidos' },
      { name: 'Pagamentos', description: 'Processamento de pagamentos mock' },
      { name: 'Fidelidade', description: 'Programa de fidelidade' },
      { name: 'Promoções', description: 'Gestão de promoções e campanhas' }
    ],
    paths: {
      '/saude': {
        get: {
          tags: ['Auth'],
          summary: 'Verificar saúde da API',
          security: [],
          responses: {
            '200': { description: 'API funcionando' }
          }
        }
      },
      '/auth/registrar': {
        post: {
          tags: ['Auth'],
          summary: 'Registrar novo usuário',
          security: [],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['nome', 'email', 'senha'],
                  properties: {
                    nome: { type: 'string', example: 'Carlos Moreira' },
                    email: { type: 'string', example: 'carlos@teste.com' },
                    senha: { type: 'string', example: 'Senha@123' }
                  }
                }
              }
            }
          },
          responses: {
            '201': { description: 'Usuário criado com sucesso' },
            '409': { description: 'Email já cadastrado' }
          }
        }
      },
      '/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login do usuário',
          security: [],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'senha'],
                  properties: {
                    email: { type: 'string', example: 'admin@raizes.com' },
                    senha: { type: 'string', example: 'Admin@123' }
                  }
                }
              }
            }
          },
          responses: {
            '200': { description: 'Login realizado com sucesso' },
            '401': { description: 'Credenciais inválidas' }
          }
        }
      },
      '/unidades': {
        get: {
          tags: ['Unidades'],
          summary: 'Listar todas as unidades',
          responses: {
            '200': { description: 'Lista de unidades' },
            '401': { description: 'Não autenticado' }
          }
        },
        post: {
          tags: ['Unidades'],
          summary: 'Criar nova unidade (ADMIN/GERENTE)',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['nome', 'endereco', 'cidade'],
                  properties: {
                    nome: { type: 'string', example: 'Raízes do Nordeste - Centro' },
                    endereco: { type: 'string', example: 'Rua das Flores, 123' },
                    cidade: { type: 'string', example: 'Fortaleza' }
                  }
                }
              }
            }
          },
          responses: {
            '201': { description: 'Unidade criada' },
            '403': { description: 'Sem permissão' }
          }
        }
      },
      '/unidades/{id}': {
        get: {
          tags: ['Unidades'],
          summary: 'Buscar unidade por ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            '200': { description: 'Unidade encontrada' },
            '404': { description: 'Unidade não encontrada' }
          }
        },
        patch: {
          tags: ['Unidades'],
          summary: 'Atualizar unidade (ADMIN/GERENTE)',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nome: { type: 'string' },
                    endereco: { type: 'string' },
                    cidade: { type: 'string' },
                    ativo: { type: 'boolean' }
                  }
                }
              }
            }
          },
          responses: {
            '200': { description: 'Unidade atualizada' },
            '404': { description: 'Unidade não encontrada' }
          }
        }
      },
      '/produtos': {
        get: {
          tags: ['Produtos'],
          summary: 'Listar produtos com paginação',
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer', example: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', example: 10 } }
          ],
          responses: {
            '200': { description: 'Lista de produtos' }
          }
        },
        post: {
          tags: ['Produtos'],
          summary: 'Criar novo produto (ADMIN/GERENTE)',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['nome', 'preco', 'categoria'],
                  properties: {
                    nome: { type: 'string', example: 'X-Nordestino' },
                    descricao: { type: 'string', example: 'Hamburguer com carne de sol' },
                    preco: { type: 'number', example: 32.90 },
                    categoria: { type: 'string', example: 'Lanches' }
                  }
                }
              }
            }
          },
          responses: {
            '201': { description: 'Produto criado' },
            '409': { description: 'Produto já existe' }
          }
        }
      },
      '/produtos/{id}': {
        get: {
          tags: ['Produtos'],
          summary: 'Buscar produto por ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            '200': { description: 'Produto encontrado' },
            '404': { description: 'Produto não encontrado' }
          }
        },
        patch: {
          tags: ['Produtos'],
          summary: 'Atualizar produto (ADMIN/GERENTE)',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            '200': { description: 'Produto atualizado' }
          }
        }
      },
      '/estoque/movimentar': {
        post: {
          tags: ['Estoque'],
          summary: 'Movimentar estoque (ADMIN/GERENTE)',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['unidadeId', 'produtoId', 'quantidade', 'tipo'],
                  properties: {
                    unidadeId: { type: 'integer', example: 1 },
                    produtoId: { type: 'integer', example: 1 },
                    quantidade: { type: 'integer', example: 50 },
                    tipo: { type: 'string', enum: ['ENTRADA', 'SAIDA'] }
                  }
                }
              }
            }
          },
          responses: {
            '200': { description: 'Estoque movimentado' },
            '409': { description: 'Estoque insuficiente' }
          }
        }
      },
      '/estoque/unidade/{unidadeId}': {
        get: {
          tags: ['Estoque'],
          summary: 'Consultar estoque por unidade',
          parameters: [
            { name: 'unidadeId', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            '200': { description: 'Estoque da unidade' }
          }
        }
      },
      '/pedidos': {
        post: {
          tags: ['Pedidos'],
          summary: 'Criar novo pedido',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['unidadeId', 'canalPedido', 'itens'],
                  properties: {
                    unidadeId: { type: 'integer', example: 1 },
                    canalPedido: { type: 'string', enum: ['APP', 'TOTEM', 'BALCAO', 'PICKUP', 'WEB'] },
                    itens: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          produtoId: { type: 'integer', example: 1 },
                          quantidade: { type: 'integer', example: 2 }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          responses: {
            '201': { description: 'Pedido criado' },
            '409': { description: 'Estoque insuficiente' },
            '422': { description: 'Canal inválido' }
          }
        },
        get: {
          tags: ['Pedidos'],
          summary: 'Listar pedidos com filtros',
          parameters: [
            { name: 'canalPedido', in: 'query', schema: { type: 'string', enum: ['APP', 'TOTEM', 'BALCAO', 'PICKUP', 'WEB'] } },
            { name: 'status', in: 'query', schema: { type: 'string' } },
            { name: 'page', in: 'query', schema: { type: 'integer' } },
            { name: 'limit', in: 'query', schema: { type: 'integer' } }
          ],
          responses: {
            '200': { description: 'Lista de pedidos' }
          }
        }
      },
      '/pedidos/{id}': {
        get: {
          tags: ['Pedidos'],
          summary: 'Buscar pedido por ID',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            '200': { description: 'Pedido encontrado' },
            '404': { description: 'Pedido não encontrado' }
          }
        }
      },
      '/pedidos/{id}/status': {
        patch: {
          tags: ['Pedidos'],
          summary: 'Atualizar status do pedido (ADMIN/GERENTE/COZINHA/ATENDENTE)',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', enum: ['PAGAMENTO_APROVADO', 'EM_PREPARO', 'PRONTO', 'ENTREGUE', 'CANCELADO'] }
                  }
                }
              }
            }
          },
          responses: {
            '200': { description: 'Status atualizado' }
          }
        }
      },
      '/pagamentos/processar': {
        post: {
          tags: ['Pagamentos'],
          summary: 'Processar pagamento mock',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['pedidoId', 'formaPagamento'],
                  properties: {
                    pedidoId: { type: 'integer', example: 1 },
                    formaPagamento: { type: 'string', enum: ['PIX', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 'DINHEIRO'] }
                  }
                }
              }
            }
          },
          responses: {
            '200': { description: 'Pagamento processado' },
            '409': { description: 'Pedido não aguarda pagamento' }
          }
        }
      },
      '/pagamentos/pedido/{pedidoId}': {
        get: {
          tags: ['Pagamentos'],
          summary: 'Buscar pagamento por pedido',
          parameters: [
            { name: 'pedidoId', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            '200': { description: 'Pagamento encontrado' },
            '404': { description: 'Pagamento não encontrado' }
          }
        }
      },
      '/fidelidade/meu-saldo': {
        get: {
          tags: ['Fidelidade'],
          summary: 'Consultar saldo de pontos do usuário autenticado',
          responses: {
            '200': { description: 'Saldo e histórico de pontos' }
          }
        }
      },
      '/fidelidade/resgatar': {
        post: {
          tags: ['Fidelidade'],
          summary: 'Resgatar pontos de fidelidade',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    pontos: { type: 'integer', example: 50 }
                  }
                }
              }
            }
          },
          responses: {
            '200': { description: 'Pontos resgatados' },
            '409': { description: 'Pontos insuficientes' }
          }
        }
      },
      '/promocoes': {
        get: {
          tags: ['Promoções'],
          summary: 'Listar promoções ativas',
          responses: {
            '200': { description: 'Lista de promoções' }
          }
        }
      },
      '/promocoes/simular': {
        post: {
          tags: ['Promoções'],
          summary: 'Simular desconto em um pedido',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['itens', 'totalOriginal'],
                  properties: {
                    itens: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          produtoId: { type: 'integer', example: 1 },
                          quantidade: { type: 'integer', example: 3 },
                          precoUnitario: { type: 'number', example: 32.90 },
                          categoria: { type: 'string', example: 'Lanches' }
                        }
                      }
                    },
                    totalOriginal: { type: 'number', example: 111.60 },
                    pontosFidelidade: { type: 'integer', example: 120 }
                  }
                }
              }
            }
          },
          responses: {
            '200': { description: 'Simulação de desconto realizada' }
          }
        }
      }
    }
  },
  apis: []
}

export const especificacaoSwagger = swaggerJsdoc(opcoes)