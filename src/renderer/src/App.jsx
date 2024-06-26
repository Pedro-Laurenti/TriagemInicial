import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SelectPage from './SelectPage'
import FormPage from './FormPage'
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
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <SelectPage
              profissionais={profissionais}
              onProfissionalChange={handleProfissionalChange}
            />
          }
        />
        <Route
          path="/form"
          element={<FormPage profissionalSelecionado={profissionalSelecionado} />}
        />
      </Routes>
    </Router>
  )
}

export default App
