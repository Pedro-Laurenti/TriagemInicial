import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import LeftCol from './LeftCol';
import RigCol from './RigCol';

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
            <LeftCol profissional={profissional} ref={leftColRef}/>
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
