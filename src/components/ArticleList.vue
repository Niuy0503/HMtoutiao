<template>
  <div>
    <ArticleItem
      v-for="item in Article"
      :key="item.art_id"
      :article="item"
    ></ArticleItem>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  data() {
    return {
      Article: []
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
    }
  }
}
</script>

<style></style>
