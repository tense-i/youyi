
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const store = useUserStore()

// 路由守卫
export const usePermission = () => {
  const permissions = ref<string[]>([])
  return permissions
}

/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    return
  }
  console.log(store.user?.token)
  if (store.user?.token) {
    next()
  } else {
    next('/login')
  }
})
