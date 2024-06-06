import {useState} from 'react'

const RigCol = () => {
    const [birthdate,
        setBirthdate] = useState('')

    const handleInputChange = (event) => {
        const selectedDate = event.target.value
        setBirthdate(selectedDate)
    }

    const [isDesired,
        setIsDesired] = useState(null)

    const handleRadioChange = (event) => {
        setIsDesired(event.target.value === 'yes')
    }

    const [checkboxes,
        setCheckboxes] = useState([
        {
            id: 1,
            label: 'Teste do Pezinho',
            radios: ['Normal', 'Alterado']
        }, {
            id: 2,
            label: 'Teste do Olhinho',
            radios: ['Normal', 'Alterado']
        }, {
            id: 3,
            label: 'Teste da Orelhinha',
            radios: ['Normal', 'Alterado']
        }, {
            id: 4,
            label: 'Teste da Linguinha',
            radios: ['Normal', 'Alterado']
        },

        // Add more checkboxes here as needed
    ]);

    const handleCheckboxChange = (id) => {
        setCheckboxes((prevCheckboxes) => prevCheckboxes.map((checkbox) => checkbox.id === id
            ? {
                ...checkbox,
                isChecked: !checkbox.isChecked
            }
            : checkbox));
    };

    const [selects,
        setSelects] = useState([
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
        }, {
            id: 2,
            label: 'Oftalmológico',
            options: [
                'Não Realizou', 'Acuidade Visual', 'Tonometria'
            ],
            selected: 'Não Realizou',
            radios: ['Alterado', 'Não Alterado']
        }, {
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
        }, {
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
        },
        // Add more select boxes here as needed
    ]);

    const handleSelectChange = (id, value) => {
        setSelects((prevSelects) => prevSelects.map((select) => select.id === id
            ? {
                ...select,
                selected: value
            }
            : select));
    };

    return (
        <div>
            <div>
                <h2 className="w-full py-2 bg-slate-700 text-white text-center font-semibold">
                    5. DEMANDAS PRINCIPAIS RELATADAS
                </h2>
                <textarea
                    className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
                    id="textarea"
                    name="textarea"
                    placeholder="Demandas principais."
                    rows="7"
                    cols="50"></textarea>
            </div>
            <div>
                <h2 className="w-full py-2 bg-slate-700 text-white text-center font-semibold">
                    6. HISTÓRICO GESTACIONAL E NATAL
                </h2>
                <div className="py-2 px-8 mt-2">
                    <b>Semanas de gestação:</b>
                    <label>
                        <select
                            className="bg-white border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2">
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
                                <input className="mr-2" type="radio" name="2" id=""/>
                                Cesáreo
                            </label>
                            <label>
                                <input className="mr-2" type="radio" name="2" id=""/>
                                Natural
                            </label>
                            <label>
                                <input className="mr-2" type="radio" name="2" id=""/>
                                Fórceps
                            </label>
                        </section>
                    </div>
                    <div className="mt-2 flex justify-between">
                        <b>A gestação foi planejada?</b>
                        <section className="flex flex-row gap-10">
                            <label>
                                <input className="mr-2" type="radio" name="3" id=""/>
                                Sim
                            </label>
                            <label>
                                <input className="mr-2" type="radio" name="3" id=""/>
                                Não
                            </label>
                        </section>
                    </div>
                    <div className="mt-2 flex justify-between">
                        <b>A gestação foi desejada?</b>
                        <section className="flex flex-row gap-10">
                            <label>
                                <input className="mr-2" type="radio" name="4" id=""/>
                                Sim
                            </label>
                            <label>
                                <input className="mr-2" type="radio" name="4" id=""/>
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
                                    onChange={handleRadioChange}/>
                                Sim
                            </label>
                            <label>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    name="gestation"
                                    value="no"
                                    onChange={handleRadioChange}/>
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
                                    name="explanation"/>
                            </label>
                        </div>
                    )}
                </div>
                <div className="py-2 px-8 mt-4 space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <b className="w-40">Apgar 1º min:</b>
                            <input className="flex-1 p-2 border rounded" type="text" name="apgar1"/>
                        </div>
                        <div className="flex items-center gap-4">
                            <b className="w-40">Apgar 5º min:</b>
                            <input className="flex-1 p-2 border rounded" type="text" name="apgar5"/>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <b className="w-40">Peso ao Nascer:</b>
                            <input className="flex-1 p-2 border rounded" type="number" name="peso"/>
                        </div>
                        <div className="flex items-center gap-4">
                            <b className="w-40">Altura ao Nascer:</b>
                            <input className="flex-1 p-2 border rounded" type="number" name="altura"/>
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
                        rows="2"
                        cols="50"></textarea>
                </div>
                <div className="py-2 px-8 mt-2">
                    <b>Houveram intercorrências/complicações durante o parto</b>
                    <textarea
                        className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
                        id="textarea"
                        name="textarea"
                        placeholder="Escreva as observações aqui."
                        rows="2"
                        cols="50"></textarea>
                </div>
                <div className="py-2 px-8 mt-2">
                    <b>Houveram intercorrências/complicações após o nascimento</b>
                    <textarea
                        className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
                        id="textarea"
                        name="textarea"
                        placeholder="Escreva as observações aqui."
                        rows="2"
                        cols="50"></textarea>
                </div>
                <div className="py-2 px-8 mt-2 ">
                    <b>Triagem Neonatal</b>
                    {checkboxes.map((checkbox) => (
                        <div key={checkbox.id} className="grid grid-cols-3">
                            <p>{checkbox.label}</p>
                            <label>
                                <input
                                    type="checkbox"
                                    name={`checkbox-${checkbox.id}`}
                                    id={`checkbox-${checkbox.id}`}
                                    className="mr-2"
                                    checked={checkbox.isChecked || false}
                                    onChange={() => handleCheckboxChange(checkbox.id)}/>
                                Realizou?
                            </label>
                            {checkbox.isChecked && (
                                <section className='grid grid-cols-2'>
                                    {checkbox
                                        .radios
                                        .map((radioLabel, index) => (
                                            <label key={index}>
                                                <input
                                                    className="mr-2"
                                                    type="radio"
                                                    name={`radio-${checkbox.id}`}
                                                    id={`${radioLabel.toLowerCase()}-${checkbox.id}`}/> {radioLabel}
                                            </label>
                                        ))}
                                </section>
                            )}
                        </div>
                    ))}
                </div>
                <div className="py-2 px-8 mt-2">
                    <b>Observações Pertinentes</b>
                    <textarea
                        className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
                        id="textarea"
                        name="textarea"
                        placeholder="Escreva as observações aqui."
                        rows="4"
                        cols="50"></textarea>
                </div>
            </div>
            <div>
                <h2 className="w-full py-2 bg-slate-700 text-white text-center font-semibold">
                    7. HISTÓRICO DE SAÚDE
                </h2>
                <div className="py-2 px-8 mt-2">
                    <b>Exames clínicos realizados</b>
                </div>
                <div className="py-2 px-8 mt-2">
                    {selects.map((select) => (
                        <div key={select.id} className="grid grid-cols-3 mb-4">
                            <b>{select.label}</b>
                            <label>
                                <select
                                    name={`select-${select.id}`}
                                    id={`select-${select.id}`}
                                    className="mr-2 w-3/4 bg-white border border-slate-300 rounded px-4 py-2 text-slate-600 mb-2"
                                    value={select.selected}
                                    onChange={(e) => handleSelectChange(select.id, e.target.value)}>
                                    {select
                                        .options
                                        .map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                </select>
                            </label>
                            {select.selected !== 'Não Realizou' && (
                                <section className="grid grid-cols-2">
                                    {select
                                        .radios
                                        .map((radioLabel, index) => (
                                            <label key={index}>
                                                <input
                                                    className="mr-2"
                                                    type="radio"
                                                    name={`radio-${select.id}`}
                                                    id={`${radioLabel.toLowerCase()}-${select.id}`}/> {radioLabel}
                                            </label>
                                        ))}
                                </section>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RigCol
