import { useState } from 'react'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'

const Form = ({ profissional }) => {
  const [birthdate, setBirthdate] = useState('')
  const [age, setAge] = useState({ years: null, months: null, days: null })
  const [validDate, setValidDate] = useState(true)
  const [siblings, setSiblings] = useState(['']) // State para armazenar os nomes dos irmãos

  const handleInputChange = (event) => {
    const selectedDate = event.target.value
    setBirthdate(selectedDate)

    const today = new Date()
    const birthDate = new Date(selectedDate)

    // Valida se a data de nascimento é maior que a data atual
    const isValid = birthDate <= today

    setValidDate(isValid)

    let years = today.getFullYear() - birthDate.getFullYear()
    let months = today.getMonth() - birthDate.getMonth()
    let days = today.getDate() - birthDate.getDate()

    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--
      months += 12
    }

    if (days < 0) {
      const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0)
      days += prevMonth.getDate()
      months--
    }

    setAge({ years, months, days })
  }

  const addSiblingInput = () => {
    setSiblings([...siblings, ''])
  }

  const removeSiblingInput = (index) => {
    const updatedSiblings = siblings.filter((_, idx) => idx !== index)
    setSiblings(updatedSiblings)
  }

  const handleSiblingInputChange = (index, event) => {
    const updatedSiblings = [...siblings]
    updatedSiblings[index] = event.target.value
    setSiblings(updatedSiblings)
  }

  const [isDesired, setIsDesired] = useState(null)

  const handleRadioChange = (event) => {
    setIsDesired(event.target.value === 'yes')
  }

  return (
    <form className="min-h-10 p-5 grid grid-cols-2 gap-4">
      <div>
        <div>
          <h2 className="w-full py-2 bg-slate-700 text-white text-center font-semibold">
            1. IDENTIFICAÇÃO
          </h2>
          <div className="py-2 px-8 mt-2">
            <h3 className="font-semibold mb-2">1.1 Identificação de Autoria:</h3>
            <b>Profissional:</b> <code>{profissional.nome}</code> <br />
            <b>Especialidade:</b> <code>{profissional.especialidade}</code> <br />
            <b>Nº do Conselho:</b> <code>{profissional.NdoConselho}</code> <br />
            <b>Formação:</b> <code>{profissional.formação}</code> <br />
          </div>
          <div className="py-2 px-8 mt-2">
            <h3 className="font-semibold mb-2">1.2 Identificação do Paciente:</h3>
            <b>Nome do paciente</b>
            <input
              className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
              placeholder="Nome"
              type="text"
              name=""
              id=""
            />
            <b>Data de nascimento</b>
            <input
              className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
              placeholder="Nome"
              type="date"
              value={birthdate}
              onChange={handleInputChange}
            />
            <b>Idade atual</b>
            <div className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2">
              {validDate
                ? `${age.years !== null ? `${age.years} anos, ${age.months} meses e ${age.days} dias` : 'Idade calculada'}`
                : 'Formato inválido'}
            </div>
            <div className="grid grid-cols-2 gap-4 place-items-begin align-bottom">
              <section>
                <b>Peso</b>
                <input
                  className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
                  placeholder="00,00 kg"
                  type="number"
                  name=""
                  id=""
                />
              </section>
              <section>
                <b>Altura</b>
                <input
                  className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
                  placeholder="00,00 m"
                  type="number"
                  name=""
                  id=""
                />
              </section>
            </div>

            <b>Nome do pai</b>
            <input
              className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
              placeholder="Nome do Pai"
              type="text"
              name=""
              id=""
            />
            <b>Nome da mãe</b>
            <input
              className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
              placeholder="Nome da Mãe"
              type="text"
              name=""
              id=""
            />
            <b>Contato dos responsáveis</b>
            <InputMask
              className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
              type="text"
              mask="(99) 99999-9999"
              placeholder="(00) 00000-0000"
            ></InputMask>

            <b>Irmãos</b>
            <br />
            <div className="w-full flex flex-row items-center mb-2">
              <input
                className="border border-slate-300 rounded w-full px-4 py-2 text-slate-600"
                placeholder="Irmão"
                type="text"
              />
              <button
                type="button"
                onClick={addSiblingInput}
                className="font-bold hover:text-white hover:bg-emerald-600 text-emerald-600 border border-emerald-600 p-2 rounded ml-2 text-center min-w-8"
              >
                +
              </button>
            </div>
            {siblings.map((sibling, index) => (
              <div key={index} className="relative w-full flex flex-row items-center mb-2">
                <input
                  className="border w-full border-slate-300 rounded px-4 py-2 text-slate-600"
                  placeholder="Irmão"
                  type="text"
                  value={sibling}
                  onChange={(event) => handleSiblingInputChange(index, event)}
                />
                <button
                  type="button"
                  onClick={() => removeSiblingInput(index)}
                  className="font-bold hover:text-white hover:bg-red-500 text-red-500 border border-red-500 p-2 rounded ml-2 text-center min-w-8"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={addSiblingInput}
                  className="font-bold hover:text-white hover:bg-emerald-600 text-emerald-600 border border-emerald-600 p-2 rounded ml-2 text-center min-w-8"
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="w-full py-2 bg-slate-700 text-white text-center font-semibold">
            2. DIAGNÓSTICO/HIPÓTESE DIAGNÓSTICA
          </h2>
          <div className="py-2 px-8 mt-2 flex justify-between">
            <label>
              <input className="mr-2" type="radio" name="1" id="" />
              Sem indicação diagnóstica
            </label>
            <label>
              <input className="mr-2" type="radio" name="1" id="" />
              Hipótese diagnóstica
            </label>
            <label>
              <input className="mr-2" type="radio" name="1" id="" />
              Diagnóstico concluído
            </label>
          </div>
          <div className="py-2 px-8 mt-2">
            <textarea
              className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
              id="textarea"
              name="textarea"
              placeholder="Escreva as observações aqui."
              rows="2"
              cols="50"
            ></textarea>
          </div>
        </div>
        <div>
          <h2 className="w-full py-2 bg-slate-700 text-white text-center font-semibold">
            3. DISCIPLINAS REQUERIDAS
          </h2>
          <div className="py-2 px-8 mt-2 grid grid-cols-4 grid-rows-2 gap-4 justify-between">
            <label>
              <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
              Psicologia
            </label>
            <label>
              <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
              Terapia ocupacional
            </label>
            <label>
              <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
              Fisioterapia
            </label>
            <label>
              <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
              Musicoterapia
            </label>
            <label>
              <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
              Fonoaudiologia
            </label>
            <label>
              <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
              Neuropsicologia
            </label>
            <label>
              <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
              Psicomotricidade
            </label>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2 className="w-full py-2 bg-slate-700 text-white text-center font-semibold">
            4. HISTÓRICO DE ACOMPANHAMENTO
          </h2>
          <div className="py-2 px-8 mt-2">
            <b>Encaminhado por</b>
            <input
              className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
              placeholder="Nome"
              type="text"
              name=""
              id=""
            />
            <b>Data da última consulta</b>
            <input
              className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
              placeholder="Nome"
              type="date"
              value={birthdate}
              onChange={handleInputChange}
            />

            <b>Acompanhamentos profissionais já realizados anteriormente</b>
            <div className="py-2 px-8 mt-2 grid grid-cols-4 grid-rows-2 gap-4 justify-between">
              <label>
                <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
                Psicologia
              </label>
              <label>
                <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
                Fonoaudiologia
              </label>
              <label>
                <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
                Terapia ocupacional
              </label>
              <label>
                <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
                Fisioterapia
              </label>
              <label>
                <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
                Neuropsicologia
              </label>
              <label>
                <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
                Psicomotricidade
              </label>
              <label>
                <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
                Musicoterapia
              </label>
              <label>
                <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
                Nutricionista
              </label>
              <label>
                <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
                Avaliação Neuropsicológica
              </label>
              <label>
                <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
                Geneticista
              </label>
              <label>
                <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
                Psiquiatra
              </label>
              <label>
                <input type="checkbox" name="aaaa" id="aaa" className="mr-2" />
                Dentista
              </label>
            </div>

            <b>Observações acerca dos acompanhamentos anteriores</b>
            <textarea
              className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
              id="textarea"
              name="textarea"
              placeholder="Escreva as observações aqui."
              rows="4"
              cols="50"
            ></textarea>
          </div>
        </div>
        <div>
          <h2 className="w-full py-2 bg-slate-700 text-white text-center font-semibold">
            5. DEMANDAS PRINCIPAIS RELATADAS
          </h2>
          <textarea
            className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
            id="textarea"
            name="textarea"
            placeholder="Demandas principais."
            rows="4"
            cols="50"
          ></textarea>
        </div>
        <div>
          <h2 className="w-full py-2 bg-slate-700 text-white text-center font-semibold">
            6. HISTÓRICO GESTACIONAL E NATAL
          </h2>
          <div className="py-2 px-8 mt-2">
            <b>Semanas de gestação:</b>
            <label>
              <select className="bg-white border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2">
                <optgroup label="Prematuro">
                  <option value="">Extremo: menos de 28 semanas</option>
                  <option value="">Moderado: 28 a 34 semanas</option>
                  <option value="">Tardio: 34 a 36 semanas</option>
                </optgroup>
                <optgroup label="Termo">
                  <option value="">Precoce: 37 a 38 semanas e 6 dias</option>
                  <option value="">Pleno: 39 a 40 semanas e 6 dias</option>
                  <option value="">Tardio: 41 a 42 semanas</option>
                </optgroup>
              </select>
            </label>
          </div>
          <div className="py-2 px-8 mt-2">
            <div className="mt-2 flex justify-between">
              <b>Tipo de parto:</b>
              <section className="flex flex-row gap-10">
                <label>
                  <input className="mr-2" type="radio" name="2" id="" />
                  Cesáreo
                </label>
                <label>
                  <input className="mr-2" type="radio" name="2" id="" />
                  Natural
                </label>
                <label>
                  <input className="mr-2" type="radio" name="2" id="" />
                  Fórceps
                </label>
              </section>
            </div>
            <div className="mt-2 flex justify-between">
              <b>A gestação foi planejada?</b>
              <section className="flex flex-row gap-10">
                <label>
                  <input className="mr-2" type="radio" name="3" id="" />
                  Sim
                </label>
                <label>
                  <input className="mr-2" type="radio" name="3" id="" />
                  Não
                </label>
              </section>
            </div>
            <div className="mt-2 flex justify-between">
              <b>A gestação foi desejada?</b>
              <section className="flex flex-row gap-10">
                <label>
                  <input className="mr-2" type="radio" name="4" id="" />
                  Sim
                </label>
                <label>
                  <input className="mr-2" type="radio" name="4" id="" />
                  Não
                </label>
              </section>
            </div>
            <div className="mt-2 flex justify-between">
              <b>Uso de substâncias durante a gestação?</b>
              <section className="flex flex-row gap-10">
                <label>
                  <input
                    className="mr-2"
                    type="radio"
                    name="gestation"
                    value="yes"
                    onChange={handleRadioChange}
                  />
                  Sim
                </label>
                <label>
                  <input
                    className="mr-2"
                    type="radio"
                    name="gestation"
                    value="no"
                    onChange={handleRadioChange}
                  />
                  Não
                </label>
              </section>
            </div>
            {isDesired && (
              <div className="mt-2">
                <label>
                  <b>Quais?</b>
                  <input
                    className="ml-2 p-1 border rounded w-full"
                    type="text"
                    name="explanation"
                  />
                </label>
              </div>
            )}
          </div>
          <div className="py-2 px-8 mt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <b className="w-40">Apgar 1º min:</b>
                <input className="flex-1 p-2 border rounded" type="text" name="apgar1" />
              </div>
              <div className="flex items-center gap-4">
                <b className="w-40">Apgar 5º min:</b>
                <input className="flex-1 p-2 border rounded" type="text" name="apgar5" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <b className="w-40">Peso ao Nascer:</b>
                <input className="flex-1 p-2 border rounded" type="number" name="peso" />
              </div>
              <div className="flex items-center gap-4">
                <b className="w-40">Altura ao Nascer:</b>
                <input className="flex-1 p-2 border rounded" type="number" name="altura" />
              </div>
            </div>
          </div>
          <div className="py-2 px-8 mt-2">
            <b>Houveram intercorrências durante o período de gestação</b>
            <textarea
              className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
              id="textarea"
              name="textarea"
              placeholder="Escreva as observações aqui."
              rows="4"
              cols="50"
            ></textarea>
          </div>
        </div>
        <div>
          <h2 className="w-full py-2 bg-slate-700 text-white text-center font-semibold">
            7. HISTÓRICO DE SAÚDE
          </h2>
        </div>
      </div>
    </form>
  )
}

Form.propTypes = {
  profissional: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    especialidade: PropTypes.string.isRequired,
    formação: PropTypes.string.isRequired,
    NdoConselho: PropTypes.string.isRequired
  }).isRequired
}

export default Form
