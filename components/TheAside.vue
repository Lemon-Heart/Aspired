<template>
  <div>
    <div class="sidebar--min" :class="{'opened': sidebarFull}">
      <div class="sidebar__logo" :class="miniVariant ? 'closed' : 'opened'">
        <nuxt-link to="/">
          <Logo />
        </nuxt-link>
      </div>
      <closeIcon @click="$emit('toogleSidebarFull')" />
    </div>
    <aside
      class="sidebar"
      :class="[miniVariant ? 'closed' : 'opened', {'transparent': indexPage, 'fullWidth': sidebarFull}]"
      @mouseover="$emit('setLargeSidebar')"
      @mouseleave="$emit('setSmallSidebar')"
    >
      <div class="sidebar__logo" :class="miniVariant ? 'closed' : 'opened'">
        <nuxt-link to="/">
          <Logo />
        </nuxt-link>
      </div>
      <TheMenu :mini-variant="miniVariant" />
      <div class="sidebar__footer">
        <transition name="fade">
          <component :is="miniVariant ? 'shareIcon' : 'vkIcon'" />
        </transition>
      </div>
    </aside>
  </div>
</template>

<script>
import Logo from '~/assets/logo.svg?inline'
import shareIcon from '~/assets/icons/share.svg?inline'
import vkIcon from '~/assets/icons/vk.svg?inline'
import closeIcon from '~/assets/icons/close.svg?inline'

export default {
  name: 'TheAside',
  components: { Logo, shareIcon, vkIcon, closeIcon },
  props: {
    miniVariant: {
      type: Boolean,
      default: true
    },
    indexPage: {
      type: Boolean,
      default: true
    },
    sidebarFull: {
      type: Boolean,
      default: false
    }
  }
}
</script>
