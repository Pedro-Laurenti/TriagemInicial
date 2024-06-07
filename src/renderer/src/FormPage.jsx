import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './components/Form';
import LogoTLK from './assets/1-2-logo-white.svg';

const FormPage = ({ profissionalSelecionado }) => {
    const navigate = useNavigate();
    const formRef = useRef();

    return (
        <div>
            <div className="m-5 p-2 border-sky-700 border-2 rounded-lg" ref={formRef}>
                <div
                    className="bg-sky-500 h-full w-full py-5 px-20 text-white grid grid-cols-3 gap-4 place-items-center align-bottom rounded-lg">
                    <label className="w-4/5"></label>
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold">TRIAGEM INICIAL INFANTIL</h2>
                        <h4 className="text-2xl">Rede de Clínicas - Therapies Love Kids</h4>
                    </div>
                    <img alt="logo" className="logo h-20" src={LogoTLK} />
                </div>
                {profissionalSelecionado && <Form profissional={profissionalSelecionado} />}
            </div>
            <div className="mt-5 flex justify-center space-x-4">
                <button
                    className="border border-red-500 w-1/3 bg-red-500 text-white py-2 px-4 rounded-lg"
                    onClick={() => navigate('/')}>
                    Sair
                </button>
            </div>
        </div>
    );
};

export default FormPage;
