<template>
  <div class="sidebar__menu">
    <div v-for="(menuItem, i) in getMenuList" :key="i" link class="sidebar__item" @click.stop="toogleChoiseSubmenu(i)">
      <component :is="menuItem.icon" v-if="menuItem.icon" :name="menuItem.icon" />
      <div class="sidebar__title" :class="[menuItem.open ? 'opened' : 'closed', miniVariant ? 'hide' : 'visible']">
        <span v-if="menuItem.subMenu">
          {{ menuItem.title }}
        </span>
        <nuxt-link v-else :to="menuItem.to">
          {{ menuItem.title }}
        </nuxt-link>
        <component :is="menuItem.open ? 'minusIcon' : 'plusIcon'" v-if="menuItem.subMenu" style="margin-left: 10px; fill: #f15a24" />
      </div>
      <div v-if="menuItem.subMenu" class="sidebar__submenu" :class="menuItem.open ? 'opened' : 'closed'" @click.stop>
        <nuxt-link v-for="(subMenuItem, s) in menuItem.subMenu" :key="s" :to="subMenuItem.to" class="sidebar__subitem" @click.stop>
          {{ subMenuItem.title }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import dynamicsComponentRegistration from '~/mixins/dynamicsComponentRegistration'

import plusIcon from '~/assets/icons/plus.svg?inline'
import minusIcon from '~/assets/icons/minus.svg?inline'

export default {
  name: 'TheMenu',
  components: { plusIcon, minusIcon },
  mixins: [dynamicsComponentRegistration],
  props: {
    miniVariant: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters('menu', ['getMenuList'])
  },
  created () {
    this.dynamicsComponentRegistration(this.getMenuList)
  },
  methods: {
    ...mapMutations('menu', ['toogleChoiseSubmenu'])
  }
}
</script>
