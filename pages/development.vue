<template>
  <SplitScreenLayout>
    <template #left>
      <img :src="require('~/assets/img/' + pageContent.image )" alt="О нас">
    </template>
    <template #right>
      <div class="mb30" v-html="pageContent.content" />
      <AppDropDownList v-for="item in pageContent.dropDownLists" :key="item.title" :title="item.title" :body="item.body" />
    </template>
  </SplitScreenLayout>
</template>

<script>
import SplitScreenLayout from '~/layouts/SplitScreenLayout.vue'
import AppDropDownList from '~/components/AppDropDownList.vue'
import getAsyncPageContent from '~/mixins/getAsyncPageContent'

export default {
  name: 'DevelopmentPage',
  components: { AppDropDownList, SplitScreenLayout },
  mixins: [getAsyncPageContent]
}
</script>
