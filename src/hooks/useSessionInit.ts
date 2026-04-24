import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../store/hooks'
import { useNotification } from '../providers/NotificationProvider/useNotification'
import { initSessionHandler } from '../utils/sessionHandler'

export const useSessionInit = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  useEffect(() => {
    initSessionHandler({
      dispatch,
      navigate,
      showNotification,
    })
  }, [dispatch, navigate, showNotification])
}
