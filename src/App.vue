<script setup lang="ts">
import { ref, onMounted } from 'vue'
import router from './router'
const active = ref(-1)

onMounted(() => {
  import('./utils/permissions')
})
const onChange = (index: number) => {
  active.value = index
  console.log(index)
  switch (index) {
    case 0:
      router.push('/home')
      break
    case 1:
      router.push('/health')
      break
    case 2:
      router.push('/message')
      break
    case 3:
      router.push('/mine')
      break
  }
}
</script>

<template>
  <router-view />

  <van-tabbar v-model="active"
              @change="onChange"
  >
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="search"
                     dot
    >
      健康百科
    </van-tabbar-item>
    <van-tabbar-item icon="friends-o"
                     info="5"
    >
      消息中心
    </van-tabbar-item>
    <van-tabbar-item icon="setting-o"
                     info="20"
    >
      我的
    </van-tabbar-item>
  </van-tabbar>

</template>
