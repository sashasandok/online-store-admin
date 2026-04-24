import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Group, PageLoader } from '@/components/base'
import { fetchProducts } from '@/store/slices/productSlice'
import type { IProduct } from '@/store/slices/productSlice'
import type { RootState, AppDispatch } from '@/store/store'
import { ProductsTable } from '../ProductsTable'
import { ProductsCards } from '../ProductsCards'
import { CreateProduct } from '../Modals/CreateProduct'
import { EditProduct } from '../Modals/EditProduct'
import { DeleteEntitieModal } from '../../DeleteEntitieModal'

export const ProductsList = () => {
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
    useState(false)
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false)
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false)
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  const { productsList, isLoading, error } = useSelector(
    (state: RootState) =>
      state.product || { productsList: [], isLoading: false, error: null }
  )

  const handleRefresh = () => dispatch(fetchProducts({ page: 1, limit: 50 }))
  const handleCloseModal = () => setIsCreateProductModalOpen(false)

  const handleEditProduct = (product: IProduct) => {
    setSelectedProduct(product)
    setIsEditProductModalOpen(true)
  }
  const handleCloseEditModal = () => {
    setIsEditProductModalOpen(false)
    setSelectedProduct(null)
  }

  const handleDeleteProduct = (product: IProduct) => {
    setSelectedProduct(product)
    setIsDeleteProductModalOpen(true)
  }
  const handleCloseDeleteModal = () => {
    setIsDeleteProductModalOpen(false)
    setSelectedProduct(null)
  }

  useEffect(() => {
    if (productsList.length === 0)
      dispatch(fetchProducts({ page: 1, limit: 50 }))
  }, [dispatch, productsList.length])

  const heading = (
    <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-4 justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold m-0">Products management</h1>
      <Group gap="sm">
        <Button
          variant="primary"
          onClick={handleRefresh}
          isDisabled={isLoading}
          loading={isLoading}
        >
          Refresh
        </Button>
        <Button onClick={() => setIsCreateProductModalOpen(true)}>
          Create Product
        </Button>
      </Group>
    </div>
  )

  if (isLoading && productsList.length === 0) {
    return (
      <div>
        {heading}
        <div className="relative min-h-100">
          <PageLoader text="Loading products..." />
        </div>
      </div>
    )
  }

  if (error && productsList.length === 0) {
    return (
      <div>
        {heading}
        <div className="p-8 text-center">
          <p>Error loading products: {error}</p>
          <Button onClick={handleRefresh}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {heading}

      {/* Desktop table (>= 1200px) */}
      <div className="hidden xl:block">
        <ProductsTable
          list={productsList}
          isLoading={isLoading}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>

      {/* Cards for mobile/tablet (< 1200px) */}
      <div className="xl:hidden">
        <ProductsCards
          list={productsList}
          isLoading={isLoading}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>

      <CreateProduct
        opened={isCreateProductModalOpen}
        onClose={handleCloseModal}
      />
      {selectedProduct && (
        <EditProduct
          opened={isEditProductModalOpen}
          onClose={handleCloseEditModal}
          product={selectedProduct}
        />
      )}
      <DeleteEntitieModal
        entitie={
          selectedProduct
            ? { _id: selectedProduct._id, name: selectedProduct.title }
            : null
        }
        opened={isDeleteProductModalOpen}
        onClose={handleCloseDeleteModal}
        entitieTitle="Product"
      />
    </div>
  )
}
