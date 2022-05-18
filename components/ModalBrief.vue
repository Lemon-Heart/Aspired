<template>
  <div class="brief" @click.stop>
    <div class="close" @click="$modal.hide('brief')">
      ✖
    </div>
    <transition name="message" mode="in-out">
      <div :key="'brief__wrap'" class="brief__wrap">
        <div class="brief__left">
          <transition name="briefSlide" mode="out-in">
            <QuickForm
              v-show="step === 0"
              :form="quickForm.form"
              :title="quickForm.title"
              :description="quickForm.description"
              :button-text="quickForm.buttonText"
              :links="quickForm.links"
              :calculation="true"
              @stepChange="stepChange"
              @onSubmitForm="onSubmitForm(quickForm.form)"
            />
          </transition>
          <transition name="briefSlide" mode="out-in">
            <ExtendedForm
              v-show="step !== 0"
              :step="step"
              :form="extendedForm.form"
              :icons="extendedForm.progressIcons"
              @stepChange="stepChange"
              @formNextStep="formNextStep(extendedForm.form[step - 1])"
              @formPrevStep="step--"
              @onSubmitForm="onSubmitForm(extendedForm.form[step - 1])"
            />
          </transition>
        </div>
        <transition name="fade" mode="out-in">
          <BriefDescription
            :step="step"
            :brief-description="briefDescription"
            @stepChange="stepChange"
          />
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import formProcessing from '~/mixins/formProcessing'

export default {
  name: 'ModalBrief',
  mixins: [formProcessing],
  data () {
    return {
      step: 0,
      extendedForm: {
        form: [],
        progressIcons: []
      },
      quickForm: {
        form: [],
        title: '',
        description: '',
        buttonText: '',
        links: []
      },
      briefDescription: [],
      formData: {}
    }
  },
  mounted () {
    this.getDataForQuickForm()
    this.getDataForExtendedForm()
    this.getDataForBriefDescription()
  },
  methods: {
    async getDataForQuickForm () {
      const res = await this.$http.$get('/mock/quickForm.json')
      this.quickForm.form = res.quickForm
      this.quickForm.title = res.title
      this.quickForm.description = res.description
      this.quickForm.buttonText = res.buttonText
      this.quickForm.links = res.links
    },
    async getDataForExtendedForm () {
      const res = await this.$http.$get('/mock/extendedForm.json')
      this.extendedForm.form = res.extendedForm
      this.extendedForm.progressIcons = res.progressIcons
    },
    async getDataForBriefDescription () {
      const res = await this.$http.$get('/mock/briefDescription.json')
      this.briefDescription = res.briefDescription
    },
    stepChange (step) {
      this.step = step
    },
    formNextStep (form) {
      if (this.validate(form)) {
        this.pushData(form)
        this.step++
      }
    }
  }
}
</script>
