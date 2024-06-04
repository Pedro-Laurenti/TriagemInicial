import PropTypes from 'prop-types'

const Form = ({ profissional }) => {
  return (
    <form className="min-h-10 p-5 grid grid-cols-2 gap-4 place-items-center align-bottom">
      <div className="bg-slate-100 w-full">
        <div>
          <h2 className="w-full py-2 bg-slate-700 text-white text-center font-semibold">
            1. IDENTIFICAÇÃO
          </h2>
          <div className="p-8">
            <h3 className="font-semibold mb-2">1.1 Identificação de Autoria:</h3>
            <p>Profissional: {profissional.nome}</p>
            <p>Especialidade: {profissional.especialidade}</p>
            <p>Nº do Conselho: {profissional.NdoConselho}</p>
            <p>Formação: {profissional.formação}</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-100 w-full">a</div>
    </form>
  )
}

Form.propTypes = {
  profissional: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    especialidade: PropTypes.string.isRequired,
    formação: PropTypes.string.isRequired,
    NdoConselho: PropTypes.string.isRequired
  }).isRequired
}

export default Form
