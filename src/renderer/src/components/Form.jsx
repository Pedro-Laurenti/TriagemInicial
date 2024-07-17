import { useRef, useState } from 'react'
const { ipcRenderer } = window
import PropTypes from 'prop-types'

import TittleForm, { SubtittleForm } from '@renderer/components/TittleForm'
import IrmãosInput, {
    ContactInput,
    DateInputOutput,
    NumInput,
    InlineInput,
    RadioInput,
    SimpleTextInput,
    RichTextInput,
    GroupSelectInput,
    CheckBoxInput,
    DateInput,
    BooleanRadioInput,
    TriagemNeonatal,
    ExamesSelect,
    InlineInputFixed
} from '@renderer/components/FormComponents'

export default function Form({ profissional, idForm }) {
    return (
        <div className="min-h-10 px-10 py-5" id={idForm}>
            <Col profissional={profissional} />
        </div>
    )
}

const Col = ({ profissional }) => {
    const [birthdate, setBirthdate] = useState('')
    const [age, setAge] = useState({ years: null, months: null, days: null })
    const [validDate, setValidDate] = useState(true)

    const idadeParto = [
        {
            label: 'Prematuro',
            options: [
                { value: 'Prematuro extremo: menos de 28 semanas', content: 'Extremo: menos de 28 semanas' },
                { value: 'Prematuro moderado: 28 a 34 semanas', content: 'Moderado: 28 a 34 semanas' },
                { value: 'Prematuro tardio: 34 a 36 semanas', content: 'Tardio: 34 a 36 semanas' }
            ]
        },
        {
            label: 'Termo',
            options: [
                { value: 'Termo precoce: 37 a 38 semanas e 6 dias', content: 'Precoce: 37 a 38 semanas e 6 dias' },
                { value: 'Termo pleno: 39 a 40 semanas e 6 dias', content: 'Pleno: 39 a 40 semanas e 6 dias' },
                { value: 'Termo tardio: 41 a 42 semanas', content: 'Tardio: 41 a 42 semanas' }
            ]
        }
    ]

    const tipodeParto = [
        {
            options: [
                { value: 'Cesáreo', content: 'Cesáreo' },
                { value: 'Natural', content: 'Natural' },
                { value: 'Fórceps', content: 'Fórceps' }
            ]
        }
    ]

    const boolGestacao = [
        {
            question: 'A gestação foi planejada?',
            name: 'gestacao-planejada',
            options: ['Sim', 'Não']
        },
        {
            question: 'A gestação foi desejada?',
            name: 'gestacao-desejada',
            options: ['Sim', 'Não']
        },
        {
            question: 'Uso de substâncias durante a gestação?',
            name: 'gestacao-substancias',
            options: ['Sim', 'Não'],
            followUp: {
                value: 'sim',
                question: 'Quais?',
                inputType: 'text',
                name: 'gestacao-substanciasdetalhes',
                ref: useRef(null)
            }
        }
    ];

    const boolComplicacoes = [
        {
            question: 'Durante o período de gestação?',
            name: 'complicacoes-durantegestacao',
            options: ['Sim', 'Não'],
            followUp: {
                value: 'sim',
                question: 'Quais?',
                inputType: 'text',
                name: 'complicacoes1Details',
                ref: useRef(null)
            }
        },
        {
            question: 'Durante o parto?',
            name: 'complicacoes-duranteparto',
            options: ['Sim', 'Não'],
            followUp: {
                value: 'sim',
                question: 'Quais?',
                inputType: 'text',
                name: 'complicacoes2Details',
                ref: useRef(null)
            }
        },
        {
            question: 'Após o nascimento?',
            name: 'complicacoes-aposnascimento',
            options: ['Sim', 'Não'],
            followUp: {
                value: 'sim',
                question: 'Quais?',
                inputType: 'text',
                name: 'complicacoes3Details',
                ref: useRef(null)
            }
        }
    ];

    const triagemNeonatal = [
        { id: 'Neonatal-pezinho', name: 'Neonatal-pezinho', label: 'Teste do Pezinho', radios: ['Normal', 'Alterado'] },
        { id: 'Neonatal-olhinho', name: 'Neonatal-olhinho', label: 'Teste do Olhinho', radios: ['Normal', 'Alterado'] },
        { id: 'Neonatal-orelhinha', name: 'Neonatal-orelhinha', label: 'Teste da Orelhinha', radios: ['Normal', 'Alterado'] },
        { id: 'Neonatal-linguinha', name: 'Neonatal-linguinha', label: 'Teste da Linguinha', radios: ['Normal', 'Alterado'] }
    ];

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

    const inputRefs = {
        ProfissionalNome: useRef(null),
        ProfissionalEspecialidade: useRef(null),
        ProfissionalNdoConselho: useRef(null),
        ProfissionalFormação: useRef(null),

        nome: useRef(null),
        dataNascimento: useRef(null),
        peso: useRef(null),
        altura: useRef(null),
        nomePai: useRef(null),
        nomeMãe: useRef(null),
        contato: useRef(null),
        irmãos: useRef(null),
        Radio1IndicaçãoDiagnóstica: useRef(null),
        Radio1HipóteseDiagnóstica: useRef(null),
        Radio1DiagnósticoConcluido: useRef(null),
        observacoesDiagnosticos: useRef(null),
        DemandasPrincipais: useRef(null),

        DisciplinasReqPsicologia: useRef(null),
        DisciplinasReqTerapiaOcupacional: useRef(null),
        DisciplinasReqFisioterapia: useRef(null),
        DisciplinasReqMusicoterapia: useRef(null),
        DisciplinasReqFonoaudiologia: useRef(null),
        DisciplinasReqNeuropsicologia: useRef(null),
        DisciplinasReqPsicomotricidade: useRef(null),

        NomeEncaminhadoPor: useRef(null),
        DataUltimaConsulta: useRef(null),

        AcompanhamentosProPsicologia: useRef(null),
        AcompanhamentosProFonoaudiologia: useRef(null),
        AcompanhamentosProTerapiaOcupacional: useRef(null),
        AcompanhamentosProFisioterapia: useRef(null),
        AcompanhamentosProNeuropsicologia: useRef(null),
        AcompanhamentosProPsicomotricidade: useRef(null),
        AcompanhamentosProMusicoterapia: useRef(null),
        AcompanhamentosProNutricionista: useRef(null),
        AcompanhamentosProAvaliaçãoNeuropsicológica: useRef(null),
        AcompanhamentosProGeneticista: useRef(null),
        AcompanhamentosProPsiquiatra: useRef(null),
        AcompanhamentosProDentista: useRef(null),

        observacoesAcompanhamentosAnteriores: useRef(null),
        selectedGestacao: useRef(null),
        selectedParto: useRef(null),

        Apgar1: useRef(null),
        Apgar2: useRef(null),
        PesoAoNascer: useRef(null),
        AlturaAoNascer: useRef(null),

        ObservacoesAcompanhamentos: useRef(null),
        ObservacoesPertinentes: useRef(null),
    };

    const handleGeneratePDF = async () => {
        const formData = Object.keys(inputRefs).reduce((values, key) => {
            if (key === 'irmãos') {
                values[key] = inputRefs[key].current ? inputRefs[key].current.getSiblings() : [];
            } else if (key.startsWith('Radio1')) {
                values[key] = inputRefs[key].current ? inputRefs[key].current.checked : false;
            } else if (key === 'DemandasPrincipais') {
                const ckEditorInstance = inputRefs[key].current;
                const ckContent = ckEditorInstance.getData();
                values[key] = ckContent;
            } else if (key.startsWith('DisciplinasReq') || key.startsWith('AcompanhamentosPro')) {
                values[key] = inputRefs[key].current ? inputRefs[key].current.checked : false;
            } else if (key === 'selectedGestacao' || key === 'selectedParto') {
                values[key] = inputRefs[key].current ? inputRefs[key].current.value : '';
            } else {
                values[key] = inputRefs[key].current ? inputRefs[key].current.value : '';
            }
            return values;
        }, {});

        // Função para coletar respostas das perguntas booleanas
        const collectBooleanResponses = (questions) => {
            questions.forEach(question => {
                const selectedOption = document.querySelector(`input[name="${question.name}"]:checked`);
                if (selectedOption) {
                    formData[question.name] = selectedOption.value;
                    // Se a resposta for 'Sim', coletar a resposta do campo de texto de acompanhamento
                    if (question.followUp && selectedOption.value === question.followUp.value && question.followUp.ref && question.followUp.ref.current) {
                        formData[question.followUp.name] = question.followUp.ref.current.value;
                    }
                }
            });
        };

        collectBooleanResponses(boolGestacao);
        collectBooleanResponses(boolComplicacoes);


        // Coletar respostas da Triagem Neonatal
        triagemNeonatal.forEach(test => {
            const selectedOption = document.querySelector(`input[name="radio-${test.id}"]:checked`);
            if (selectedOption) {
                formData[test.name] = selectedOption.value;
            }
        });

        // Coletar respostas dos Exames Select
        examesConfig1.forEach(exam => {
            const selectedOption = document.querySelector(`#select-${exam.id}`).value;
            formData[`exam-${exam.id}`] = selectedOption;
            if (selectedOption !== 'Não Realizou') {
                const selectedRadio = document.querySelector(`input[name="radio-${exam.id}"]:checked`);
                if (selectedRadio) {
                    formData[`exam-${exam.id}-status`] = selectedRadio.value;
                }
            }
        });


        console.log('formData:', formData);

        try {
            const result = await ipcRenderer.invoke('generate-pdf', formData);
            console.log(result);
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
        }
    };

return (
    <div className="bg-white p-5 flex flex-col items-center">
        <div className="mb-4 w-full">
            <TittleForm Tittle={'1. IDENTIFICAÇÃO'} />
            <div className="py-2 px-8">
                <SubtittleForm SubTittle={'Identificação de Autoria:'} />
                <InlineInputFixed
                    TittleInput={'Profissional'}
                    valueInputFixed={ profissional.nome }
                    inputRef={inputRefs.ProfissionalNome}
                />
                <InlineInputFixed
                    TittleInput={'Especialidade'}
                    valueInputFixed={ profissional.especialidade }
                    inputRef={inputRefs.ProfissionalEspecialidade}
                />
                <InlineInputFixed
                    TittleInput={'Nº do Conselho'}
                    valueInputFixed={ profissional.NdoConselho }
                    inputRef={inputRefs.ProfissionalNdoConselho}
                />
                <InlineInputFixed
                    TittleInput={'Formação'}
                    valueInputFixed={ profissional.formação }
                    inputRef={inputRefs.ProfissionalFormação}
                />                
            </div>

            <div className="py-2 px-8 mb-4">
                <SubtittleForm SubTittle={'Identificação do Paciente:'} />

                <InlineInput
                    TittleInput={'Nome do paciente'}
                    PlaceHolder={'Nome'}
                    inputRef={inputRefs.nome}
                />

                <DateInputOutput
                    TittleInput="Data de nascimento"
                    birthdate={birthdate}
                    setBirthdate={setBirthdate}
                    age={age}
                    setAge={setAge}
                    validDate={validDate}
                    setValidDate={setValidDate}
                    inputRef={inputRefs.dataNascimento}
                />

                <div className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-4">
                    {validDate
                    ? `${age.years !== null ? `${age.years} anos, ${age.months} meses e ${age.days} dias` : 'Idade calculada'}`
                    : 'Inválido: data posterior ao dia de hoje'}
                </div>

                <div className="grid grid-cols-2 gap-4 place-items-begin align-bottom">
                    <NumInput
                    TittleInput={'Peso'}
                    PlaceHolder={'00,00 kg'}
                    maxValue={500}
                    maxAlgarismo={6}
                    inputRef={inputRefs.peso}
                    />
                    <NumInput
                    TittleInput={'Altura'}
                    PlaceHolder={'00,00 m'}
                    maxValue={2}
                    maxAlgarismo={6}
                    inputRef={inputRefs.altura}
                    />
                </div>

                <InlineInput
                    TittleInput={'Nome do pai'}
                    PlaceHolder={'Nome'}
                    inputRef={inputRefs.nomePai}
                />

                <InlineInput
                    TittleInput={'Nome da mãe'}
                    PlaceHolder={'Nome'}
                    inputRef={inputRefs.nomeMãe}
                />

                <ContactInput TittleInput={'Contato dos responsáveis'} inputRef={inputRefs.contato} />

                <IrmãosInput ref={inputRefs.irmãos} />
            </div>

            <TittleForm Tittle={'2. DIAGNÓSTICO/HIPÓTESE DIAGNÓSTICA'} />
            <div className="py-2 px-8 mt-2 flex justify-between">
                <RadioInput
                    TittleInput={'Sem indicação diagnóstica'}
                    NameRadioInput={'diagnostico'}
                    IdRadioInput={'diagnostico'}
                    inputRef={inputRefs.Radio1IndicaçãoDiagnóstica}
                />
                <RadioInput
                    TittleInput={'Hipótese diagnóstica'}
                    NameRadioInput={'diagnostico'}
                    IdRadioInput={'diagnostico'}
                    inputRef={inputRefs.Radio1HipóteseDiagnóstica}
                />
                <RadioInput
                    TittleInput={'Diagnóstico concluído'}
                    NameRadioInput={'diagnostico'}
                    IdRadioInput={'diagnostico'}
                    inputRef={inputRefs.Radio1DiagnósticoConcluido}
                />

            </div>
            <div className="py-2 px-8 mt-2">
                <SimpleTextInput
                    TittleInput={'Observações sobre o diagnóstico'}
                    placeholder={'Escreva as observações aqui.'}
                    inputRef={inputRefs.observacoesDiagnosticos}
                />
            </div>

            <TittleForm Tittle={'3. DISCIPLINAS REQUERIDAS'} />
            <div className="py-2 px-8 mt-2 mb-10 grid grid-cols-3 gap-4 justify-between">
                <CheckBoxInput
                    TittleInput={"Psicologia"}
                    NameCheckInput={"disciplinas"}
                    IdCheckInput={"Psicologia"}
                    inputRef={inputRefs.DisciplinasReqPsicologia}
                />
                <CheckBoxInput
                    TittleInput={"Terapia ocupacional"}
                    NameCheckInput={"disciplinas"}
                    IdCheckInput={"TerapiaOcupacional"}
                    inputRef={inputRefs.DisciplinasReqTerapiaOcupacional}
                />
                <CheckBoxInput
                    TittleInput={"Fisioterapia"}
                    NameCheckInput={"disciplinas"}
                    IdCheckInput={"Fisioterapia"}
                    inputRef={inputRefs.DisciplinasReqFisioterapia}
                />
                <CheckBoxInput
                    TittleInput={"Musicoterapia"}
                    NameCheckInput={"disciplinas"}
                    IdCheckInput={"Musicoterapia"}
                    inputRef={inputRefs.DisciplinasReqMusicoterapia}
                />
                <CheckBoxInput
                    TittleInput={"Fonoaudiologia"}
                    NameCheckInput={"disciplinas"}
                    IdCheckInput={"Fonoaudiologia"}
                    inputRef={inputRefs.DisciplinasReqFonoaudiologia}
                />
                <CheckBoxInput
                    TittleInput={"Neuropsicologia"}
                    NameCheckInput={"disciplinas"}
                    IdCheckInput={"Neuropsicologia"}
                    inputRef={inputRefs.DisciplinasReqNeuropsicologia}
                />
                <CheckBoxInput
                    TittleInput={"Psicomotricidade"}
                    NameCheckInput={"disciplinas"}
                    IdCheckInput={"Psicomotricidade"}
                    inputRef={inputRefs.DisciplinasReqPsicomotricidade}
                />
            </div>

            <TittleForm Tittle={'4. HISTÓRICO DE ACOMPANHAMENTO'} />
            <div className="py-2 px-8 mt-2">
                <InlineInput
                    TittleInput={'Encaminhado por'}
                    PlaceHolder={'Nome'}
                    inputRef={inputRefs.NomeEncaminhadoPor}
                />
                <DateInput
                    TittleInput={'Data da última consulta'}
                    inputRef={inputRefs.DataUltimaConsulta}
                />

                <span className="mt-5">Acompanhamentos profissionais já realizados anteriormente</span>
                <div className="py-2 my-3 lg:grid grid-cols-3 gap-4 justify-between">
                    <CheckBoxInput
                        TittleInput={'Psicologia'}
                        NameCheckInput={'acompanhamentos'}
                        IdCheckInput={'acompanhamentos'}
                        inputRef={inputRefs.AcompanhamentosProPsicologia}
                    />
                    <CheckBoxInput
                        TittleInput={'Fonoaudiologia'}
                        NameCheckInput={'acompanhamentos'}
                        IdCheckInput={'acompanhamentos'}
                        inputRef={inputRefs.AcompanhamentosProFonoaudiologia}
                    />
                    <CheckBoxInput
                        TittleInput={'Terapia ocupacional'}
                        NameCheckInput={'acompanhamentos'}
                        IdCheckInput={'acompanhamentos'}
                        inputRef={inputRefs.AcompanhamentosProTerapiaOcupacional}
                    />
                    <CheckBoxInput
                        TittleInput={'Fisioterapia'}
                        NameCheckInput={'acompanhamentos'}
                        IdCheckInput={'acompanhamentos'}
                        inputRef={inputRefs.AcompanhamentosProFisioterapia}
                    />
                    <CheckBoxInput
                        TittleInput={'Neuropsicologia'}
                        NameCheckInput={'acompanhamentos'}
                        IdCheckInput={'acompanhamentos'}
                        inputRef={inputRefs.AcompanhamentosProNeuropsicologia}
                    />
                    <CheckBoxInput
                        TittleInput={'Psicomotricidade'}
                        NameCheckInput={'acompanhamentos'}
                        IdCheckInput={'acompanhamentos'}
                        inputRef={inputRefs.AcompanhamentosProPsicomotricidade}
                    />
                    <CheckBoxInput
                        TittleInput={'Musicoterapia'}
                        NameCheckInput={'acompanhamentos'}
                        IdCheckInput={'acompanhamentos'}
                        inputRef={inputRefs.AcompanhamentosProMusicoterapia}
                    />
                    <CheckBoxInput
                        TittleInput={'Nutricionista'}
                        NameCheckInput={'acompanhamentos'}
                        IdCheckInput={'acompanhamentos'}
                        inputRef={inputRefs.AcompanhamentosProNutricionista}
                    />
                    <CheckBoxInput
                        TittleInput={'Avaliação Neuropsicológica'}
                        NameCheckInput={'acompanhamentos'}
                        IdCheckInput={'acompanhamentos'}
                        inputRef={inputRefs.AcompanhamentosProAvaliaçãoNeuropsicológica}
                    />
                    <CheckBoxInput
                        TittleInput={'Geneticista'}
                        NameCheckInput={'acompanhamentos'}
                        IdCheckInput={'acompanhamentos'}
                        inputRef={inputRefs.AcompanhamentosProGeneticista}
                    />
                    <CheckBoxInput
                        TittleInput={'Psiquiatra'}
                        NameCheckInput={'acompanhamentos'}
                        IdCheckInput={'acompanhamentos'}
                        inputRef={inputRefs.AcompanhamentosProPsiquiatra}
                    />
                    <CheckBoxInput
                        TittleInput={'Dentista'}
                        NameCheckInput={'acompanhamentos'}
                        IdCheckInput={'acompanhamentos'}
                        inputRef={inputRefs.AcompanhamentosProDentista}
                    />
                </div>

                <SimpleTextInput
                    TittleInput={'Observações acerca dos acompanhamentos anteriores'}
                    placeholder={'Escreva as observações aqui.'}
                    inputRef={inputRefs.observacoesAcompanhamentosAnteriores}
                />
            </div>
        </div>

        <div className="mb-4 w-full">
            <TittleForm Tittle={'5. DEMANDAS PRINCIPAIS RELATADAS'} />
            <div className="px-8 my-10">
                <RichTextInput className={'mb-10'} inputRef={inputRefs.DemandasPrincipais} />
            </div>

            <TittleForm Tittle={'6. HISTÓRICO GESTACIONAL E NATAL'} />
            <div className="py-2 px-8 mb-5">
                <GroupSelectInput titleInput="Semanas de gestação:" options={idadeParto} inputRef={inputRefs.selectedGestacao} />

                <GroupSelectInput titleInput="Tipo de parto" options={tipodeParto} inputRef={inputRefs.selectedParto} />

                <div className="flex flex-row gap-6 items-center">
                    <NumInput
                        TittleInput={'APGAR 1º min:'}
                        PlaceHolder={'1 - 10'}
                        maxValue={10}
                        maxAlgarismo={2}
                        inputRef={inputRefs.Apgar1}
                    />
                    <NumInput
                        TittleInput={'APGAR 5º min:'}
                        PlaceHolder={'1 - 10'}
                        maxValue={10}
                        maxAlgarismo={2}
                        inputRef={inputRefs.Apgar2}
                    />
                </div>
                <div className="flex flex-row gap-6 items-center">
                    <NumInput
                        TittleInput={'Peso ao Nascer:'}
                        PlaceHolder={'Ex: 1000,5 g'}
                        maxValue={7000}
                        maxAlgarismo={5}
                        inputRef={inputRefs.PesoAoNascer}
                    />
                    <NumInput
                        TittleInput={'Altura ao Nascer:'}
                        PlaceHolder={'1 - 10'}
                        maxValue={80}
                        maxAlgarismo={2}
                        inputRef={inputRefs.AlturaAoNascer}
                    />
                </div>

                <BooleanRadioInput questions={boolGestacao} />

                <SubtittleForm SubTittle={'Intercorrências/complicações:'} />
                <BooleanRadioInput questions={boolComplicacoes} />

                <TriagemNeonatal initialCheckboxes={triagemNeonatal} />

                <SimpleTextInput
                    TittleInput={'Observações acerca dos acompanhamentos anteriores'}
                    placeholder={'Escreva as observações aqui.'}
                    inputRef={inputRefs.ObservacoesAcompanhamentos}
                />
                <SimpleTextInput
                    TittleInput={'Observações Pertinentes'}
                    placeholder={'Escreva as observações aqui.'}
                    inputRef={inputRefs.ObservacoesPertinentes}
                />
            </div>

            <TittleForm Tittle={'7. HISTÓRICO DE SAÚDE'} />
            <div className="py-2 px-8 mb-4">
                <ExamesSelect initialSelects={examesConfig1} />
            </div>
        </div>

        <button onClick={handleGeneratePDF} className="bg-green-500 text-white px-5 py-2 rounded-lg">
            Gerar PDF
        </button>
    </div>
)
}

Col.propTypes = {
profissional: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    especialidade: PropTypes.string.isRequired,
    formação: PropTypes.string.isRequired,
    NdoConselho: PropTypes.string.isRequired
}).isRequired,
idForm: PropTypes.any
}

Form.propTypes = {
    idForm: PropTypes.any
}
