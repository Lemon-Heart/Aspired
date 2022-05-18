<template>
  <div class="content">
    <SplitScreenLayout>
      <template #left>
        <img :src="require('~/assets/img/' + pageContent.image )" alt="О нас">
      </template>
      <template #right="slotProps">
        <h1>{{ pageContent.h1 }}</h1>
        <div v-html="pageContent.content" />
        <TheCountersBlock v-if="slotProps.parent && pageContent.counters" :title="pageContent.counters.title" :items="pageContent.counters.items" :parent="slotProps.parent" />
        <TheImagesBlock v-if="pageContent.partners.items" :title="pageContent.partners.title" :items="pageContent.partners.items" />
      </template>
    </SplitScreenLayout>
  </div>
</template>

<script>
import SplitScreenLayout from '~/layouts/SplitScreenLayout.vue'
import getAsyncPageContent from '~/mixins/getAsyncPageContent'

export default {
  name: 'AboutPage',
  components: { SplitScreenLayout },
  mixins: [getAsyncPageContent]
}
</script>
