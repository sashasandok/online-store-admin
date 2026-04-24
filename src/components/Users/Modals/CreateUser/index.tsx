import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Modal,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Select,
} from '@/components/base'
import { useAppDispatch } from '@/store/hooks'
import { createUser } from '@/store/slices/usersSlice'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'user']),
})

type CreateUserFormData = z.infer<typeof schema>

interface CreateUserModalProps {
  opened: boolean
  onClose: () => void
}

export const CreateUser = ({ opened, onClose }: CreateUserModalProps) => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: 'user',
    },
  })

  const onSubmit = (data: CreateUserFormData) => {
    dispatch(createUser(data))
      .unwrap()
      .then(() => {
        onClose()
        reset()
      })
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Create User">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Name"
          {...register('name')}
          error={errors.name?.message}
          required
        />
        <TextInput
          label="Email"
          {...register('email')}
          error={errors.email?.message}
          required
        />
        <PasswordInput
          label="Password"
          {...register('password')}
          error={errors.password?.message}
          required
        />
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select
              label="Role"
              value={field.value}
              onChange={field.onChange}
              error={errors.role?.message}
              data={[
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
              ]}
              required
            />
          )}
        />
        <Group justify="end" style={{ marginTop: 'var(--spacing-md)' }}>
          <Button variant="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Create
          </Button>
        </Group>
      </form>
    </Modal>
  )
}
