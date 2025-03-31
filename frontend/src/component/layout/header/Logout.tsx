import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/state-hooks'
import Button from '../../../ui/button/Button'
import { setUser } from '../../../store/userSlice/userSlice'
import { useLogoutMutation } from '../../../services/auth/auth.service'
import { hasErrorField } from '../../../utils/has-error-field'
import useCustomToast from '../../../hooks/useCustomToast'

const Logout = () => {
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const showToast = useCustomToast()

  const logoutHandle = async () => {
    try {
      {
        await logout().unwrap()
        navigate('/')
      }
    } catch (e) {
      const error = hasErrorField(e) ? e.data.message : 'Server not found'
      showToast({
        title: 'Не вдалось видалити токен.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
    }
    dispatch(setUser(null))
    navigate('/login')
  }
  return (
    <div>
      <Button variant='primary' onClick={logoutHandle}>
        Вийти
      </Button>
    </div>
  )
}

export default Logout
