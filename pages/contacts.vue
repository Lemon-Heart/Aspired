<template>
  <SplitScreenLayout>
    <template #left>
      <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A12e29587eee1695d4609d333b93bf065deae95b6357fe584d02b1b59900ac451&amp;width=100%25&amp;lang=ru_RU&amp;scroll=true" />
    </template>
    <template #right>
      <h2 class="upper">
        {{ pageContent.h1 }}
      </h2>
      <div class="contacts">
        <div class="flex flex-col">
          <h3>{{ pageContent.contacts.shedule.title }}</h3>
          <span>{{ pageContent.contacts.shedule.weekdays }}</span>
          <span>{{ pageContent.contacts.shedule.weekend }}</span>
        </div>
        <div class="flex flex-col">
          <h3>{{ pageContent.contacts.phoneANDmail.title }}</h3>
          <a :href="toTel(pageContent.contacts.phoneANDmail.phone)">{{ pageContent.contacts.phoneANDmail.phone }}</a>
          <a :href="'mailto:' + pageContent.contacts.phoneANDmail.mail">{{ pageContent.contacts.phoneANDmail.mail }}</a>
        </div>
        <div class="flex flex-col">
          <h3>{{ pageContent.contacts.adress.title }}</h3>
          <span>{{ pageContent.contacts.adress.adress }}</span>
        </div>
        <div class="contacts__links">
          <a v-for="(item, i) in pageContent.links" :key="i" target="blank" class="contacts__link" :href="item.url"><component :is="componentsNames[i]" /></a>
        </div>
      </div>
      <h2 class="upper">
        {{ pageContent.h2 }}
      </h2>
      <QuickForm
        :form="quickForm.form"
        @onSubmitForm="onSubmitForm(quickForm.form)"
      />
    </template>
  </SplitScreenLayout>
</template>

<script>
import SplitScreenLayout from '~/layouts/SplitScreenLayout.vue'
import formProcessing from '~/mixins/formProcessing'
import getAsyncPageContent from '~/mixins/getAsyncPageContent'

export default {
  name: 'ContactsPage',
  components: { SplitScreenLayout },
  mixins: [formProcessing, getAsyncPageContent],
  data () {
    return {
      componentsNames: [],
      quickForm: {
        form: []
      },
      formData: {}
    }
  },
  mounted () {
    this.dynamicsComponentRegistration(this.pageContent.links)
    this.getDataForQuickForm()
  },
  methods: {
    toTel: tel => tel.replace(/[^+\d]/g, ''),
    async getDataForQuickForm () {
      const res = await this.$http.$get('/mock/quickForm.json')
      this.quickForm.form = res.quickForm
    },
    dynamicsComponentRegistration (array) {
      for (let c = 0; c < array.length; c++) {
        this.$options.components[array[c].icon] = () => import('~/assets/icons/' + array[c].icon + '.svg?inline')
        this.$set(this.componentsNames, c, array[c].icon)
      }
    }
  }
}
</script>

<style lang="scss">
.contacts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 3vw;
  align-items: flex-start;
  margin-bottom: 50px;
  h3 {
    margin-bottom: 15px;
  }
  a {
    color: black;
  }
  &__links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(35px, 35px));
    grid-gap: 20px;
    align-items: center;
  }
  &__link {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid #405d9a;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    svg {
      width: 20px;
    }
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>
