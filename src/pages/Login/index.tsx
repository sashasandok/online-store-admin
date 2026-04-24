import { LoginForm } from '@/components'

export const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-(--color-surface-subtle)">
      <h2 className="text-center mb-8 text-4xl font-bold text-(--color-text)">Login</h2>
      <LoginForm />
    </div>
  )
}
