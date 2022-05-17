export default {
  async asyncData (context) {
    const pageContent = await context.$http.$get(`http://test.janeira.ru${context.route.path}.json`)
    return { pageContent }
  }
}
