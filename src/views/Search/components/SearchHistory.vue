<template>
  <div>
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon
          name="delete-o"
          v-if="!isEdit"
          @click="isEdit = true"
        ></van-icon>
        <div v-else>
          <span @click="$store.commit('Set_history', [])">全部删除</span>
          &nbsp;
          <span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>

    <van-cell
      :title="item"
      v-for="item in history"
      :key="item"
      @click="!isEdit && $emit('change-keywords', item)"
    >
      <template #extra>
        <van-icon
          name="close"
          v-show="isEdit"
          @click="
            $store.commit(
              'Set_history',
              history.filter((i) => item !== i)
            )
          "
        ></van-icon>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState(['history'])
  }
}
</script>

<style></style>
