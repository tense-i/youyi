<script setup lang="ts">
import KnowledgeCard from '@/components/home/consult/KnowledgeCard.vue'
import type { KnowledgeParams, KnowledgeList, KnowledgeType } from '@/types/consult/Knowledge'
import { getKnowledgePage } from '@/services/consult'
import { ref } from 'vue'
const loading = ref(false)
const finished = ref(false)

const props = defineProps<{
  type: KnowledgeType
}>()

const list = ref<KnowledgeList>([])
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})
const onLoad = async() => {
  const res = await getKnowledgePage(params.value)
  list.value.push(...res.data.rows)

  if (params.value.current >= res.data.pageTotal) {
    // 没有更多了
    finished.value = true
  } else {
    // 有更多
    params.value.current++
  }
  loading.value = false
}
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <knowledge-card
        v-for="item in list"
        :key="item.id"
        :item="item"
      />
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
    padding: 0 15px;
}
</style>
