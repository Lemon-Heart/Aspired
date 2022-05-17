export const state = () => ({
  formCompleteVisible: false,
  message: 'loading',
  loading: {
    text: '<h2 class="upper">Отправляем данные</h2>'
  },
  error: {
    text: '<h2 class="upper">Произошла ошибка</h2>'
  },
  succes: {
    text: `<h2 class="upper">Ура! форма отправлена</h2>
    <p>Спасибо за то, что обратились именно к нам. В ближайшее время</p>
    <p>наши специалисты свяжутся с Вами и ответят на все</p>
    <p>интересующиеся вопросы.</p>`,
    img: 'brief_complete.png'
  }
})

export const mutations = {
  toggleModal (state) {
    state.formCompleteVisible = !state.formCompleteVisible
  },
  sendMessage (state, message) {
    state.message = message
  }
}

export const getters = {
  getFormCompleteVisible: s => s.formCompleteVisible,
  getMessage: s => s.message,
  getLoading: s => s.loading,
  getError: s => s.error,
  getSucces: s => s.succes
}
