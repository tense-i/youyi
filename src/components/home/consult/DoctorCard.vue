<script lang="ts" setup>
import type { Doctor } from '@/types/consult/doctor'
import { followDoctor } from '@/services/consult/doctor'
import { ref } from 'vue'
import { showToast } from 'vant'
defineProps<{
  doctor: Doctor
}>()
const loading = ref(false)
const followDoctorHandler = async(doctor: Doctor) => {
  loading.value = true
  try {
    await followDoctor(doctor.id)
    doctor.likeFlag = doctor.likeFlag === 0 ? 1 : 0
  } catch (error) {
    showToast('关注失败:' + error)
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="doctor-card">
    <van-image round :src="doctor.avatar" />
    <p class="name">{{ doctor.name }}</p>
    <p class="van-ellipsis">{{ doctor.hospitalName }} {{ doctor.depName }}</p>
    <p>{{ doctor.positionalTitles }}</p>
    <van-button
      round
      size="small"
      type="primary"
      :loading="loading"
      @click="followDoctorHandler(doctor)"
    >
      <!-- 用户是否关注医生 -->
      {{ doctor.likeFlag === 1 ? '已关注' : '+ 关注' }}
    </van-button>
  </div>
</template>
<style scoped lang="scss">
.doctor-card {
  width: 135px;
  height: 190px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 11px 0px rgba(229, 229, 229, 0.2);
  text-align: center;
  padding: 15px;
  margin-left: 15px;
  display: inline-block;
  box-sizing: border-box;

  >.van-image {
    width: 58px;
    height: 58px;
    vertical-align: top;
    border-radius: 50%;
    margin: 0 auto 8px;
  }

  >p {
    margin-bottom: 0;
    font-size: 11px;
    color: var(--cp-tip);

    &.name {
      font-size: 13px;
      color: var(--cp-text1);
      margin-bottom: 5px;
    }
  }

  >.van-button {
    padding: 0 12px;
    height: 28px;
    margin-top: 8px;
    width: 72px;
  }
}
</style>
