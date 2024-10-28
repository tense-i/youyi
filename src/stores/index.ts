export * from './user'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
export const pinia = createPinia()

pinia.use(piniaPersist)

export default pinia

