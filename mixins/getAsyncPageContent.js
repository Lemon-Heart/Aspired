export default {
  async asyncData (context) {
    const pageContent = await context.$http.$get(`/mock${context.route.path}.json`)
    return { pageContent }
  }
}
