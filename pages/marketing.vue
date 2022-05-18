<template>
  <div class="content">
    <SplitScreenLayout>
      <template #left>
        <img :src="require('~/assets/img/' + pageContent.image )" alt="О нас">
      </template>
      <template #right>
        <div class="mb30" v-html="pageContent.content" />
        <AppDropDownList v-for="item in pageContent.dropDownLists" :key="item.title" :title="item.title" :body="item.body" />
        <div v-html="pageContent.footerContent" />
      </template>
    </SplitScreenLayout>
  </div>
</template>

<script>
import SplitScreenLayout from '~/layouts/SplitScreenLayout.vue'
import AppDropDownList from '~/components/AppDropDownList.vue'
import getAsyncPageContent from '~/mixins/getAsyncPageContent'

export default {
  name: 'MarketingPage',
  components: { AppDropDownList, SplitScreenLayout },
  mixins: [getAsyncPageContent]
}
</script>
