<template>
  <div class="channel-edit">
    <van-cell title="我的频道">
      <van-button
        class="btn"
        size="small"
        round
        style="color: red; border-color: red"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <div class="my-pannel">
      <van-grid :column-num="3" :border="false" gutter="10">
        <van-grid-item
          :class="{ active: item.name === '推荐' }"
          v-for="(item, index) in myChannels"
          :key="item.id"
          :text="item.name"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          @click="handlechannels(item, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell title="推荐频道"> </van-cell>
    <div class="recommend-pannel">
      <van-grid :column-num="3" :border="false" gutter="10">
        <van-grid-item
          v-for="item in recommendchannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'
export default {
  props: {
    myChannels: Array
  },
  data() {
    return {
      isEdit: false,
      allchannels: []
    }
  },
  created() {
    this.getAllChannels()
  },
  computed: {
    recommendchannels() {
      return this.allchannels.filter((allitem) => {
        return !this.myChannels.find((item) => item.id === allitem.id)
      })
    }
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannelsAPI()
      console.log(data)
      this.allchannels = data.data.channels
    },
    handlechannels({ name }, index) {
      if (this.isEdit && name !== '推荐') {
        console.log('删除频道', name)
      } else {
        this.$emit('change-active', index)
      }
    }
  }
}
</script>

<style scoped lang="less">
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
.channel-edit {
  padding-top: 92px;
}
:deep(btn) {
  width: 100px;
  font-size: 25px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
} // 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  } // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;
    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
} // 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;
    .van-grid-item__icon {
      font-size: 0.5rem;
    }
    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
