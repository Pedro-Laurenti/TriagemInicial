import React, { useState } from 'react'
import InputMask from 'react-input-mask'

export default function InlineInput({TittleInput, PlaceHolder}) {
    return (
        <label>
            <b>{TittleInput}</b>
            <input
                className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
                placeholder={PlaceHolder}
                type="text"
                name=""
                id=""
            />
        </label>
        
    )
}


export function DateInput({ TittleInput,ValueInput,InputHandle }) {
    return (
        <label>
            <b>{TittleInput}</b>
            <input
                className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
                placeholder="Nome"
                type="date"
                value={ValueInput}
                onChange={InputHandle}
            />
        </label>
        
    )
}

export function NumInput({ TittleInput,PlaceHolder }) {
    return (
        <label>
            <section>
                <b>{TittleInput}</b>
                <input
                    className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
                    placeholder={PlaceHolder}
                    type="number"
                    name=""
                    id=""/>
            </section>
        </label>
        
    )
}

export function ContactInput({ TittleInput }) {
    return (
        <label>
            <b> {TittleInput} </b>
            <InputMask
                className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
                type="text"
                mask="(99) 99999-9999"
                placeholder="(00) 00000-0000"></InputMask>
        </label>
        
    )
}

export function IrmãosInput() {
    const [siblings,setSiblings] = useState([''])

    const addSiblingInput = () => {
        setSiblings([
            ...siblings,
            ''
        ])
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

    return (
        <>
            <b>Irmãos</b>
            <br/>
            <div className="w-full flex flex-row items-center mb-2">
                <input
                    className="border border-slate-300 rounded w-full px-4 py-2 text-slate-600"
                    placeholder="Irmão"
                    type="text"/>
                <button
                    type="button"
                    onClick={addSiblingInput}
                    className="font-bold hover:text-white hover:bg-emerald-600 text-emerald-600 border border-emerald-600 p-2 rounded ml-2 text-center min-w-8">
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
                        onChange={(event) => handleSiblingInputChange(index, event)}/>
                    <button
                        type="button"
                        onClick={() => removeSiblingInput(index)}
                        className="font-bold hover:text-white hover:bg-red-500 text-red-500 border border-red-500 p-2 rounded ml-2 text-center min-w-8">
                        -
                    </button>
                    <button
                        type="button"
                        onClick={addSiblingInput}
                        className="font-bold hover:text-white hover:bg-emerald-600 text-emerald-600 border border-emerald-600 p-2 rounded ml-2 text-center min-w-8">
                        +
                    </button>
                </div>
            ))}
        </>
    )
}

export function RadioInput({ TittleInput, NameRadioInput, IdRadioInput }) {
    return (
        <label>
            <input className="mr-2" type="radio" name={NameRadioInput} id={IdRadioInput} />
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
            <div className="py-2 px-8 mt-2">
                {TittleInput}
                <textarea
                    className="border border-slate-300 rounded px-4 py-2 w-full text-slate-600 mb-2"
                    id="textarea"
                    name="textarea"
                    placeholder={placeholder}
                    rows={4}
                    cols={50} />
            </div>
        
    )
}
