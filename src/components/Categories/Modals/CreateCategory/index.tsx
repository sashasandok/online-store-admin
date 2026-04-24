import { Modal, Button, TextInput, Group } from '@/components/base'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createCategory } from '@/store/slices/categoriesSlice'
import type { AppDispatch } from '@/store/store'

interface CreateCategoryProps {
  opened: boolean
  onClose: () => void
}

interface IFormInput {
  name: string
}

export const CreateCategory = ({ opened, onClose }: CreateCategoryProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInput>()

  const onSubmit = async (data: IFormInput) => {
    await dispatch(createCategory(data))
    reset()
    onClose()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal opened={opened} onClose={handleClose} title="Create Category">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Category Name"
          placeholder="Enter category name"
          {...register('name', { required: 'Category name is required' })}
          error={errors.name?.message}
        />
        <Group style={{ marginTop: '1rem' }}>
          <Button variant="primary" onClick={handleClose}>
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
