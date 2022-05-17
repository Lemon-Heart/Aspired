<template>
  <div class="root">
    <TheAside
      :sidebar-full="sidebarFull"
      :mini-variant="miniVariant"
      :index-page="indexPage"
      @toogleSidebarFull="sidebarFull = !sidebarFull"
      @setLargeSidebar="setLargeSidebar"
      @setSmallSidebar="setSmallSidebar"
    />
    <div class="content" :class="{'content--main': indexPage, 'content--translate': !miniVariant}">
      <Nuxt />
    </div>
    <button class="briefButton" :class="{'briefButton--portfolio': $route.name === 'Портфолио'}" @click="$modal.show('brief')">
      <penIcon />
    </button>
    <client-only>
      <modal height="610" :max-width="950" width="100%" name="brief">
        <div slot="top-right" class="close" @click="$modal.hide('brief')">
          ✖
        </div>
        <ModalBrief />
      </modal>
    </client-only>
    <transition name="message">
      <form-complete v-if="getFormCompleteVisible" :key="'form-complete'" :message="getMessage" />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import penIcon from '~/assets/icons/pen.svg?inline'

export default {
  name: 'DefaultLayout',
  components: { penIcon },
  data () {
    return {
      indexPage: false,
      miniVariant: true,
      sidebarFull: false
    }
  },
  computed: {
    ...mapGetters('modal', ['getFormCompleteVisible', 'getMessage'])
  },
  watch: {
    $route () {
      this.$modal.hide('brief')
      this.sidebarFull = false
      setTimeout(() => {
        this.checkOnIndexPage()
      }, 500)
    },
    sidebarFull (newValue, oldValue) {
      if (newValue === true) {
        this.setLargeSidebar()
      } else {
        this.setSmallSidebar()
      }
    }
  },
  mounted () {
    this.checkOnIndexPage()
  },
  methods: {
    ...mapMutations('menu', ['closeAllSubmenu']),
    setSmallSidebar () {
      if (!this.sidebarFull) {
        this.miniVariant = true
        this.closeAllSubmenu()
      }
    },
    setLargeSidebar () {
      this.miniVariant = false
    },
    checkOnIndexPage () {
      this.$route.path === '/' ? this.indexPage = true : this.indexPage = false
    }
  }
}
</script>
