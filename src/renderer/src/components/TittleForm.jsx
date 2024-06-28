import PropTypes from 'prop-types'

export default function TittleForm({ Tittle }) {
  return <h2 className="w-full py-2 bg-slate-700 text-white text-center font-semibold">{Tittle}</h2>
}

export function SubtittleForm({ SubTittle }) {
  return <h3 className="mb-3 text-xl mt-10">{SubTittle}</h3>
}

TittleForm.propTypes = {
  Tittle: PropTypes.any
}

SubtittleForm.propTypes = {
  SubTittle: PropTypes.any
}
