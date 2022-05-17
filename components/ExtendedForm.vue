<template>
  <div class="flex flex-col wrapper">
    <div class="brief__progress">
      <div v-for="(item, i) in icons" :key="i" class="brief__tabicon" :class="leave(i + 1)" @click="i + 1 < step ? $emit('stepChange', i + 1) : false">
        <component :is="item.icon" />
      </div>
    </div>
    <form @submit.prevent>
      <transition-group name="briefLabel" mode="out-in">
        <div v-for="(item, i) in form" v-show="showBlocks[i]" :key="item[0].name" class="grid-margin-bot-30">
          <component
            :is="subitem.type"
            v-for="subitem in item"
            :key="subitem.name"
            v-model="subitem.title"
            :name="subitem.name"
            :error="subitem.error"
            :label="subitem.label"
            :text="subitem.variants"
            :options="subitem.options"
            @input="subitem.error = false"
          />
        </div>
      </transition-group>
    </form>
    <div class="brief__footer">
      <button class="btn" @click="$emit('formPrevStep')">
        Назад
      </button>
      <button v-if="step < form.length" class="btn primary" @click="$emit('formNextStep')">
        Вперед
      </button>
      <button v-if="step === form.length" class="btn primary" @click="$emit('onSubmitForm')">
        Отправить
      </button>
    </div>
  </div>
</template>

<script>
import dynamicsComponentRegistration from '~/mixins/dynamicsComponentRegistration'

export default {
  name: 'ExtendedForm',
  mixins: [dynamicsComponentRegistration],
  props: {
    step: {
      type: Number,
      default: 1
    },
    form: {
      type: Array,
      required: true
    },
    icons: {
      type: [Array, Object],
      required: true
    }
  },
  data () {
    return {
      showBlocks: { 0: true }
    }
  },
  watch: {
    // Скрываем / показываем нужный блок формы в зависимости от step
    step (newStep, oldStep) {
      this.showBlocks[oldStep - 1] = false
      setTimeout(() => {
        this.showBlocks[newStep - 1] = true
      }, 450) // Задержка нужна для плавной анимации
    },
    'icons.length' () {
      this.dynamicsComponentRegistration(this.icons)
    },
    'form.length' () {
      this.createShowBlocks()
    }
  },
  methods: {
    createShowBlocks () {
      for (let c = 1; c < this.form.length; c++) {
        this.$set(this.showBlocks, c, false)
      }
    },
    // Добавляем необходимые классы в зависимости от step
    leave (step) {
      let className
      if (this.step >= step) {
        className = 'active'
      } else {
        className = 'leave'
      }
      return className
    }
  }
}
</script>
