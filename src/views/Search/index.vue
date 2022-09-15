<template>
  <div>
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        show-action
        placeholder="请输入搜索关键词"
        @search="onsearch"
        @cancel="$router.push('/')"
        @focus="isShowSearchResults = false"
      />
    </form>
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onsearch"
    ></component>
    <!-- <SearchHistory></SearchHistory>
    <SearchResult></SearchResult>
    <SearchSuggestion></SearchSuggestion> -->
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      keywords: '',
      isShowSearchResults: false
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  computed: {
    ...mapState(['history']),
    componentName() {
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResults) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['Set_history']),
    onsearch(keywords) {
      const clearHistory = [...new Set([keywords, ...this.history])]
      this.Set_history(clearHistory)
      this.keywords = keywords
      this.isShowSearchResults = true
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
