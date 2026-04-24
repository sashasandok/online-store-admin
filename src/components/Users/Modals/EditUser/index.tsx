import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Modal, TextInput, Button, Group, Select } from '@/components/base'
import { useAppDispatch } from '@/store/hooks'
import type { IUser } from '@/store/slices/usersSlice'
import { updateUser } from '@/store/slices/usersSlice'
import { useEffect } from 'react'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'user']),
})

type EditUserFormData = z.infer<typeof schema>

interface EditUserModalProps {
  user: IUser | null
  opened: boolean
  onClose: () => void
}

export const EditUser = ({ user, opened, onClose }: EditUserModalProps) => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditUserFormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (user) {
      reset(user)
    }
  }, [user, reset])

  const onSubmit = (data: EditUserFormData) => {
    if (!user) return

    dispatch(updateUser({ id: user._id, ...data }))
      .unwrap()
      .then(() => {
        onClose()
      })
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Edit User">
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
            Save Changes
          </Button>
        </Group>
      </form>
    </Modal>
  )
}
