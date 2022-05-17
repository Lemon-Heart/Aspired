class MakeRequest {
  constructor () {
    this._apiBase = 'https://jsonplaceholder.typicode.com'
  }

  fetch = async (url, options = {}) => {
    const url1 = this.generateUrl(url, options)
    const response = await fetch(`${url1}`)
    return {
      response
    }
  }

  generateUrl (url, params) {
    const url1 = new URL(`${makeRequest._apiBase}${url}`)
    const obj = {
      ...params
    }
    url1.search = new URLSearchParams(obj)
    return url1
  }
}

export const makeRequest = new MakeRequest()
