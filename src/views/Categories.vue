<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addCategory" />

        <CategoryEddit
          :categories = "categories"
          @updated = "updateCategories"
          :key="categories.length + updateCount"
        />
      </div>
    </section>
  </div>
</template>
<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEddit from '@/components/CategoryEddit'
export default {
  name: 'categories',
  data: () => ({
    categories:[],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')

    this.loading = false
  },
  components: {
    CategoryCreate, CategoryEddit
  },
  methods: {
    addCategory () {
      this.categories.push(categories)

    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }

}
</script>
