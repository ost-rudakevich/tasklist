import { FC } from 'react'
import '../../assets/react-select.scss'
import { IOption, ISelect } from './select-component.interface'
import ReactSelect, { OnChangeValue } from 'react-select'

const SelectComponent: FC<ISelect> = ({
  field,
  options,
  placeholder,
  isMulti,
  isLoading,
  error
}) => {
  const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
    field.onChange(
      isMulti
        ? (newValue as IOption[]).map((item: IOption) => item.value)
        : (newValue as IOption).value
    )
  }

  const getValue = () => {
    if (field.value) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value)
    } else {
      return isMulti ? [] : ''
    }
  }
  return (
    <div className='flex flex-col h-20 w-56 text-black'>
      <ReactSelect
        classNamePrefix='custom-select'
        placeholder={placeholder}
        options={options}
        value={getValue()}
        onChange={onChange}
        isMulti={isMulti}
        isLoading={isLoading}
      />
      {error && (
        <div className='text-primary font-medium text-sm mt-2 pl-1 w-full'>
          {error}
        </div>
      )}
    </div>
  )
}

export default SelectComponent
