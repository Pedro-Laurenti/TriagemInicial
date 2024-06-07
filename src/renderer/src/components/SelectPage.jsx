import React from 'react'
import {useNavigate} from 'react-router-dom'
import LogoTLK from '../assets/1-2-logo-white.svg'

const SelectPage = ({profissionais, onProfissionalChange}) => {
    const navigate = useNavigate()

    const handleChange = (event) => {
        onProfissionalChange(event)
        navigate('/form')
    }

    return (
        <div className="m-5 p-2 h-full border-sky-700 border-2 rounded-lg ">
            <div
                className="bg-sky-500 h-full w-full py-5 px-20 text-white grid grid-cols-1 gap-4 place-items-center align-bottom rounded-lg">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold">TRIAGEM INICIAL INFANTIL</h2>
                    <h4 className="text-2xl">Rede de Clínicas - Therapies Love Kids</h4>
                </div>
                <img alt="logo" className="logo h-20" src={LogoTLK}/>
                <label className="w-4/5">
                    <select
                        className="bg-white text-gray-700 rounded-lg h-10 w-full px-5"
                        onChange={handleChange}>
                        <option value="">Selecione o Profissional</option>
                        {profissionais.map((profissional) => (
                            <option key={profissional.id} value={profissional.id}>
                                {profissional.nome}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    )
}

export default SelectPage

// import React, {useState} from 'react'
// import {useNavigate} from 'react-router-dom'
// import LogoTLK from '../assets/1-2-logo-white.svg'

// const SelectPage = ({profissionais, onProfissionalChange}) => {
//     const navigate = useNavigate()
//     const [selectedProfissional,
//         setSelectedProfissional] = useState("")
//     const [senha,
//         setSenha] = useState("")

//     const handleSelectChange = (event) => {
//         const value = event.target.value
//         setSelectedProfissional(value)
//         onProfissionalChange(event)
//     }

//     const handlePasswordChange = (event) => {
//         setSenha(event.target.value)
//     }

//     const handleButtonClick = () => {
//         if (selectedProfissional && senha) {
//             navigate('/form')
//         } else {
//             alert("Por favor, selecione um profissional e insira a senha.")
//         }
//     }

//     return (
//         <div className="h-screen overflow-hidden">
//             <div className="bg-sky-500 h-full w-full py-5 px-20 text-white grid grid-cols-1 gap-4 place-items-center align-bottom">
//                 <img alt="logo" className="logo h-40" src={LogoTLK}/>
//                 <div className="text-center">
//                     <h2 className="text-4xl font-extrabold">TRIAGEM INICIAL INFANTIL</h2>
//                     <h4 className="text-2xl">Rede de Clínicas - Therapies Love Kids</h4>
//                 </div>
//                 <label className="w-4/5">
//                     <select
//                         className="bg-white text-gray-700 rounded-lg h-10 w-full px-5"
//                         onChange={handleSelectChange}>
//                         <option value="">Selecione o Profissional</option>
//                         {profissionais.map((profissional) => (
//                             <option key={profissional.id} value={profissional.id}>
//                                 {profissional.nome}
//                             </option>
//                         ))}
//                     </select>
//                     <input
//                         className="bg-white text-gray-700 rounded-lg h-10 w-full px-5 mt-2"
//                         placeholder="Senha de acesso"
//                         type="password"
//                         value={senha}
//                         onChange={handlePasswordChange}/>
//                 </label>
//                 <button
//                     className="bg-white text-gray-700 rounded-lg h-10 w-4/5 px-5 mt-2"
//                     onClick={handleButtonClick}>
//                     Entrar
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default SelectPage