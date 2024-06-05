import { useState, useEffect } from 'react'
import Form from './components/Form'
import LogoTLK from './assets/1-2-logo-white.svg'
import profissionaisData from './assets/dados.json'

function App() {
  const [profissionais, setProfissionais] = useState([])
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null)

  useEffect(() => {
    setProfissionais(profissionaisData)
  }, [])

  const handleProfissionalChange = (event) => {
    const profissionalId = parseInt(event.target.value)
    const profissionalSelecionado = profissionais.find(
      (profissional) => profissional.id === profissionalId
    )
    setProfissionalSelecionado(profissionalSelecionado)
  }

  return (
    <div className="m-5 p-2 border-sky-700 border-2 rounded-lg">
      <div className="bg-sky-500 min-h-10 w-full mb-5 py-5 px-20 text-white grid grid-cols-3 gap-4 place-items-center align-bottom rounded-lg">
        <label className="w-4/5">
          <select
            className="bg-white text-gray-700 rounded-lg h-10 w-full px-5"
            onChange={handleProfissionalChange}
          >
            <option value="">Selecione o Profissional</option>
            {profissionais.map((profissional) => (
              <option key={profissional.id} value={profissional.id}>
                {profissional.nome}
              </option>
            ))}
          </select>
        </label>
        <div className="text-center">
          <h2 className="text-4xl font-extrabold">TRIAGEM INICIAL INFANTIL</h2>
          <h4 className="text-2xl">Rede de Clínicas - Therapies Love Kids</h4>
        </div>
        <img alt="logo" className="logo h-20" src={LogoTLK} />
      </div>
      {profissionalSelecionado && <Form profissional={profissionalSelecionado} />}
    </div>
  )
}

export default App
