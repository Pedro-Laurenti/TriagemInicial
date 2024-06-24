import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
const { ipcRenderer } = window;

import TittleForm, { SubtittleForm } from './TittleForm';
import IrmãosInput, { ContactInput, DateInputOutput, NumInput, InlineInput, RadioInput } from './FormComponents';


export default function Form({ profissional, idForm }) {
    return (
        <div className="min-h-10 px-10 py-5" id={idForm}>
            <Col profissional={profissional} />
        </div>
    );
}

const Col = ({ profissional }) => {
    const [birthdate, setBirthdate] = useState('');
    const [age, setAge] = useState({ years: null, months: null, days: null });
    const [validDate, setValidDate] = useState(true);

    const inputRefs = {
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
        Radio2Opcao1: useRef(null),
        Radio2Opcao2: useRef(null),
        Radio2Opcao3: useRef(null),
    };

    const handleGeneratePDF = async () => {
        const formData = Object.keys(inputRefs).reduce((values, key) => {
            if (key === 'irmãos') {
                values[key] = inputRefs[key].current ? inputRefs[key].current.getSiblings() : [];
            } else if (key.startsWith('Radio')) {
                values[key] = inputRefs[key].current ? inputRefs[key].current.checked : false;
            } else {
                values[key] = inputRefs[key].current ? inputRefs[key].current.value : '';
            }
            return values;
        }, {});

        try {
            const result = await ipcRenderer.invoke('generate-pdf', formData);
            console.log(result);
            console.log(inputRefs);
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
        }
    };

    return (
        <div className='bg-white p-5'>
            <div className="py-2 px-8 mb-4">
                <TittleForm Tittle={"1. IDENTIFICAÇÃO"} />

                <div className="py-2 px-8 mb-4">
                    <SubtittleForm SubTittle={"Identificação de Autoria:"} />
                    <b>Profissional: </b>{profissional.nome}<br />
                    <b>Especialidade: </b>{profissional.especialidade}<br />
                    <b>Nº do Conselho: </b>{profissional.NdoConselho}<br />
                    <b>Formação: </b>{profissional.formação}
                </div>

                <div className="py-2 px-8 mb-4">
                    <SubtittleForm SubTittle={"Identificação do Paciente:"} />

                    <InlineInput
                        TittleInput={"Nome do paciente"}
                        PlaceHolder={"Nome"}
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
                            TittleInput={"Peso"}
                            PlaceHolder={"00,00 kg"}
                            maxValue={500}
                            maxAlgarismo={6}
                            inputRef={inputRefs.peso}
                        />
                        <NumInput
                            TittleInput={"Altura"}
                            PlaceHolder={"00,00 m"} 
                            maxValue={2}
                            maxAlgarismo={6}
                            inputRef={inputRefs.altura}
                        />
                    </div>

                    <InlineInput
                        TittleInput={"Nome do pai"}
                        PlaceHolder={"Nome"}
                        inputRef={inputRefs.nomePai}
                    />

                    <InlineInput
                        TittleInput={"Nome da mãe"}
                        PlaceHolder={"Nome"}
                        inputRef={inputRefs.nomeMãe}
                    />

                    <ContactInput
                        TittleInput={"Contato dos responsáveis"}
                        inputRef={inputRefs.contato}
                    />

                <IrmãosInput ref={inputRefs.irmãos} />

                </div>

                <TittleForm Tittle={"2. DIAGNÓSTICO/HIPÓTESE DIAGNÓSTICA"}/>
                <div className="py-2 px-8 mt-2 flex justify-between">
                        <RadioInput
                            TittleInput={"Sem indicação diagnóstica"}
                            NameRadioInput={"diagnostico"}
                            IdRadioInput={"diagnostico"}
                            inputRef={inputRefs.Radio1IndicaçãoDiagnóstica}
                        />
                        <RadioInput
                            TittleInput={"Hipótese diagnóstica"}
                            NameRadioInput={"diagnostico"}
                            IdRadioInput={"diagnostico"}
                            inputRef={inputRefs.Radio1HipóteseDiagnóstica}
                        />
                        <RadioInput
                            TittleInput={"Diagnóstico concluído"}
                            NameRadioInput={"diagnostico"}
                            IdRadioInput={"diagnostico"}
                            inputRef={inputRefs.Radio1DiagnósticoConcluido}
                        />
                    </div>

                    <div className="py-2 px-8 mt-2 flex justify-between">
                        <RadioInput
                            TittleInput={"Opção 1"}
                            NameRadioInput={"opcoes"}
                            IdRadioInput={"opcoes"}
                            inputRef={inputRefs.Radio2Opcao1}
                        />
                        <RadioInput
                            TittleInput={"Opção 2"}
                            NameRadioInput={"opcoes"}
                            IdRadioInput={"opcoes"}
                            inputRef={inputRefs.Radio2Opcao2}
                        />
                        <RadioInput
                            TittleInput={"Opção 3"}
                            NameRadioInput={"opcoes"}
                            IdRadioInput={"opcoes"}
                            inputRef={inputRefs.Radio2Opcao3}
                        />
                    </div>
            </div>
            <button onClick={handleGeneratePDF} className='bg-green-500 text-white px-5 py-2 rounded-lg'>Gerar PDF</button>
        </div>
    );
};
