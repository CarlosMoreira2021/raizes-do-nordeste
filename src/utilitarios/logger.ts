import fs from 'fs'
import path from 'path'

const pastaLogs = path.join(process.cwd(), 'logs')

// Cria a pasta logs se não existir
if (!fs.existsSync(pastaLogs)) {
  fs.mkdirSync(pastaLogs)
}

const formatarData = () => new Date().toISOString()

export const registrarLog = (nivel: 'INFO' | 'ERRO' | 'AUDITORIA', mensagem: string, dados?: any) => {
  const entrada = {
    timestamp: formatarData(),
    nivel,
    mensagem,
    dados: dados || null
  }

  const linha = JSON.stringify(entrada) + '\n'

  // Salva no arquivo
  const arquivo = path.join(pastaLogs, `${new Date().toISOString().split('T')[0]}.log`)
  fs.appendFileSync(arquivo, linha)

  // Também mostra no terminal
  console.log(`[${entrada.timestamp}] [${nivel}] ${mensagem}`, dados ? JSON.stringify(dados) : '')
}

export const auditoria = (acao: string, usuarioId: number, dados?: any) => {
  registrarLog('AUDITORIA', acao, { usuarioId, ...dados })
}