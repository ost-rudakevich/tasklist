import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthProps } from './auth-form.interface'
import { MdOutlineMailOutline } from 'react-icons/md'
import { MdLockOutline } from 'react-icons/md'
import { LuPenLine } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import AuthHeader from '../auth-header/AuthHeader'
import { AuthEnum } from '../auth.interface'
import {
  useLoginMutation,
  useRegisterMutation
} from '../../../../services/auth/auth.service'
import { IAuthData } from '../../../../types/auth.types'
import Button from '../../../../ui/button/Button'
import Loading from '../../../../ui/loading/Loading'
import Field from '../../../../ui/field/Field'
import { validEmail } from '../../../../utils/valid-email'
import { hasErrorField } from '../../../../utils/has-error-field'
import useCustomToast from '../../../../hooks/useCustomToast'

const Auth: FC<IAuthProps> = ({ type }) => {
  const [register, { isLoading: isLoadingRegister }] = useRegisterMutation()
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation()
  const navigate = useNavigate()
  const showToast = useCustomToast()

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IAuthData>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IAuthData> = async values => {
    try {
      {
        type === AuthEnum.LOGIN
          ? await login(values).unwrap()
          : await register(values).unwrap()
      }
      reset()
      navigate('/')
    } catch (err: any) {
      const error = hasErrorField(err) ? err.data.message : 'Server not Found'

      showToast({
        title: 'Не вдалось увійти, спробуйте ще раз.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
    }
  }

  if (isLoadingRegister || isLoadingLogin) {
    return (
      <section className='w-1/3 flex flex-col px-10 ml-32 mt-44 gap-y-8'>
        <Loading />
      </section>
    )
  }

  return (
    <section className='w-1/3 flex flex-col px-10 ml-32 mt-44 gap-y-8'>
      <AuthHeader type={type} reset={reset} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full h-full flex flex-col'
      >
        {type === AuthEnum.REGISTER && (
          <Field
            {...formRegister('name', {
              required: "Ви повинні ввести ім'я",
              minLength: {
                value: 3,
                message: "Ім'я повинне містити не менше 2 символів"
              },
              maxLength: {
                value: 8,
                message: "Ім'я не повинне містити більше 8 символів"
              }
            })}
            Icon={LuPenLine}
            iconSide='left'
            placeholder="Введіть ім'я"
            error={errors.name?.message}
            style={{ height: '80px' }}
          />
        )}
        <Field
          {...formRegister('email', {
            required: 'Ви повинні ввести електронну пошту',
            pattern: {
              value: validEmail,
              message: 'Введіть існуючу електронну пошту'
            }
          })}
          Icon={MdOutlineMailOutline}
          iconSide='left'
          placeholder='Введіть елекронну пошту'
          error={errors.email?.message}
          style={{ height: '80px' }}
        />
        <Field
          {...formRegister('password', {
            required: 'Ви повинні ввести пароль',
            minLength: {
              value: 6,
              message: 'Пароль повинен містити не менше 6 символів'
            }
          })}
          Icon={MdLockOutline}
          iconSide='left'
          type='password'
          placeholder='Введіть пароль'
          error={errors.password?.message}
          style={{ height: '80px' }}
        />
        <Button variant='primary' className='mt-1'>
          {type === AuthEnum.LOGIN ? 'Увійти' : 'Зареєструватися'}
        </Button>
      </form>
    </section>
  )
}

export default Auth
