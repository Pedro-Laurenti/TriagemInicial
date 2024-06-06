import PropTypes from 'prop-types'
import LeftCol from './LeftCol'
import RigCol from './RigCol'

const Form = ({ profissional }) => {
  return (
    <form className="min-h-10 p-5 grid grid-cols-2 gap-4">
      <LeftCol profissional={profissional} />
      <RigCol />
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
