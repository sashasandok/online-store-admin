import { Modal, Button, Group, Text } from '@/components/base'
import { useAppDispatch } from '@/store/hooks'
import { deleteUser } from '@/store/slices/usersSlice'

interface DeleteEntitieModalProps<T> {
  entitie: T | null
  opened: boolean
  onClose: () => void
  entitieTitle: string
}

export const DeleteEntitieModal = <T extends { _id: string; name: string }>({
  entitie,
  opened,
  onClose,
  entitieTitle,
}: DeleteEntitieModalProps<T>) => {
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    if (!entitie) return
    dispatch(deleteUser(entitie._id))
      .unwrap()
      .then(() => {
        onClose()
      })
  }

  return (
    <Modal opened={opened} onClose={onClose} title={`Delete ${entitieTitle}`}>
      <Text>
        Are you sure you want to delete the {entitieTitle.toLowerCase()}{' '}
        <strong>{entitie?.name}</strong>? This action cannot be undone.
      </Text>
      <Group justify="end" style={{ marginTop: 'var(--spacing-md)' }}>
        <Button variant="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Group>
    </Modal>
  )
}
