<template>
  <div class="flex flex-col wrapper">
    <h2 v-if="title != ''">
      {{ title }}
    </h2>
    <p v-if="description != ''">
      {{ description }}
    </p>
    <form class="grid-margin-bot-30" @submit.prevent="$emit('onSubmitForm')">
      <component
        :is="item.type"
        v-for="item in form"
        :key="item.name"
        v-model="item.title"
        :name="item.name"
        :error="item.error"
        :label="item.label"
        :text="item.variants"
        :options="item.options"
        :mask="item.mask"
        @input="item.error = false"
      />
      <button class="btn primary" type="submit">
        {{ buttonText }}
      </button>
    </form>
    <button v-if="calculation" class="btn primary next" @click="$emit('stepChange', 1)">
      Ускорить расчет
    </button>
    <div v-if="links" class="brief__footer">
      <a v-for="(item, i) in links" :key="i" target="blank" :href="item.url"><component :is="item.icon" /><span>{{ item.text }}</span></a>
    </div>
  </div>
</template>

<script>
import dynamicsComponentRegistration from '~/mixins/dynamicsComponentRegistration'

export default {
  name: 'QuickForm',
  mixins: [dynamicsComponentRegistration],
  props: {
    form: {
      type: [Array, Object],
      required: true
    },
    links: {
      type: [Array, Object],
      default: null
    },
    calculation: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: 'Отправить'
    }
  },
  watch: {
    'links.length' () {
      this.dynamicsComponentRegistration(this.links)
    }
  }
}
</script>
