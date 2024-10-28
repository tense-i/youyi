<script setup lang="ts">
import { defineComponent, reactive, ref, onUnmounted } from 'vue'
import { codeRules, mobileRules, passwordRules } from '@/utils/rules'
import { showToast, type FormInstance } from 'vant'
import { loginService, sendCodeService, smsLoginService } from '@/services/user'
import { useUserStore } from '@/stores/user'
import router from '@/router'
defineComponent({
  name: 'LoginPage'
})

const form = reactive({
  mobile: '',
  password: '',
  code: ''
})
//
const isPass = ref(true)
const show = ref(false)
const agree = ref(false)
const store = useUserStore()
const onSubmit = async() => {
  try {
    console.log('submit')
    if (!agree.value) {
      showToast('请同意勾选用户协议')
      return
    }
    let res
    if (isPass.value) {
      res = await loginService(form.mobile, form.password)
    } else {
      res = await smsLoginService(form.mobile, form.code)
    }
    // 保存用户信息
    store.setUser(res.data)
    router.replace(router.currentRoute.value.query.returnUrl as string || '/home')
  } catch (error) {
    console.error('提交时发生错误:', error)
    showToast('稍后提交')
  }
}

const timer = ref(0)
const formRef = ref<FormInstance>()
let timerId: number
const send = async() => {
  debugger
  console.log('send code')
  if (timer.value > 0) {
    return
  }
  // 验证不通过报错，阻止程序继续执行
  // 校验手机号
  await formRef.value?.validate('mobile')
  const mobile = form.mobile
  // 发送验证码
  debugger
  await sendCodeService(mobile, 'login')
  showToast('验证码已发送')

  // 开启倒计时
  timer.value = 60
  timerId = setInterval(() => {
    timer.value--
    if (timer.value <= 0) {
      clearInterval(timerId)
    }
  }, 1000)
}
// 组件卸载时清除定时器
onUnmounted(() => {
  window.clearInterval(timerId)
})
</script>

<template>
  <div class="login-page">
    <cp-nav-bar right-text="注册" @click-right="$router.push('/register')"></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass?'密码登录':'短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isPass=!isPass">
        <span>{{ !isPass ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" @submit="onSubmit" >
      <van-field
        placeholder="请输入手机号"
        type="tel"
        name="mobile"
        v-model="form.mobile"
        :rules="mobileRules"
      ></van-field>
      <van-field
        v-if="isPass"
        v-model="form.password"
        name="password"
        :rules="passwordRules"
        placeholder="请输入密码"
        :type="show ? 'text' : 'password'"
      >
        <template #button>
          <cp-icon @click="show = !show" :name="`login-eye-${show ? 'on' : 'off'}`"></cp-icon>
        </template>
      </van-field>
      <van-field v-else
                 placeholder="短信验证码"
                 :rules="codeRules"
                 v-model="form.code"
      >
        <template #button>
          <span
            class="btn-send"
            @click="send"
            :class="{ active: timer > 0 }"
          >
            {{ timer > 0 ? `${timer}s后重发` : '发送验证码' }}
          </span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
    &-page {
        padding-top: 46px;
    }

    &-head {
        display: flex;
        padding: 30px 30px 50px;
        justify-content: space-between;
        align-items: flex-end;
        line-height: 1;

        h3 {
            font-weight: normal;
            font-size: 24px;
        }

        a {
            font-size: 15px;
        }
    }

    &-other {
        margin-top: 60px;
        padding: 0 30px;

        .icon {
            display: flex;
            justify-content: center;

            img {
                width: 36px;
                height: 36px;
                padding: 4px;
            }
        }
    }
}

.van-form {
    padding: 0 14px;

    .cp-cell {
        height: 52px;
        line-height: 24px;
        padding: 14px 16px;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        .van-checkbox {
            a {
                color: var(--cp-primary);
                padding: 0 5px;
            }
        }
    }

    .btn-send {
        color: var(--cp-primary);

        &.active {
            color: rgba(22, 194, 163, 0.5);
        }
    }
}
</style>
