import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
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
import { updateProduct } from '@/store/slices/productSlice'
import { fetchCategories } from '@/store/slices/categoriesSlice'
import type { RootState, AppDispatch } from '@/store/store'
import type { IProduct } from '@/store/slices/productSlice'

const productSchema = z.object({
  title: z.string().min(1, 'Product title is required').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  stock: z.number().min(0, 'Stock cannot be negative'),
  category: z.string().min(1, 'Category is required'),
})

type ProductFormData = z.infer<typeof productSchema>

interface EditProductProps {
  opened: boolean
  onClose: () => void
  product: IProduct | null
}

export const EditProduct = ({ opened, onClose, product }: EditProductProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const { isUpdating, error } = useSelector(
    (state: RootState) =>
      state.product || {
        isUpdating: false,
        error: null,
      }
  )

  const { categoriesList, isLoading: categoriesLoading } = useSelector(
    (state: RootState) =>
      state.categories || {
        categoriesList: [],
        isLoading: false,
      }
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
    control,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
  })

  const price = useWatch({ control, name: 'price' })
  const stock = useWatch({ control, name: 'stock' })
  const category = useWatch({ control, name: 'category' })

  useEffect(() => {
    if (categoriesList.length === 0) {
      dispatch(fetchCategories())
    }
  }, [dispatch, categoriesList.length])

  useEffect(() => {
    if (product && opened) {
      setValue('title', product.title)
      setValue('description', product.description)
      setValue('price', product.price)
      setValue('stock', product.stock)

      const categoryId =
        typeof product.category === 'string'
          ? product.category
          : product.category._id
      setValue('category', categoryId)
    }
  }, [product, opened, setValue])

  useEffect(() => {
    if (!opened) {
      reset()
    }
  }, [opened, reset])

  const onSubmit = async (data: ProductFormData) => {
    if (!product) return

    try {
      await dispatch(
        updateProduct({
          id: product._id,
          ...data,
        })
      ).unwrap()
      reset()
      onClose()
    } catch (error) {
      console.error('Failed to update product:', error)
    }
  }

  const categoryOptions = categoriesList.map((category) => ({
    value: category._id,
    label: category.name,
  }))

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Edit Product: ${product?.title || ''}`}
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
            placeholder="0.00"
            value={price || 0}
            onChange={(value) => setValue('price', Number(value) || 0)}
            error={errors.price?.message}
            min={0}
            step={0.01}
            decimalScale={2}
            required
          />

          <NumberInput
            label="Stock Quantity"
            placeholder="0"
            value={stock || 0}
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
            value={category || ''}
            onChange={(value) => setValue('category', value || '')}
            error={errors.category?.message}
            disabled={categoriesLoading}
            required
          />

          <Group justify="end" gap="sm">
            <Button variant="outline" onClick={onClose} isDisabled={isUpdating}>
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isUpdating}
              isDisabled={!isValid || categoriesLoading || !product}
            >
              Update Product
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
