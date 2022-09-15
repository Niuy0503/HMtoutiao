<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          icon="search"
          round
          block
          size="small"
          @click="$router.push('/search')"
          >首页</van-button
        >
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channel" :key="item.id" :title="item.name"
        ><ArticleList :id="item.id"></ArticleList
      ></van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <van-popup
      v-model="isShow"
      position="right"
      :style="{ height: '100%', width: '100%' }"
      close-icon-position="top-left"
      closeable
    >
      <ChannelEdit
        v-if="isShow"
        :myChannels="channel"
        @change-active=";[(isShow = false), (active = $event)]"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api'
import ArticleList from '@/components/ArticleList.vue'
import ChannelEdit from './cpns/ChannelEdit.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      channel: [],
      isShow: false
    }
  },
  created() {
    this.initChannel()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  // 1.??--->相当于||，常用于语句
  // 2.?.--->可选链操作符，?前面是undifined,那么不会往后取值
  methods: {
    ...mapMutations(['Set_Channels']),
    async initChannel() {
      if (this.isLogin) {
        this.getChannel()
      } else {
        const myChannels = this.$store.state.myChannels
        if (myChannels.length === 0) {
          this.getChannel()
        } else {
          this.channel = myChannels
        }
      }
    },
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        this.channel = data.data.channels
      } catch (err) {
        if (!err.response) {
          throw err
        } else {
          const status = err.response.status
          status === 507 && this.$toast.fail('服务端异常，请刷新重试！')
        }
      }
    },
    async delChannel(id) {
      try {
        const newchannels = this.channel.filter((item) => item.id !== id)
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          this.Set_Channels(newchannels)
        }
        this.channel = newchannels
        this.$toast.success('删除频道成功！')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录后再进行操作！')
        } else {
          throw error
        }
      }
    },
    async addChannel(item) {
      try {
        if (this.isLogin) {
          await addChannelAPI(item.id, this.channel.length)
        } else {
          this.Set_Channels([...this.channel, item])
        }
        this.channel.push(item)
        this.$toast.success('添加频道成功！')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录后再进行操作！')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa; // inherit 继承 // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }
  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0; /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    } /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
} /* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
