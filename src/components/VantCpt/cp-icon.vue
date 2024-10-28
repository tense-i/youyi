<script setup lang="ts">
// 提供name属性即可
defineProps<{
  name: string
}>()
</script>

/**
 * 使用svg图标
 * @bug 使用时不显示、没有效果
 */
<template>
  <svg aria-hidden="true" class="cp-icon">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<style lang="scss" scoped>
.cp-icon {
  // 和字体一样大
  width: 1em;
  height: 1em;
}
</style>
