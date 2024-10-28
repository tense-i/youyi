<script setup lang="ts">
import { defineComponent, onMounted } from 'vue'
defineComponent({
  name: 'TestPage'
})

import { request } from '@/utils/request'
import type { User } from '@/types/user'
import { showToast, Button as VanButton } from 'vant'
import { useUserStore } from '@/stores/user'
import '@/components/VantCpt/cp-icon.vue'
// 测试，请求拦截器，是否携带token，响应拦截器401拦截到登录地址
const getUserInfo = async() => {
  const res = await request('/patient/myUser')
  console.log(res)
}

// 测试，响应拦截器，出现非10000的情况，和返回剥离后的数据
const store = useUserStore()
const login = async() => {
  const res = await request<User>('/login/password', 'POST', {
    mobile: '13211112222',
    // 密码 abc123456 测试：出现非10000的情况
    password: 'abc12345'
  })
  showToast('登录成功')
  store.setUser(res.data)
}

// 测试，svg图标
onMounted(() => {
  // 获取svg图标
  const svg = document.getElementById('svg')
  console.log(svg)
})

</script>

<template>
  <van-button type="primary" @click="getUserInfo">获取个人信息</van-button>
  <van-button type="primary" @click="login">登录</van-button>
  <div id="div2">
    svg
  </div>

  <cp-icon :name="`home-docs`" id="svg">
  </cp-icon>
  <cp-icon :name="`login-eye-on`">
  </cp-icon>

</template>

<style scoped lang="scss">
.imag {
  width: 2100px;
  height: 200px;
  // 边框
  border: 1px solid red;
}
</style>
