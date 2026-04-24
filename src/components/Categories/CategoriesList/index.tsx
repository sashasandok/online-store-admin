import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Group, PageLoader } from '@/components/base'
import { fetchCategories } from '@/store/slices/categoriesSlice'
import type { ICategory } from '@/store/slices/categoriesSlice'
import type { RootState, AppDispatch } from '@/store/store'
import { CategoriesTable } from '../CategoriesTable'
import { CategoriesCards } from '../CategoriesCards'
import { CreateCategory } from '../Modals/CreateCategory'
import { EditCategory } from '../Modals/EditCategory'
import { DeleteEntitieModal } from '../../DeleteEntitieModal'

export const CategoriesList = () => {
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false)
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false)
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false)
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  )
  const dispatch = useDispatch<AppDispatch>()

  const { categoriesList, isLoading, error } = useSelector(
    (state: RootState) =>
      state.categories || { categoriesList: [], isLoading: false, error: null }
  )

  const handleRefresh = () => dispatch(fetchCategories())
  const handleCreateCategoryModal = () =>
    setIsCreateCategoryModalOpen((v) => !v)
  const handleCloseModal = () => setIsCreateCategoryModalOpen(false)

  const handleEditCategory = (category: ICategory) => {
    setSelectedCategory(category)
    setIsEditCategoryModalOpen(true)
  }
  const handleCloseEditModal = () => {
    setIsEditCategoryModalOpen(false)
    setSelectedCategory(null)
  }

  const handleDeleteCategory = (category: ICategory) => {
    setSelectedCategory(category)
    setIsDeleteCategoryModalOpen(true)
  }
  const handleCloseDeleteModal = () => {
    setIsDeleteCategoryModalOpen(false)
    setSelectedCategory(null)
  }

  useEffect(() => {
    if (categoriesList.length === 0) dispatch(fetchCategories())
  }, [dispatch, categoriesList.length])

  const heading = (
    <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-4 justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold m-0">Categories management</h1>
      <Group gap="sm">
        <Button
          variant="primary"
          onClick={handleRefresh}
          isDisabled={isLoading}
          loading={isLoading}
        >
          Refresh
        </Button>
        <Button onClick={handleCreateCategoryModal}>Create Category</Button>
      </Group>
    </div>
  )

  if (isLoading && categoriesList.length === 0) {
    return (
      <div>
        {heading}
        <div className="relative min-h-100">
          <PageLoader text="Loading categories..." />
        </div>
      </div>
    )
  }

  if (error && categoriesList.length === 0) {
    return (
      <div>
        {heading}
        <div className="p-8 text-center">
          <p>Error loading categories: {error}</p>
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
        <CategoriesTable
          list={categoriesList}
          isLoading={isLoading}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />
      </div>

      {/* Cards for mobile/tablet (< 1200px) */}
      <div className="xl:hidden">
        <CategoriesCards
          list={categoriesList}
          isLoading={isLoading}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />
      </div>

      <CreateCategory
        opened={isCreateCategoryModalOpen}
        onClose={handleCloseModal}
      />
      {selectedCategory && (
        <EditCategory
          opened={isEditCategoryModalOpen}
          onClose={handleCloseEditModal}
          category={selectedCategory}
        />
      )}
      <DeleteEntitieModal
        opened={isDeleteCategoryModalOpen}
        onClose={handleCloseDeleteModal}
        entitie={
          selectedCategory
            ? { _id: selectedCategory._id, name: selectedCategory.name }
            : null
        }
        entitieTitle="Category"
      />
    </div>
  )
}
