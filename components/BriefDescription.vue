<template>
  <div class="brief__right">
    <transition name="slideToBot" mode="out-in">
      <div v-if="step < briefDescription.length" class="brief__icon">
        <transition name="slideToBot" mode="out-in">
          <component :is="briefDescription[step].icon" v-if="briefDescription[step].icon" :key="briefDescription[step].icon" />
        </transition>
      </div>
    </transition>
    <transition name="slideToBot" mode="out-in">
      <div v-if="step < briefDescription.length && briefDescription[step].title" :key="briefDescription[step].title" class="brief__title">
        {{ briefDescription[step].title }}
      </div>
    </transition>
    <transition name="slideToBot" mode="out-in">
      <p v-if="step < briefDescription.length && briefDescription[step].text" :key="briefDescription[step].text">
        {{ briefDescription[step].text }}
      </p>
    </transition>
    <transition name="slideToBot" mode="out-in">
      <button v-if="step < briefDescription.length && briefDescription[step].buttonTitle" :key="briefDescription[step].buttonTitle" class="btn" @click="$emit('stepChange', 1)">
        {{ briefDescription[step].buttonTitle }}
      </button>
    </transition>
    <transition name="slideToBot" mode="out-in">
      <span v-if="step < briefDescription.length && briefDescription[step].footerText" :key="briefDescription[step].footerText">{{ briefDescription[step].footerText }}
        <nuxt-link to="/privacy">
          Политики защиты и обработки персональных данных.
        </nuxt-link>
      </span>
    </transition>
  </div>
</template>

<script>
import dynamicsComponentRegistration from '~/mixins/dynamicsComponentRegistration'

export default {
  name: 'BriefDescription',
  mixins: [dynamicsComponentRegistration],
  props: {
    step: {
      type: Number,
      default: 0
    },
    briefDescription: {
      type: Array,
      required: true
    }
  },
  watch: {
    'briefDescription.length' () {
      this.dynamicsComponentRegistration(this.briefDescription)
    }
  }
}
</script>
