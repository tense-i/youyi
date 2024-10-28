import CpNavBar from '@/components/VantCpt/cp-nav-bar.vue'
import CpIcon from '@/components/VantCpt/cp-icon.vue'

/**
 * 全局声明组件
 */
declare module 'vue' {
  export interface GlobalComponents {
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
  }
}

