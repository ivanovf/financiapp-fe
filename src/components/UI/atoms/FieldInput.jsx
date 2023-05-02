import { PropTypes } from 'prop-types'

function FieldInput ({label, type = 'text', name, value, onChange}) {
  return (
    <div className="form-group px-4 mb-4">
      <label htmlFor={name} className='block mb-1 text-md font-medium text-gray-900 dark:text-white'>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </div>
  )
}

FieldInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
}

export default FieldInput