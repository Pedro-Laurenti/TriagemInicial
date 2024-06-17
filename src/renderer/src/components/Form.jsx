import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react'

import TittleForm, { SubtittleForm } from './TittleForm';

import RigCol from './RigCol';
import InlineInput, { CheckBoxInput, ContactInput, DateInput, IrmãosInput, NumInput, RadioInput, SimpleTextInput } from './FormComponents';

const Form = ({ profissional }) => {
    const leftColRef = useRef(null);
    const rigColRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const leftColData = leftColRef.current.getFormData();
        const rigColData = rigColRef.current.getFormData();

        const formData = {
            name: profissional.nome,
            ...leftColData,
            ...rigColData,
        };
        window.api.generatePdf(formData);
    }

    return (
        <form className="min-h-10 p-5 grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            
            <LeftCol profissional={profissional}/>
            
            <RigCol ref={rigColRef}/>
            <button
                type="submit"
                id="generate-pdf"
                className="col-span-2 bg-green-500 text-white p-2 rounded">
                Gerar PDF
            </button>
        </form>
    );
};

const LeftCol = ({profissional}) => {
    const [birthdate,setBirthdate] = useState('')
    const [age,setAge] = useState({years: null, months: null, days: null})
    const [validDate,setValidDate] = useState(true)

    const handleInputChange = (event) => {
        const selectedDate = event.target.value
        setBirthdate(selectedDate)

        const today = new Date()
        const birthDate = new Date(selectedDate)
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
        setAge({years, months, days})
    }

    return (
        <div>
            
            <TittleForm Tittle={"1. IDENTIFICAÇÃO"}/>
            <div className="py-2 px-8 mt-2">
                
                <SubtittleForm SubTittle={"Identificação de Autoria:"} />
                <b>Profissional: </b>
                <code>{profissional.nome}</code>
                <br/>
                <b>Especialidade: </b>
                <code>{profissional.especialidade}</code>
                <br/>
                <b>Nº do Conselho: </b>
                <code>{profissional.NdoConselho}</code>
                <br/>
                <b>Formação: </b>
                <code>{profissional.formação}</code>
                <br/>
            </div>
            <div className="py-2 px-8 mt-2">
                <SubtittleForm SubTittle={"Identificação do Paciente:"} />

                <InlineInput TittleInput={"Nome do paciente"} PlaceHolder={"Nome"} />
                <DateInput TittleInput={"Data de nascimento"} ValueInput={birthdate} InputHandle={handleInputChange} />
                <b>Idade atual</b>
                <div
                    className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2">
                    {validDate
                        ? `${
                    age.years !== null
                        ? `${age.years} anos, ${age.months} meses e ${age.days} dias`
                        : 'Idade calculada'}` : 'Formato inválido'}
                </div>

                <div className="grid grid-cols-2 gap-4 place-items-begin align-bottom">
                    <NumInput TittleInput={"Peso"} PlaceHolder={"00,00 kg"} />
                    <NumInput TittleInput={"Altura"} PlaceHolder={"00,00 m"} />
                </div>


                <InlineInput TittleInput={"Nome do pai"} PlaceHolder={""} />
                <InlineInput TittleInput={"Nome da mãe"} PlaceHolder={""} />
                <ContactInput TittleInput={"Contato dos responsáveis"} />

                <IrmãosInput />

            </div>


            <TittleForm Tittle={"2. DIAGNÓSTICO/HIPÓTESE DIAGNÓSTICA"}/>
            <div className="py-2 px-8 mt-2 flex justify-between">
                <RadioInput TittleInput={"Sem indicação diagnóstica"} NameRadioInput={"diagnostico"} IdRadioInput={"diagnostico"} />
                <RadioInput TittleInput={"Hipótese diagnóstica"} NameRadioInput={"diagnostico"} IdRadioInput={"diagnostico"} />
                <RadioInput TittleInput={"Diagnóstico concluído"} NameRadioInput={"diagnostico"} IdRadioInput={"diagnostico"} />
            </div>
            <SimpleTextInput placeholder={"Escreva as observações aqui."} />

            <TittleForm Tittle={"3. DISCIPLINAS REQUERIDAS"}/>
            <div className="py-2 px-8 mt-2 grid grid-cols-3 gap-4 justify-between">
                <CheckBoxInput TittleInput={"Psicologia"} NameCheckInput={"disciplinas"} IdCheckInput={"disciplinas"} />
                <CheckBoxInput TittleInput={"Terapia ocupacional"} NameCheckInput={"disciplinas"} IdCheckInput={"disciplinas"} />
                <CheckBoxInput TittleInput={"Fisioterapia"} NameCheckInput={"disciplinas"} IdCheckInput={"disciplinas"} />
                <CheckBoxInput TittleInput={"Musicoterapia"} NameCheckInput={"disciplinas"} IdCheckInput={"disciplinas"} />
                <CheckBoxInput TittleInput={"Fonoaudiologia"} NameCheckInput={"disciplinas"} IdCheckInput={"disciplinas"} />
                <CheckBoxInput TittleInput={"Neuropsicologia"} NameCheckInput={"disciplinas"} IdCheckInput={"disciplinas"} />
                <CheckBoxInput TittleInput={"Psicomotricidade"} NameCheckInput={"disciplinas"} IdCheckInput={"disciplinas"} />
            </div>
        
        
            <TittleForm Tittle={"4. HISTÓRICO DE ACOMPANHAMENTO"}/>
            <div className="py-2 px-8 mt-2">
            <InlineInput TittleInput={"Encaminhado por"} PlaceHolder={""} />
            <DateInput TittleInput={"Data da última consulta"} ValueInput={""} InputHandle={""} />

                <b>Acompanhamentos profissionais já realizados anteriormente</b>
                <div className="py-2 px-8 my-3 grid grid-cols-3 gap-4 justify-between">
                    <CheckBoxInput TittleInput={"Psicologia"} NameCheckInput={"acompanhamentos"} IdCheckInput={"acompanhamentos"} />
                    <CheckBoxInput TittleInput={"Fonoaudiologia"} NameCheckInput={"acompanhamentos"} IdCheckInput={"acompanhamentos"} />
                    <CheckBoxInput TittleInput={"Terapia ocupacional"} NameCheckInput={"acompanhamentos"} IdCheckInput={"acompanhamentos"} />
                    <CheckBoxInput TittleInput={"Fisioterapia"} NameCheckInput={"acompanhamentos"} IdCheckInput={"acompanhamentos"} />
                    <CheckBoxInput TittleInput={"Neuropsicologia"} NameCheckInput={"acompanhamentos"} IdCheckInput={"acompanhamentos"} />
                    <CheckBoxInput TittleInput={"Psicomotricidade"} NameCheckInput={"acompanhamentos"} IdCheckInput={"acompanhamentos"} />
                    <CheckBoxInput TittleInput={"Musicoterapia"} NameCheckInput={"acompanhamentos"} IdCheckInput={"acompanhamentos"} />
                    <CheckBoxInput TittleInput={"Nutricionista"} NameCheckInput={"acompanhamentos"} IdCheckInput={"acompanhamentos"} />
                    <CheckBoxInput TittleInput={"Avaliação Neuropsicológica"} NameCheckInput={"acompanhamentos"} IdCheckInput={"acompanhamentos"} />
                    <CheckBoxInput TittleInput={"Geneticista"} NameCheckInput={"acompanhamentos"} IdCheckInput={"acompanhamentos"} />
                    <CheckBoxInput TittleInput={"Psiquiatra"} NameCheckInput={"acompanhamentos"} IdCheckInput={"acompanhamentos"} />
                    <CheckBoxInput TittleInput={"Dentista"} NameCheckInput={"acompanhamentos"} IdCheckInput={"acompanhamentos"} />
                </div>

                <b>Observações acerca dos acompanhamentos anteriores</b>

                
                <textarea
                    className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
                    id="textarea"
                    name="textarea"
                    placeholder="Escreva as observações aqui."
                    rows="4"
                    cols="50"></textarea>
            </div>
        </div>
    )
}

LeftCol.propTypes = {
    profissional: PropTypes
        .shape({id: PropTypes.number.isRequired, nome: PropTypes.string.isRequired, especialidade: PropTypes.string.isRequired, formação: PropTypes.string.isRequired, NdoConselho: PropTypes.string.isRequired})
        .isRequired
}


Form.propTypes = {
    profissional: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
        especialidade: PropTypes.string.isRequired,
        formação: PropTypes.string.isRequired,
        NdoConselho: PropTypes.string.isRequired,
    }).isRequired,
};

export default Form;
