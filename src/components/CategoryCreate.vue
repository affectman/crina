<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"/>
          <label for="name">Название</label>
          <span
            v-if="$v.title.$error"
            class="helper-text invalid"
          >Введите название</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}" />
          <label for="limit">Полученные средства</label>
          <span
            v-if="$v.limit.$error"
            class="helper-text invalid"
          >Минимальная величина
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'


export default {
  data: () => ({
    title: '',
    limit: 100
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(1) }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
      try {
        const category = await this.$store.dispatch('createCategory',
        {
          limit: this.limit,
          title: this.title

        })
        this.$message('Категория создана')
        this.title = ''
        this.limit = '100'
        this.$v.reset()
        this.$emit('created', category)

      } catch (e) {
      }

    }
  }

}
</script>
