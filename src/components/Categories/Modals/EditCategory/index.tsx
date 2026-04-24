import { Modal, Button, TextInput, Group } from '@/components/base'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { updateCategory } from '@/store/slices/categoriesSlice'
import type { AppDispatch } from '@/store/store'
import type { ICategory } from '@/store/slices/categoriesSlice'

interface EditCategoryProps {
  opened: boolean
  onClose: () => void
  category: ICategory
}

interface IFormInput {
  name: string
}

export const EditCategory = ({
  opened,
  onClose,
  category,
}: EditCategoryProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInput>()

  useEffect(() => {
    if (category) {
      reset({ name: category.name })
    }
  }, [category, reset])

  const onSubmit = async (data: IFormInput) => {
    await dispatch(updateCategory({ id: category._id, ...data }))
    onClose()
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Category">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Category Name"
          placeholder="Enter category name"
          {...register('name', { required: 'Category name is required' })}
          error={errors.name?.message}
        />
        <Group style={{ marginTop: '1rem' }}>
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
