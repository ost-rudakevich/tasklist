import { forwardRef } from 'react'
import { IField } from './field.interface'
import cn from 'clsx'

const Field = forwardRef<HTMLInputElement, IField>(
  (
    {
      placeholder,
      error,
      className,
      type = 'text',
      style,
      Icon,
      iconSide,
      handleSearch,
      ...rest
    },
    ref
  ) => {
    return (
      <div className='w-full flex flex-col h-auto' style={style}>
        <div className='w-full flex items-center gap-x-5 rounded-lg bg-white px-3 py-2 shadow-md'>
          {Icon && iconSide === 'left' && (
            <div className='bg-primary p-2 rounded-lg' onClick={handleSearch}>
              <Icon className='w-5 h-5 text-white' />
            </div>
          )}

          <input
            className={cn(
              'w-full h-full outline-none px-2  bg-white text-lg !text-black',
              {
                ['border-b-primary border-b-2']: error
              }
            )}
            autoComplete='off'
            ref={ref}
            type={type}
            placeholder={placeholder}
            {...rest}
          />

          {Icon && iconSide === 'right' && (
            <div className='bg-primary p-2 rounded-lg' onClick={handleSearch}>
              <Icon className='w-5 h-5 text-white' />
            </div>
          )}
        </div>

        {error && (
          <div className='text-primary px-2 ml-2 text-base mt-1 z-10'>
            {error}
          </div>
        )}
      </div>
    )
  }
)

Field.displayName = 'Field'

export default Field
