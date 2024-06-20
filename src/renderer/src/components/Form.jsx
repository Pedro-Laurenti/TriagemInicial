import React, { useRef } from 'react';
import InlineInput from './FormComponents';

const { ipcRenderer } = window;

export default function Form({ profissional, idForm }) {
    return (
        <div className="min-h-10 p-5 grid grid-cols-2 gap-8" id={idForm}>
            <LeftCol profissional={profissional} />
        </div>
    );
};

const LeftCol = () => {
    const nomeInputRef = useRef(null);

    const handleGeneratePDF = async () => {
        const nome = nomeInputRef.current.value;

        // Enviar pedido ao processo principal
        const result = await ipcRenderer.invoke('generate-pdf', nome);
        console.log(result);
    };
    
    return (
        <div className='bg-white p-5'>
            <div className="py-2 px-8 mb-4">
                <InlineInput TittleInput={"Nome do paciente"} PlaceHolder={"Nome"} inputRef={nomeInputRef} />
                <button onClick={handleGeneratePDF}>Gerar PDF</button>
            </div>
        </div>
    );
};
