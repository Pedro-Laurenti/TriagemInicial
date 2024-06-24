import React, { useState, useImperativeHandle, forwardRef } from 'react'

export function InlineInput ({ TittleInput, PlaceHolder, inputRef }) {
    return (
        <div>
            <label>
                {TittleInput}
                <input
                    ref={inputRef}
                    className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-6"
                    placeholder={PlaceHolder}
                    type="text"
                />
            </label>
        </div>
    );
};


export function DateInput({ TittleInput, inputRef }) {
    return (
        <label>
            {TittleInput}
            <input
                ref={inputRef}
                className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-6"
                type="date"
            />
        </label>
        
    )
}

export function DateInputOutput({ TittleInput, birthdate, setBirthdate, age, setAge, validDate, setValidDate, inputRef }) {

    const handleInputChange = (event) => {
        const selectedDate = event.target.value;
        setBirthdate(selectedDate);

        const today = new Date();
        const birthDate = new Date(selectedDate);
        const isValid = birthDate <= today;
        setValidDate(isValid);

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
            years--;
            months += 12;
        }

        if (days < 0) {
            const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
            days += prevMonth.getDate();
            months--;
        }
        setAge({ years, months, days });
    };

    return (
        <label>
            {TittleInput}
            <input
                className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-6"
                type="date"
                value={birthdate}
                onChange={handleInputChange}
                ref={inputRef}
            />
        </label>
    );
}


export function NumInput({ TittleInput, PlaceHolder, maxValue, maxAlgarismo, inputRef }) {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        let newValue = event.target.value;

        // Verificar se o comprimento dos dígitos não excede maxAlgarismo
        if (newValue.length > maxAlgarismo) {
            newValue = newValue.slice(0, maxAlgarismo);
        }

        // Verificar se o valor está dentro do limite máximo permitido
        if (newValue === '' || (parseInt(newValue) >= 0 && parseInt(newValue) <= maxValue)) {
            setValue(newValue);
        }
    };

    return (
        <label className='w-full'>
            <section>
                {TittleInput}
                <input
                    className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-6"
                    placeholder={PlaceHolder}
                    type="number"
                    value={value}
                    onChange={handleChange}
                    max={maxValue}
                    name=""
                    id=""
                    ref={inputRef}
                />
            </section>
        </label>
    );
}

import { InputMask, type Track } from '@react-input/mask';

export function ContactInput({ TittleInput, inputRef }) {
    const track: Track = ({ inputType, value, data, selectionStart, selectionEnd }) => {
        if (inputType === 'insert' && !/^\D*/.test(data) && selectionStart <= 1) {
        return `1${data}`;
        }
    
        if (inputType !== 'insert' && selectionStart <= 1 && selectionEnd < value.length) {
        if (selectionEnd > 2) {
            return '1';
        }
        if (selectionEnd === 2) {
            return false;
        }
        }
    
        return data;
    };

    return (

        <label>
            {TittleInput}
            <InputMask
                className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-4"
                placeholder="(00) 00000-0000"
                mask="(__) _____-____"
                replacement={{ _: /\d/ }}
                track={track}
                ref={inputRef}
            />
        </label>
    )
}

export function IrmãosInput(props, ref) {
    const [siblings, setSiblings] = useState(['']);

    useImperativeHandle(ref, () => ({
        getSiblings: () => siblings
    }));

    const addSiblingInput = () => {
        setSiblings([...siblings, '']);
    };

    const removeSiblingInput = (index) => {
        const updatedSiblings = siblings.filter((_, idx) => idx !== index);
        setSiblings(updatedSiblings);
    };

    const handleSiblingInputChange = (index, event) => {
        const updatedSiblings = [...siblings];
        updatedSiblings[index] = event.target.value;
        setSiblings(updatedSiblings);
    };

    return (
        <section>
            Irmãos
            <div className="w-full flex flex-row items-center mb-2">
                <input
                    className="border border-slate-300 rounded w-full px-4 py-2 text-slate-600"
                    placeholder="Irmão"
                    type="text"
                    value={siblings[0]}
                    onChange={(event) => handleSiblingInputChange(0, event)}
                />
                <button
                    type="button"
                    onClick={addSiblingInput}
                    className="font-bold hover:text-white hover:bg-emerald-600 text-emerald-600 border border-emerald-600 p-2 rounded ml-2 text-center min-w-8">
                    +
                </button>
            </div>
            {siblings.slice(1).map((sibling, index) => (
                <div key={index + 1} className="relative w-full flex flex-row items-center mb-2">
                    <input
                        className="border w-full border-slate-300 rounded px-4 py-2 text-slate-600"
                        placeholder="Irmão"
                        type="text"
                        value={sibling}
                        onChange={(event) => handleSiblingInputChange(index + 1, event)}
                    />
                    <button
                        type="button"
                        onClick={() => removeSiblingInput(index + 1)}
                        className="font-bold hover:text-white hover:bg-red-500 text-red-500 border border-red-500 p-2 rounded ml-2 text-center min-w-8">
                        -
                    </button>
                </div>
            ))}
        </section>
    );
}

export default forwardRef(IrmãosInput);

export function RadioInput({ TittleInput, NameRadioInput, IdRadioInput, inputRef }) {
    return (
        <label>
            <input
                className="mr-2"
                type="radio"
                name={NameRadioInput}
                id={IdRadioInput}
                ref={inputRef}
            />
            {TittleInput}
        </label>
    )
}

export function CheckBoxInput({ TittleInput, NameCheckInput, IdCheckInput }) {
    return (
        <label>
            <input className="mr-2" type='checkbox' name={NameCheckInput} id={IdCheckInput} />
            {TittleInput}
        </label>
    )
}

export function SimpleTextInput({ TittleInput, placeholder }) {
    return (
            <div className="py-2 my-4">
                {TittleInput}
                <textarea
                    className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 my-4"
                    id="textarea"
                    name="textarea"
                    placeholder={placeholder}
                    rows={4}
                    cols={50} />
            </div>
        
    )
}

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TittleForm, { SubtittleForm } from './TittleForm';

export function RichTextInput({className}) {
    return(
        <div className={className}>
            <CKEditor
                editor={ ClassicEditor }
                config={{         
                    toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'numberedList', 'bulletedList', 'imageUpload', 'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|', 'undo', 'redo']
                }}  
                onChange={ ( event ) => {
                    console.log( event );
                } }
                
                />
        </div>
    )


}

export function GroupSelectInput({ titleInput, options }) {
    return (
        <div>
            {titleInput && <div>{titleInput}</div>}
            <label>
                <select className="bg-white border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2">
                    {options.map((group:any, index:any) => (
                        group.label ? (
                            <optgroup key={index} label={group.label}>
                                {group.options.map((option:any, idx:any) => (
                                    <option key={idx} value={option.value}>
                                        {option.content}
                                    </option>
                                ))}
                            </optgroup>
                        ) : (
                            group.options.map((option:any, idx:any) => (
                                <option key={idx} value={option.value}>
                                    {option.content}
                                </option>
                            ))
                        )
                    ))}
                </select>
            </label>
        </div>
    );
}

interface Question {
    question: string;
    name: string;
    options: string[];
    followUp?: {
        value: string;
        question: string;
        inputType: string;
        inputName: string;
    };
}

interface BooleanRadioInputProps {
    questions: Question[];
}

export function BooleanRadioInput({ questions }) {
    const [followUpDetails, setFollowUpDetails] = useState({});

    const handleRadioChange = (event, followUp, name) => {
        if (followUp) {
            setFollowUpDetails((prevDetails) => ({
                ...prevDetails,
                [name]: event.target.value === followUp.value,
            }));
        }
    };

    return (
        <div className="mb-2">
            {questions.map((q, index) => (
                <div key={index} className="mb-4 flex flex-col justify-between">
                    {q.question}
                    <section className="flex gap-10">
                        {q.options.map((option, idx) => (
                            <label key={idx}>
                                <input
                                    className="mr-2"
                                    type="radio"
                                    name={q.name}
                                    value={option.toLowerCase()}
                                    onChange={(e) => handleRadioChange(e, q.followUp, q.name)}
                                />
                                {option}
                            </label>
                        ))}
                    </section>
                    {followUpDetails[q.name] && q.followUp && (
                        <div className="mt-2">
                            <label>
                                {q.followUp.question}
                                <input
                                    className="p-1 border rounded w-full"
                                    type={q.followUp.inputType}
                                    name={q.followUp.inputName}
                                />
                            </label>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export function TriagemNeonatal ({ initialCheckboxes }) {
    const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

    const handleCheckboxChange = (id) => {
        setCheckboxes((prevCheckboxes) =>
            prevCheckboxes.map((checkbox) =>
                checkbox.id === id
                    ? { ...checkbox, isChecked: !checkbox.isChecked }
                    : checkbox
            )
        );
    };

    return (
        <div className="my-8 ">
            <SubtittleForm SubTittle={"Triagem Neonatal"} />
            {checkboxes.map((checkbox: { id: React.Key | null | undefined; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; isChecked: any; radios: any[]; }) => (
                <div key={checkbox.id} className="grid grid-cols-2">
                    <p>{checkbox.label}</p>
                    <label>
                        <input
                            type="checkbox"
                            name={`checkbox-${checkbox.id}`}
                            id={`checkbox-${checkbox.id}`}
                            className="mr-2"
                            checked={checkbox.isChecked || false}
                            onChange={() => handleCheckboxChange(checkbox.id)}
                        />
                        Realizou?
                    </label>
                    {checkbox.isChecked && (
                        <section className="grid grid-cols-1 mb-2">
                            {checkbox.radios.map((radioLabel, index) => (
                                <label key={index}>
                                    <input
                                        className="ml-2 mb-2"
                                        type="radio"
                                        name={`radio-${checkbox.id}`}
                                        id={`${radioLabel.toLowerCase()}-${checkbox.id}`}
                                    />{' '}
                                    {radioLabel}
                                </label>
                            ))}
                        </section>
                    )}
                </div>
            ))}
        </div>
    );
};





export function ExamesSelect ({ initialSelects }) {
    const [selects, setSelects] = useState(initialSelects);

    const handleSelectChange = (id, value) => {
        setSelects((prevSelects) =>
            prevSelects.map((select) =>
                select.id === id
                    ? { ...select, selected: value }
                    : select
            )
        );
    };

    return (
        <div className="py-2 mt-2">
            {selects.map((select) => (
                <div key={select.id} className="grid grid-cols-2 mb-4">
                    <b>{select.label}</b>
                    <label>
                        <select
                            name={`select-${select.id}`}
                            id={`select-${select.id}`}
                            className="bg-white border border-slate-300 rounded px-4 py-2 text-slate-600 mb-2 w-full"
                            value={select.selected}
                            onChange={(e) => handleSelectChange(select.id, e.target.value)}
                        >
                            {select.options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                    {select.selected !== 'Não Realizou' && (
                        <section className="w-full col-span-2 flex gap-5 justify-end">
                            {select.radios.map((radioLabel, index) => (
                                <label key={index}>
                                    <input
                                        className=""
                                        type="radio"
                                        name={`radio-${select.id}`}
                                        id={`${radioLabel.toLowerCase()}-${select.id}`}
                                    />{' '}
                                    {radioLabel}
                                </label>
                            ))}
                        </section>
                    )}
                </div>
            ))}
        </div>
    );
};