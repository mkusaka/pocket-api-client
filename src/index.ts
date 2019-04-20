import { request } from "./ajax";
import { requestPaths, defaultConfig } from "./config";

interface pathes {
  request: string,
  authorize: string,
  get: string,
  add: string,
  modify: string
}

interface config {
  consumerKey: string;
}

class ApiClient {
  requestTokenPath: string;
  accessTokenPath: string;
  getArticlesPath: string;
  consumerKey: string;
  requestToken?: string;
  accessToken?: string;

  constructor(
    basicConfig: config = defaultConfig,
    pathes: pathes = requestPaths
  ) {
    this.requestTokenPath = pathes.get;
    this.accessTokenPath = pathes.authorize;
    this.getArticlesPath = pathes.get;
    // this.addArticlesPath = pathes.add;
    // this.modifyArticlesPath = pathes.modify;
    this.consumerKey = basicConfig.consumerKey;
  }

  getRequestToken() {
    const body = `consumer_key=${this.consumerKey}&redirect_uri=pocketapp1234:authorizationFinished`;
    // const body = {
    //   consumer_key: this.consumerKey,
    //   redirect_uri: "pocketapp1234:authorizationFinished",
    // };

    return request({
      method: "POST",
      data: body,
      url: this.requestTokenPath
    })
      .then(response => {
        const token: string = response.code;
        this.requestToken = token
        return token;
      })
      .catch(e => console.log(e));
  }

  getAccessToken() {
    return this.getRequestToken()
      .then(requestToken => {
        const body = {
          consumer_key: this.consumerKey,
          code: requestToken,
          redirect_uri: "pocketapp1234:authorizationFinished",
        };
        return request({
          method: "POST",
          data: body,
          url: this.accessTokenPath
        })
      })
      .then(response => {
        const token: string = response.code;
        this.accessToken = token;
        return token
      })
  }

  getArticles() {
    this.getAccessToken()
      .then(accessToken => {
        const body = {
          access_token: accessToken,
          consumer_key: this.consumerKey,
        };

        return request({
          method: "POST",
          data: body,
          url: this.getArticlesPath
        })
      })
      .then(response => {
        console.log(response)
        return response
      });
  }
}

export default ApiClient;
