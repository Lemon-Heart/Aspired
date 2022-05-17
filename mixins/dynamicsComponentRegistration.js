// Метод динамично регистрирует иконку, необходимо поместить svg-иконку в папку /icons и передать методу МАССИВ объектов, содержащих поле icon, в котором будет указано имя svg-иконки
export default {
  methods: {
    dynamicsComponentRegistration (array) {
      for (let c = 0; c < array.length; c++) {
        this.$options.components[array[c].icon] = () => import('~/assets/icons/' + array[c].icon + '.svg?inline')
      }
    }
  }
}
