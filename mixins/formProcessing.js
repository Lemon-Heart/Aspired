import { mapMutations } from 'vuex'
import { makeRequest } from '~/api'
export default {
  methods: {
    ...mapMutations('modal', ['toggleModal', 'sendMessage']),
    onSubmitForm (form) {
      if (this.validate(form)) {
        this.pushData(form)
        this.send(JSON.stringify(this.formData))
        this.formData = {}
      }
    },
    validate (form) {
      let isValid = true
      for (const key of form) {
        if (key.title === '' && key.required === true) {
          key.error = true
          isValid = false
        }
      }
      return isValid
    },
    pushData (form) {
      for (const key of form) {
        this.formData[key.name] = key.title
      }
    },
    async send (data) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
      }
      this.toggleModal()
      this.$set(this.quickForm, 'animation', 'fade')
      // Обращаемся к api
      const result = await makeRequest.fetch('/posts', requestOptions)
      // Обрабатываем ответ
      if (result.response) {
        result.response.ok ? this.sendMessage('succes') : this.sendMessage('error')
      } else {
        this.sendMessage('error')
      }
      setTimeout(() => {
        this.toggleModal()
        this.step = 0
        this.$modal.hide('brief')
      }, 1500)
    }
  }
}
