const useApi = () => {

  const BASE_URL: string = "https://my-json-server.typicode.com/benirvingplt/products/";

  const headers: any = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  const get = (endpoint: string):Promise<any> => {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: headers
      })
        .then(res => res.json())
        .then(resolve)
        .catch(reject)
    })
  }

  const post = (endpoint: string, body: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(resolve)
        .catch(reject)
    })
  }

  return {
    get,
    post
  }
}

export default useApi;