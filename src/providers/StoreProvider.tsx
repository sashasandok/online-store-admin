import { useMemo } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { makeStore, makePersistor, type AppStore } from '../store/store'
import type { Persistor } from 'redux-persist'

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const store = useMemo<AppStore>(() => makeStore(), [])
  const persistor = useMemo<Persistor>(() => makePersistor(store), [store])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
