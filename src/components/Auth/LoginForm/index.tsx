import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, TextInput, PasswordInput } from '@/components/base'
import type { AppDispatch, RootState } from '../../../store/store'
import { loginUser, clearError } from '../../../store/slices/authSlice'
import { getRedirectPath } from '../../../utils/sessionHandler'

const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(5, 'Password must be at least 5 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { isLoading, error } = useSelector(
    (state: RootState) => state.auth || { isLoading: false, error: null }
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(loginUser(data)).unwrap()
      reset()
      const redirectPath = getRedirectPath()
      navigate(redirectPath)
    } catch (error) {
      console.error('Failed to login:', error)
    }
  }

  return (
    <form
      className="max-w-100 mx-auto p-8 bg-(--color-surface) rounded-2xl shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="grid gap-4">
        {error && (
          <Alert
            variant="error"
            title="Login Error"
            onClose={() => dispatch(clearError())}
          >
            {error}
          </Alert>
        )}

        <TextInput
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          required
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          {...register('password')}
          error={errors.password?.message}
          required
        />

        <Button
          type="submit"
          loading={isLoading}
          isDisabled={!isValid}
          fullWidth
        >
          Sign In
        </Button>
      </div>
    </form>
  )
}
