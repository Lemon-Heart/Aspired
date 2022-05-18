<template>
  <div class="content">
    <ScrollHorizontalLayout class="team">
      <div v-for="(item, i) in pageContent" :key="i" class="team__item scrollHorizontal__item">
        <div class="team__wrap">
          <div class="team__photo" :style="{ backgroundImage: 'url(' + require(`@/assets/img/${item.photo2}`) + ')' }">
            <div class="team__photo team__photo--2" :style="{ backgroundImage: 'url(' + require(`@/assets/img/${item.photo1}`) + ')' }" />
          </div>
        </div>
        <h3>{{ item.name }}</h3>
        <span>{{ item.post }}</span>
      </div>
    </ScrollHorizontalLayout>
  </div>
</template>

<script>
import ScrollHorizontalLayout from '~/layouts/ScrollHorizontalLayout.vue'
import getAsyncPageContent from '~/mixins/getAsyncPageContent'

export default {
  name: 'TestPage',
  components: { ScrollHorizontalLayout },
  mixins: [getAsyncPageContent]
}
</script>
