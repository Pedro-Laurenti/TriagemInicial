import { useRef } from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'

import TittleForm, { SubtittleForm } from './TittleForm'
import InlineInput, {
  CheckBoxInput,
  ContactInput,
  DateInput,
  GroupSelectInput,
  IrmãosInput,
  NumInput,
  BooleanRadioInput,
  RadioInput,
  RichTextInput,
  SimpleTextInput,
  TriagemNeonatal,
  ExamesSelect,
  DateInputOutput
} from './FormComponents'

export default function Form({ profissional }) {
  const leftColRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    const leftColData = leftColRef.current.getFormData()

    const formData = {
      name: profissional.nome,
      ...leftColData
    }
    window.api.generatePdf(formData)
  }

  return (
    <form className="min-h-10 p-5 grid grid-cols-2 gap-8" onSubmit={handleSubmit}>
      <LeftCol profissional={profissional} />
      <RigCol />
    </form>
  )
}

const LeftCol = ({ profissional }) => {
  const [birthdate, setBirthdate] = useState('')
  const [age, setAge] = useState({ years: null, months: null, days: null })
  const [validDate, setValidDate] = useState(true)

  return (
    <div className=" bg-white p-5">
      <TittleForm Tittle={'1. IDENTIFICAÇÃO'} />
      <div className="py-2 px-8 mb-4">
        <SubtittleForm SubTittle={'Identificação de Autoria:'} />
        <b>Profissional: </b>
        {profissional.nome}
        <br />
        <b>Especialidade: </b>
        {profissional.especialidade}
        <br />
        <b>Nº do Conselho: </b>
        {profissional.NdoConselho}
        <br />
        <b>Formação: </b>
        {profissional.formação}
      </div>

      <div className="py-2 px-8 mb-4">
        <SubtittleForm SubTittle={'Identificação do Paciente:'} />
        <InlineInput TittleInput={'Nome do paciente'} PlaceHolder={'Nome'} />
        <DateInputOutput
          TittleInput="Data de nascimento"
          birthdate={birthdate}
          setBirthdate={setBirthdate}
          age={age}
          setAge={setAge}
          validDate={validDate}
          setValidDate={setValidDate}
        />
        Idade atual
        <div className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-4">
          {validDate
            ? `${
                age.years !== null
                  ? `${age.years} anos, ${age.months} meses e ${age.days} dias`
                  : 'Idade calculada'
              }`
            : 'Inválido: data posterior ao dia de hoje'}
        </div>
        <div className="grid grid-cols-2 gap-4 place-items-begin align-bottom">
          <NumInput TittleInput={'Peso'} PlaceHolder={'00,00 kg'} maxValue={500} maxAlgarismo={6} />
          <NumInput TittleInput={'Altura'} PlaceHolder={'00,00 m'} maxValue={2} maxAlgarismo={6} />
        </div>
        <InlineInput TittleInput={'Nome do pai'} PlaceHolder={''} />
        <InlineInput TittleInput={'Nome da mãe'} PlaceHolder={''} />
        <ContactInput TittleInput={'Contato dos responsáveis'} />
        <IrmãosInput />
      </div>

      <TittleForm Tittle={'2. DIAGNÓSTICO/HIPÓTESE DIAGNÓSTICA'} />
      <div className="py-2 px-8 mt-2 flex justify-between">
        <RadioInput
          TittleInput={'Sem indicação diagnóstica'}
          NameRadioInput={'diagnostico'}
          IdRadioInput={'diagnostico'}
        />
        <RadioInput
          TittleInput={'Hipótese diagnóstica'}
          NameRadioInput={'diagnostico'}
          IdRadioInput={'diagnostico'}
        />
        <RadioInput
          TittleInput={'Diagnóstico concluído'}
          NameRadioInput={'diagnostico'}
          IdRadioInput={'diagnostico'}
        />
      </div>
      <SimpleTextInput placeholder={'Escreva as observações aqui.'} />

      <TittleForm Tittle={'3. DISCIPLINAS REQUERIDAS'} />
      <div className="py-2 px-8 mt-2 grid grid-cols-3 gap-4 justify-between">
        <CheckBoxInput
          TittleInput={'Psicologia'}
          NameCheckInput={'disciplinas'}
          IdCheckInput={'disciplinas'}
        />
        <CheckBoxInput
          TittleInput={'Terapia ocupacional'}
          NameCheckInput={'disciplinas'}
          IdCheckInput={'disciplinas'}
        />
        <CheckBoxInput
          TittleInput={'Fisioterapia'}
          NameCheckInput={'disciplinas'}
          IdCheckInput={'disciplinas'}
        />
        <CheckBoxInput
          TittleInput={'Musicoterapia'}
          NameCheckInput={'disciplinas'}
          IdCheckInput={'disciplinas'}
        />
        <CheckBoxInput
          TittleInput={'Fonoaudiologia'}
          NameCheckInput={'disciplinas'}
          IdCheckInput={'disciplinas'}
        />
        <CheckBoxInput
          TittleInput={'Neuropsicologia'}
          NameCheckInput={'disciplinas'}
          IdCheckInput={'disciplinas'}
        />
        <CheckBoxInput
          TittleInput={'Psicomotricidade'}
          NameCheckInput={'disciplinas'}
          IdCheckInput={'disciplinas'}
        />
      </div>

      <TittleForm Tittle={'4. HISTÓRICO DE ACOMPANHAMENTO'} />
      <div className="py-2 px-8 mt-2">
        <InlineInput TittleInput={'Encaminhado por'} PlaceHolder={''} />
        <DateInput TittleInput={'Data da última consulta'} />

        <span className="mt-5">Acompanhamentos profissionais já realizados anteriormente</span>
        <div className="py-2 my-3 lg:grid grid-cols-3 gap-4 justify-between">
          <CheckBoxInput
            TittleInput={'Psicologia'}
            NameCheckInput={'acompanhamentos'}
            IdCheckInput={'acompanhamentos'}
          />
          <CheckBoxInput
            TittleInput={'Fonoaudiologia'}
            NameCheckInput={'acompanhamentos'}
            IdCheckInput={'acompanhamentos'}
          />
          <CheckBoxInput
            TittleInput={'Terapia ocupacional'}
            NameCheckInput={'acompanhamentos'}
            IdCheckInput={'acompanhamentos'}
          />
          <CheckBoxInput
            TittleInput={'Fisioterapia'}
            NameCheckInput={'acompanhamentos'}
            IdCheckInput={'acompanhamentos'}
          />
          <CheckBoxInput
            TittleInput={'Neuropsicologia'}
            NameCheckInput={'acompanhamentos'}
            IdCheckInput={'acompanhamentos'}
          />
          <CheckBoxInput
            TittleInput={'Psicomotricidade'}
            NameCheckInput={'acompanhamentos'}
            IdCheckInput={'acompanhamentos'}
          />
          <CheckBoxInput
            TittleInput={'Musicoterapia'}
            NameCheckInput={'acompanhamentos'}
            IdCheckInput={'acompanhamentos'}
          />
          <CheckBoxInput
            TittleInput={'Nutricionista'}
            NameCheckInput={'acompanhamentos'}
            IdCheckInput={'acompanhamentos'}
          />
          <CheckBoxInput
            TittleInput={'Avaliação Neuropsicológica'}
            NameCheckInput={'acompanhamentos'}
            IdCheckInput={'acompanhamentos'}
          />
          <CheckBoxInput
            TittleInput={'Geneticista'}
            NameCheckInput={'acompanhamentos'}
            IdCheckInput={'acompanhamentos'}
          />
          <CheckBoxInput
            TittleInput={'Psiquiatra'}
            NameCheckInput={'acompanhamentos'}
            IdCheckInput={'acompanhamentos'}
          />
          <CheckBoxInput
            TittleInput={'Dentista'}
            NameCheckInput={'acompanhamentos'}
            IdCheckInput={'acompanhamentos'}
          />
        </div>
      </div>
      <SimpleTextInput
        TittleInput={'Observações acerca dos acompanhamentos anteriores'}
        placeholder={'Escreva as observações aqui.'}
      />
    </div>
  )
}

const RigCol = () => {
  const optionsSelect1 = [
    {
      label: 'Prematuro',
      options: [
        { value: 'Extremo', content: 'Extremo: menos de 28 semanas' },
        { value: 'moderado', content: 'Moderado: 28 a 34 semanas' },
        { value: 'tardio', content: 'Tardio: 34 a 36 semanas' }
      ]
    },
    {
      label: 'Termo',
      options: [
        { value: 'precoce', content: 'Precoce: 37 a 38 semanas e 6 dias' },
        { value: 'pleno', content: 'Pleno: 39 a 40 semanas e 6 dias' },
        { value: 'tardio', content: 'Tardio: 41 a 42 semanas' }
      ]
    }
  ]

  const optionsSelect2 = [
    {
      options: [
        { value: 'Cesáreo', content: 'Cesáreo' },
        { value: 'Natural', content: 'Natural' },
        { value: 'Fórceps', content: 'Fórceps' }
      ]
    }
  ]

  const questionsbool1 = [
    {
      question: 'A gestação foi planejada?',
      name: 'planned',
      options: ['Sim', 'Não']
    },
    {
      question: 'A gestação foi desejada?',
      name: 'wanted',
      options: ['Sim', 'Não']
    },
    {
      question: 'Uso de substâncias durante a gestação?',
      name: 'gestation',
      options: ['Sim', 'Não'],
      followUp: {
        value: 'sim',
        question: 'Quais?',
        inputType: 'text',
        inputName: 'substanceDetails'
      }
    }
  ]

  const questionsbool2 = [
    {
      question: 'Durante o período de gestação?',
      name: 'complicacoes1',
      options: ['Sim', 'Não'],
      followUp: {
        value: 'sim',
        question: 'Quais?',
        inputType: 'text',
        inputName: 'complicacoes1Details'
      }
    }
  ]

  const questionsbool3 = [
    {
      question: 'Durante o parto?',
      name: 'complicacoes2',
      options: ['Sim', 'Não'],
      followUp: {
        value: 'sim',
        question: 'Quais?',
        inputType: 'text',
        inputName: 'complicacoes2Details'
      }
    }
  ]

  const questionsbool4 = [
    {
      question: 'Após o nascimento?',
      name: 'complicacoes3',
      options: ['Sim', 'Não'],
      followUp: {
        value: 'sim',
        question: 'Quais?',
        inputType: 'text',
        inputName: 'complicacoes3Details'
      }
    }
  ]

  const triagemConfig1 = [
    { id: 1, label: 'Teste do Pezinho', radios: ['Normal', 'Alterado'] },
    { id: 2, label: 'Teste do Olhinho', radios: ['Normal', 'Alterado'] },
    { id: 3, label: 'Teste da Orelhinha', radios: ['Normal', 'Alterado'] },
    { id: 4, label: 'Teste da Linguinha', radios: ['Normal', 'Alterado'] }
  ]

  const examesConfig1 = [
    {
      id: 1,
      label: 'Audiológicos',
      options: [
        'Não Realizou',
        'Realizado',
        'Audiometria',
        'Imitanciometria',
        'PEATE / BERA',
        'Emissão Otoacústicas'
      ],
      selected: 'Não Realizou',
      radios: ['Alterado', 'Não Alterado']
    },
    {
      id: 2,
      label: 'Oftalmológico',
      options: ['Não Realizou', 'Acuidade Visual', 'Tonometria'],
      selected: 'Não Realizou',
      radios: ['Alterado', 'Não Alterado']
    },
    {
      id: 3,
      label: 'Eletrodiagnósticos',
      options: [
        'Não Realizou',
        'Realizado',
        'Eletrocardiograma',
        'Eletroencefalograma',
        'Eletromiografia',
        'Potenciais Evocados'
      ],
      selected: 'Não Realizou',
      radios: ['Alterado', 'Não Alterado']
    },
    {
      id: 4,
      label: 'Função Pulmonar',
      options: [
        'Não Realizou',
        'Realizado',
        'Espirometria',
        'Capacidade Vital Forçada',
        'Volume respiratório',
        'Teste de Broncodilatação',
        'Tomografia toráxica'
      ],
      selected: 'Não Realizou',
      radios: ['Alterado', 'Não Alterado']
    }
  ]

  return (
    <div className=" bg-white p-5">
      <TittleForm Tittle={'5. DEMANDAS PRINCIPAIS RELATADAS'} />
      <RichTextInput className={'mb-10'} />

      <TittleForm Tittle={'6. HISTÓRICO GESTACIONAL E NATAL'} />

      <div className="py-2 px-8 mb-4">
        <GroupSelectInput titleInput="Semanas de gestação:" options={optionsSelect1} />

        <GroupSelectInput titleInput="Tipo de parto" options={optionsSelect2} />

        <BooleanRadioInput questions={questionsbool1} />

        <div className="flex flex-row gap-6 items-center">
          <NumInput
            TittleInput={'APGAR 1º min:'}
            PlaceHolder={'1 - 10'}
            maxValue={10}
            maxAlgarismo={2}
          />
          <NumInput
            TittleInput={'APGAR 5º min:'}
            PlaceHolder={'1 - 10'}
            maxValue={10}
            maxAlgarismo={2}
          />
        </div>

        <div className="flex flex-row gap-6 items-center">
          <NumInput
            TittleInput={'Peso ao Nascer:'}
            PlaceHolder={'1 - 10'}
            maxValue={80}
            maxAlgarismo={2}
          />
          <NumInput
            TittleInput={'Altura ao Nascer:'}
            PlaceHolder={'1 - 10'}
            maxValue={80}
            maxAlgarismo={2}
          />
        </div>

        <SubtittleForm SubTittle={'Houveram intercorrências/complicações:'} />
        <BooleanRadioInput questions={questionsbool2} />
        <BooleanRadioInput questions={questionsbool3} />
        <BooleanRadioInput questions={questionsbool4} />

        <TriagemNeonatal initialCheckboxes={triagemConfig1} />

        <SimpleTextInput
          TittleInput={'Observações acerca dos acompanhamentos anteriores'}
          placeholder={'Escreva as observações aqui.'}
        />
        <SimpleTextInput
          TittleInput={'Observações Pertinentes'}
          placeholder={'Escreva as observações aqui.'}
        />
      </div>

      <TittleForm Tittle={'7. HISTÓRICO DE SAÚDE'} />
      <div className="py-2 px-8 mb-4">
        <ExamesSelect initialSelects={examesConfig1} />
      </div>
    </div>
  )
}

LeftCol.propTypes = {
  profissional: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    especialidade: PropTypes.string.isRequired,
    formação: PropTypes.string.isRequired,
    NdoConselho: PropTypes.string.isRequired
  }).isRequired
}
