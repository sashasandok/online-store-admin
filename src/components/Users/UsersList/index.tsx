import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchUsers } from '@/store/slices/usersSlice'
import type { IUser } from '@/store/slices/usersSlice'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Button, PageLoader } from '@/components/base'
import { UsersTable } from '../UsersTable'
import { UsersCards } from '../UsersCards'
import { CreateUser } from '../Modals/CreateUser'
import { EditUser } from '../Modals/EditUser'
import { DeleteEntitieModal } from '../../DeleteEntitieModal'

export const UsersList = () => {
  const dispatch = useAppDispatch()
  const { usersList, isLoading, error } = useAppSelector((state) => state.users)
  const isDesktop = useMediaQuery('(min-width: 1200px)')

  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [editUser, setEditUser] = useState<IUser | null>(null)
  const [deleteUser, setDeleteUser] = useState<IUser | null>(null)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleRefresh = () => dispatch(fetchUsers())

  const heading = (
    <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-4 justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold m-0">Users management</h2>
      <Button onClick={() => setCreateModalOpen(true)}>Create User</Button>
    </div>
  )

  if (isLoading && usersList.length === 0) {
    return (
      <div>
        {heading}
        <div className="relative min-h-100">
          <PageLoader />
        </div>
      </div>
    )
  }

  if (error && usersList.length === 0) {
    return (
      <div>
        {heading}
        <div className="p-8 text-center">
          <p>Error loading users: {error}</p>
          <Button onClick={handleRefresh}>Retry</Button>
        </div>
      </div>
    )
  }

  const showUsers = !isLoading && usersList.length > 0
  const showEmptyState = !isLoading && usersList.length === 0

  return (
    <div>
      {heading}

      {isLoading && <PageLoader />}
      {showEmptyState && (
        <div className="p-8 text-center">
          <p>No users found.</p>
        </div>
      )}
      {showUsers && isDesktop && (
        <UsersTable
          list={usersList}
          isLoading={isLoading}
          onEdit={setEditUser}
          onDelete={setDeleteUser}
        />
      )}
      {showUsers && !isDesktop && (
        <UsersCards
          list={usersList}
          isLoading={isLoading}
          onEdit={setEditUser}
          onDelete={setDeleteUser}
        />
      )}

      <CreateUser
        opened={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
      <EditUser
        user={editUser}
        opened={!!editUser}
        onClose={() => setEditUser(null)}
      />
      <DeleteEntitieModal
        entitie={deleteUser}
        opened={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        entitieTitle="User"
      />
    </div>
  )
}
