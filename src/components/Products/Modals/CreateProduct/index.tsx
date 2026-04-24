import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import {
  Modal,
  TextInput,
  Textarea,
  NumberInput,
  Select,
  Button,
  Stack,
  Alert,
  Group,
} from '@/components/base'
import { createProduct } from '@/store/slices/productSlice'
import { fetchCategories } from '@/store/slices/categoriesSlice'
import type { RootState, AppDispatch } from '@/store/store'

const productSchema = z.object({
  title: z.string().min(1, 'Product title is required').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  stock: z.number().min(0, 'Stock cannot be negative'),
  category: z.string().min(1, 'Category is required'),
})

type ProductFormData = z.infer<typeof productSchema>

interface CreateProductProps {
  opened: boolean
  onClose: () => void
}

export const CreateProduct = ({ opened, onClose }: CreateProductProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const { isCreating, error } = useSelector((state: RootState) => state.product)
  const { categoriesList = [], isLoading: categoriesLoading } = useSelector(
    (state: RootState) => state.categories
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (Array.isArray(categoriesList) && categoriesList.length === 0) {
      dispatch(fetchCategories())
    }
  }, [dispatch, categoriesList])

  useEffect(() => {
    if (!opened) {
      reset()
    }
  }, [opened, reset])

  const onSubmit = async (data: ProductFormData) => {
    try {
      await dispatch(createProduct(data)).unwrap()
      reset()
      onClose()
    } catch (error) {
      console.error('Failed to create product:', error)
    }
  }

  const categoryOptions = Array.isArray(categoriesList)
    ? categoriesList.map((category) => ({
        value: category._id,
        label: category.name,
      }))
    : []

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Create New Product"
      size="md"
      centered
      className=""
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          {error && (
            <Alert variant="error" title="Error">
              {error}
            </Alert>
          )}

          <TextInput
            label="Product Title"
            placeholder="Enter product title"
            {...register('title')}
            error={errors.title?.message}
            required
          />

          <Textarea
            label="Description"
            placeholder="Enter product description"
            {...register('description')}
            error={errors.description?.message}
            rows={4}
            required
          />

          <NumberInput
            label="Price ($)"
            onChange={(value) => setValue('price', Number(value) || 0)}
            error={errors.price?.message}
            min={0}
            step={0.01}
            required
          />

          <NumberInput
            label="Stock Quantity"
            onChange={(value) => setValue('stock', Number(value) || 0)}
            error={errors.stock?.message}
            min={0}
            required
          />

          <Select
            label="Category"
            placeholder={
              categoriesLoading ? 'Loading categories...' : 'Select category'
            }
            data={categoryOptions}
            onChange={(value) => setValue('category', value || '')}
            error={errors.category?.message}
            disabled={categoriesLoading}
            required
          />

          <Group justify="end" gap="sm">
            <Button variant="outline" onClick={onClose} isDisabled={isCreating}>
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isCreating}
              isDisabled={!isValid || categoriesLoading}
            >
              Create Product
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
