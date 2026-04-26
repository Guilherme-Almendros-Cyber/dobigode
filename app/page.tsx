'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [servico, setServico] = useState('')
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const [carregando, setCarregando] = useState(false)

  async function confirmarAgendamento() {
    if (!nome || !telefone || !servico || !data || !horario) {
      alert('Por favor, preencha todos os campos e selecione um horário!')
      return
    }
    setCarregando(true)
    const { error } = await supabase.from('agendamentos').insert([
      { nome, telefone, servico, data, horario, status: 'pendente' }
    ])
    setCarregando(false)
    if (error) {
      alert('Erro ao agendar. Tente novamente!')
      console.error(error)
    } else {
      setSucesso(true)
    }
  }

  if (sucesso) {
    return (
      <main className="min-h-screen bg-[#0E0E0F] text-[#EDE8DE] flex items-center justify-center px-4">
        <div className="text-center border border-[#C9A84C33] p-16 max-w-md">
          <div className="text-5xl mb-6">✅</div>
          <h2 className="text-3xl font-light text-[#C9A84C] mb-4">Agendamento Confirmado!</h2>
          <p className="text-[#8A8070] mb-2"><strong className="text-[#EDE8DE]">{nome}</strong>, seu horário está reservado!</p>
          <p className="text-[#8A8070] mb-1">📅 {data}</p>
          <p className="text-[#8A8070] mb-1">🕐 {horario}</p>
          <p className="text-[#8A8070] mb-8">💈 {servico}</p>
          <button onClick={() => { setSucesso(false); setNome(''); setTelefone(''); setServico(''); setData(''); setHorario('') }}
            className="border border-[#C9A84C] text-[#C9A84C] px-8 py-3 text-xs tracking-[0.3em] hover:bg-[#C9A84C] hover:text-[#0E0E0F] transition-all">
            NOVO AGENDAMENTO
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0E0E0F] text-[#EDE8DE]">
      
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <div className="w-44 h-44 rounded-full bg-[#161618] border border-[#C9A84C33] flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(201,168,76,0.1)]">
          <img src="/logo.jpg" alt="Barbearia Do Bigode" className="w-36 h-36 object-contain rounded-full"/>
        </div>
        <h1 className="text-4xl md:text-6xl font-light tracking-[0.15em] text-center mb-2">BARBEARIA</h1>
        <p className="text-[#C9A84C] tracking-[0.5em] text-sm mb-8">DO &nbsp; BIGODE</p>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"></div>
          <div className="w-1.5 h-1.5 bg-[#C9A84C] rotate-45"></div>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"></div>
        </div>
        <p className="text-[#8A8070] tracking-[0.2em] text-sm mb-12">Arte, Estilo & Tradição</p>
        <a href="#agendar" className="border border-[#C9A84C] text-[#C9A84C] px-12 py-4 text-xs tracking-[0.3em] hover:bg-[#C9A84C] hover:text-[#0E0E0F] transition-all duration-300">
          AGENDAR HORÁRIO
        </a>
      </section>

      <section className="py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase">Nossos Serviços</span>
          <h2 className="text-4xl font-light mt-3">O que fazemos <em className="text-[#E2C07A] not-italic">melhor</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#C9A84C1A]">
          {[
            { icon: "✂️", nome: "Corte Clássico", desc: "Tesoura ou máquina, do seu jeito. Com lavagem e finalização.", preco: "R$ 35", tempo: "45 min" },
            { icon: "🪒", nome: "Barba Tradicional", desc: "Navalha quente, toalha e produtos premium. A experiência completa.", preco: "R$ 30", tempo: "30 min" },
            { icon: "💈", nome: "Combo Completo", desc: "Corte + Barba com desconto especial. Sai renovado do zero.", preco: "R$ 55", tempo: "75 min" },
            { icon: "👑", nome: "Tratamento Premium", desc: "Hidratação capilar, alisamento e pigmentação para barba.", preco: "R$ 70", tempo: "60 min" },
          ].map((s) => (
            <div key={s.nome} className="bg-[#161618] p-10 hover:bg-[#1E1E21] transition-colors">
              <span className="text-3xl mb-4 block">{s.icon}</span>
              <h3 className="text-sm tracking-[0.1em] mb-2">{s.nome}</h3>
              <p className="text-[#8A8070] text-sm leading-relaxed mb-6">{s.desc}</p>
              <span className="text-[#C9A84C] text-2xl font-light">{s.preco} <span className="text-xs text-[#8A8070]">/ {s.tempo}</span></span>
            </div>
          ))}
        </div>
      </section>

      <section id="agendar" className="py-24 px-4 bg-[#161618] border-y border-[#C9A84C1A]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase">Agendamento Online</span>
            <h2 className="text-4xl font-light mt-3">Reserve seu <em className="text-[#E2C07A] not-italic">horário</em></h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="text-xs tracking-[0.2em] text-[#8A8070] uppercase block mb-2">Nome completo</label>
              <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="João Silva" className="w-full bg-[#1E1E21] border border-[#C9A84C26] text-[#EDE8DE] px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors"/>
            </div>
            <div>
              <label className="text-xs tracking-[0.2em] text-[#8A8070] uppercase block mb-2">WhatsApp</label>
              <input type="tel" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(11) 99999-9999" className="w-full bg-[#1E1E21] border border-[#C9A84C26] text-[#EDE8DE] px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors"/>
            </div>
            <div>
              <label className="text-xs tracking-[0.2em] text-[#8A8070] uppercase block mb-2">Serviço</label>
              <select value={servico} onChange={e => setServico(e.target.value)} className="w-full bg-[#1E1E21] border border-[#C9A84C26] text-[#EDE8DE] px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors">
                <option value="">Selecione...</option>
                <option>Corte Clássico – R$35</option>
                <option>Barba Tradicional – R$30</option>
                <option>Combo Completo – R$55</option>
                <option>Tratamento Premium – R$70</option>
              </select>
            </div>
            <div>
              <label className="text-xs tracking-[0.2em] text-[#8A8070] uppercase block mb-2">Data</label>
              <input type="date" value={data} onChange={e => setData(e.target.value)} className="w-full bg-[#1E1E21] border border-[#C9A84C26] text-[#EDE8DE] px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors"/>
            </div>
            <div>
              <label className="text-xs tracking-[0.2em] text-[#8A8070] uppercase block mb-2">Horário</label>
              <div className="grid grid-cols-4 gap-2">
                {["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30","15:00","15:30","16:00","16:30"].map((h) => (
                  <button key={h} onClick={() => setHorario(h)}
                    className={`py-2 text-xs border transition-all ${horario === h ? 'bg-[#C9A84C] border-[#C9A84C] text-[#0E0E0F]' : 'bg-[#1E1E21] border-[#C9A84C26] text-[#8A8070] hover:border-[#C9A84C] hover:text-[#C9A84C]'}`}>
                    {h}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={confirmarAgendamento} disabled={carregando}
              className="w-full bg-[#C9A84C] text-[#0E0E0F] py-4 text-xs tracking-[0.3em] hover:bg-[#E2C07A] transition-colors mt-4 disabled:opacity-50">
              {carregando ? 'AGUARDE...' : 'CONFIRMAR AGENDAMENTO'}
            </button>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center border-t border-[#C9A84C0D]">
        <p className="text-xs tracking-[0.3em] text-[#8A8070]">BARBEARIA DO BIGODE</p>
        <p className="text-xs text-[#8A8070] opacity-40 mt-1">© 2026 · Todos os direitos reservados</p>
        <div className="flex flex-col items-center mt-6 opacity-50 hover:opacity-100 transition-opacity">
          <p className="text-[10px] text-[#8A8070] tracking-[0.2em] mb-2">DESENVOLVIDO POR</p>
          <img src="/mt.png" alt="Machine Technology" className="w-24 h-24 object-contain rounded-lg"/>
        </div>
      </footer>

    </main>
  )
}