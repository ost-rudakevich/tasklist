import { FC, PropsWithChildren } from 'react'
import { IButton } from './button.interface'
import cn from 'clsx'

const Button: FC<PropsWithChildren<IButton>> = ({
  children,
  variant,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cn(
        '!rounded-lg !font-medium !shadow-md !px-4 !py-2',
        {
          '!bg-primary !text-white': variant === 'primary',
          '!bg-white !text-black': variant === 'white',
          '!bg-gray-600 !text-white': variant === 'gray'
        },
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
