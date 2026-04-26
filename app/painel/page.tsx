'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const SENHA = '1234'

export default function Painel() {
  const [logado, setLogado] = useState(false)
  const [senha, setSenha] = useState('')
  const [agendamentos, setAgendamentos] = useState<any[]>([])
  const [filtroData, setFiltroData] = useState('')

  async function buscarAgendamentos() {
    let query = supabase.from('agendamentos').select('*').order('data').order('horario')
    if (filtroData) query = query.eq('data', filtroData)
    const { data } = await query
    setAgendamentos(data || [])
  }

  useEffect(() => {
    if (logado) buscarAgendamentos()
  }, [logado, filtroData])

  async function atualizarStatus(id: number, status: string) {
    await supabase.from('agendamentos').update({ status }).eq('id', id)
    buscarAgendamentos()
  }

  if (!logado) {
    return (
      <main className="min-h-screen bg-[#0E0E0F] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-light tracking-[0.2em] text-[#EDE8DE]">PAINEL</h1>
            <p className="text-[#C9A84C] tracking-[0.4em] text-xs mt-1">DO BARBEIRO</p>
          </div>
          <div className="border border-[#C9A84C26] p-8 bg-[#161618]">
            <label className="text-xs tracking-[0.2em] text-[#8A8070] uppercase block mb-2">Senha</label>
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && senha === SENHA && setLogado(true)}
              placeholder="Digite a senha" className="w-full bg-[#1E1E21] border border-[#C9A84C26] text-[#EDE8DE] px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors mb-4"/>
            <button onClick={() => senha === SENHA ? setLogado(true) : alert('Senha incorreta!')}
              className="w-full bg-[#C9A84C] text-[#0E0E0F] py-3 text-xs tracking-[0.3em] hover:bg-[#E2C07A] transition-colors">
              ENTRAR
            </button>
          </div>
        </div>
      </main>
    )
  }

  const pendentes = agendamentos.filter(a => a.status === 'pendente').length
  const confirmados = agendamentos.filter(a => a.status === 'confirmado').length

  return (
    <main className="min-h-screen bg-[#0E0E0F] text-[#EDE8DE]">
      <header className="border-b border-[#C9A84C1A] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-light tracking-[0.2em]">PAINEL DO BARBEIRO</h1>
          <p className="text-xs text-[#8A8070] tracking-[0.1em]">Barbearia Do Bigode</p>
        </div>
        <button onClick={() => setLogado(false)} className="text-xs text-[#8A8070] hover:text-[#C9A84C] tracking-[0.2em] transition-colors">
          SAIR
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">

        <div className="grid grid-cols-3 gap-px bg-[#C9A84C1A] mb-8">
          <div className="bg-[#161618] p-6 text-center">
            <p className="text-3xl font-light text-[#C9A84C]">{agendamentos.length}</p>
            <p className="text-xs text-[#8A8070] tracking-[0.2em] mt-1">TOTAL</p>
          </div>
          <div className="bg-[#161618] p-6 text-center">
            <p className="text-3xl font-light text-yellow-400">{pendentes}</p>
            <p className="text-xs text-[#8A8070] tracking-[0.2em] mt-1">PENDENTES</p>
          </div>
          <div className="bg-[#161618] p-6 text-center">
            <p className="text-3xl font-light text-green-400">{confirmados}</p>
            <p className="text-xs text-[#8A8070] tracking-[0.2em] mt-1">CONFIRMADOS</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <label className="text-xs tracking-[0.2em] text-[#8A8070] uppercase">Filtrar por data:</label>
          <input type="date" value={filtroData} onChange={e => setFiltroData(e.target.value)}
            className="bg-[#161618] border border-[#C9A84C26] text-[#EDE8DE] px-4 py-2 text-sm outline-none focus:border-[#C9A84C] transition-colors"/>
          {filtroData && <button onClick={() => setFiltroData('')} className="text-xs text-[#8A8070] hover:text-[#C9A84C] transition-colors">Limpar</button>}
        </div>

        <div className="space-y-px">
          {agendamentos.length === 0 ? (
            <div className="bg-[#161618] p-12 text-center text-[#8A8070] text-sm">
              Nenhum agendamento encontrado.
            </div>
          ) : agendamentos.map(a => (
            <div key={a.id} className="bg-[#161618] p-6 flex items-center justify-between hover:bg-[#1E1E21] transition-colors">
              <div className="flex gap-8">
                <div>
                  <p className="text-sm font-medium">{a.nome}</p>
                  <p className="text-xs text-[#8A8070] mt-1">📱 {a.telefone}</p>
                </div>
                <div>
                  <p className="text-sm text-[#C9A84C]">{a.servico}</p>
                  <p className="text-xs text-[#8A8070] mt-1">📅 {a.data} às {a.horario}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-3 py-1 tracking-[0.1em] ${
                  a.status === 'confirmado' ? 'bg-green-900 text-green-300' :
                  a.status === 'cancelado' ? 'bg-red-900 text-red-300' :
                  'bg-yellow-900 text-yellow-300'}`}>
                  {a.status.toUpperCase()}
                </span>
                {a.status === 'pendente' && (
                  <>
                    <button onClick={() => atualizarStatus(a.id, 'confirmado')}
                      className="text-xs bg-green-800 text-green-300 px-3 py-1 hover:bg-green-700 transition-colors">
                      ✓ Confirmar
                    </button>
                    <button onClick={() => atualizarStatus(a.id, 'cancelado')}
                      className="text-xs bg-red-800 text-red-300 px-3 py-1 hover:bg-red-700 transition-colors">
                      ✗ Cancelar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
