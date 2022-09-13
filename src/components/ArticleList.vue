<template>
  <div class="article">
    <!--属性-->
    <!-- @Load: 触底的时候触发Load事件-->
    <!-- offset: 滚动条和底部距离多少的时候触发Load事件， 默认值是300px -->
    <!-- immediate-check: 初渲染的时候是否执行load事件， 默认值是true -->
    <!-- v-model= "Loading" -->
    <!-- Loading为true, load事件不会被触发-->
    <!-- Loading为false的时候，Load事件会被触发-->
    <!-- Loading会在load事件执行后，被van-list组件自动设置为ture -->
    <!-- finished:Boolean false:load事件会被触发true: load事件不会被出并且显finished-text的文本 -->
    <van-pull-refresh
      v-model="refreshloading"
      @refresh="getNextPageArticle"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        :finished="finished"
        finished-text="我是有底线的！我要生气了"
        :error.sync="error"
        error-text="点击重新加载页面哦~"
      >
        <ArticleItem
          v-for="item in Article"
          :key="item.art_id"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  data() {
    return {
      Article: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshloading: false
    }
  },
  name: 'ArticleList',
  props: {
    id: [String, Number]
  },
  components: {
    ArticleItem
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.Article = data.data.results
        this.preTimestamp = data.data.pre_timestamp
        console.log(data)
      } catch (err) {
        const status = err.response?.status
        if (!err.response || status === 507) {
          throw err
        } else {
          if (status === 400) {
            throw new Error(err.response.data.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        const { data } = await getArticles(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.refreshloading) {
          this.Article.unshift(...data.data.results)
        } else {
          this.Article.push(...data.data.results)
        }
        this.preTimestamp = data.data.pre_timestamp
      } catch (err) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshloading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article {
  height: calc(100vh - 92px - 100px - 83px);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: skyblue;
    border-radius: 5px;
  }
}
</style>
