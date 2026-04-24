export const clearPersistedState = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('persist:root')
    window.location.reload()
  }
}

export const isPersistRehydrated = (state?: {
  _persist?: { rehydrated?: boolean }
}) => {
  return state?._persist?.rehydrated === true
}

if (
  typeof window !== 'undefined' &&
  (globalThis as unknown as { process?: { env?: { NODE_ENV?: string } } })
    .process?.env?.NODE_ENV === 'development'
) {
  ;(
    window as unknown as Window & { clearReduxState?: () => void }
  ).clearReduxState = clearPersistedState
  console.log('Development mode: Use window.clearReduxState() to reset store')
}
