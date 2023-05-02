
import { PropTypes } from 'prop-types'

function FieldSelectBox({ label, options, value, onChange }) {
  return (
    <div className="form-group px-4 mb-4">
      <label htmlFor={name} className='block mb-1 text-md font-medium text-gray-900 dark:text-white'>
        {label}
      </label>
      <select
        className="form-control"
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}

FieldSelectBox.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired
}

export default FieldSelectBox