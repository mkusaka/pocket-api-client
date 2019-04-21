const pocket = require("pocket-api");

import { request } from "./ajax";
interface requestTokenResponse {
  code: string;
  state: any;
}

interface responseArticle {
  item_id: string;
  resolved_id: string;
  given_url: string;
  given_title: string;
  favorite: string;
  status: string;
  time_added: string;
  time_updated: string;
  time_read: string;
  time_favorited: string;
  sort_id: number,
  resolved_title: string;
  resolved_url: string;
  excerpt: string;
  is_article: string;
  is_index: string;
  has_video: string;
  has_image: string;
  word_count: string;
  lang: string;
  top_image_url: string;
  domain_metadata?: {
    name: string;
    logo: string;
    greyscale_logo: string;
  },
  listen_duration_estimate: number
}

/*
{
  '2565750566':
  {
    item_id: '2565750566',
    resolved_id: '2565750566',
    given_url: 'https://medium.com/@shintaroshiba/%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%81%A8%E3%81%97%E3%81%A6%E3%81%AE%E3%83%88%E3%83%A8%E3%82%BF%E3%81%A8%E3%81%84%E3%81%86%E9%81%B8%E6%8A%9E-3a4ccbe4570b',
    given_title: '',
    favorite: '0',
    status: '0',
    time_added: '1555765608',
    time_updated: '1555765610',
    time_read: '0',
    time_favorited: '0',
    sort_id: 10,
    resolved_title: 'ソフトウェアエンジニアとしてのトヨタという選択',
    resolved_url: 'https://medium.com/@shintaroshiba/%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%81%A8%E3%81%97%E3%81%A6%E3%81%AE%E3%83%88%E3%83%A8%E3%82%BF%E3%81%A8%E3%81%84%E3%81%86%E9%81%B8%E6%8A%9E-3a4ccbe4570b',
    excerpt: '先日、他社からのオファーを断った。非常にエキサイティングな海外の会社（勤務地も海外）だったのだけれども、その決断に際して3週間くらいうじうじと迷っていた。',
    is_article: '1',
    is_index: '0',
    has_video: '0',
    has_image: '1',
    word_count: '2158',
    lang: 'ja',
    top_image_url: 'https://cdn-images-1.medium.com/max/1200/1*dvr9fFP0Yna6HqzN9BzCyg.png',
    domain_metadata: {
      name: 'Medium',
      logo: 'https://logo.clearbit.com/medium.com?size=800',
      greyscale_logo: 'https://logo.clearbit.com/medium.com?size=800&greyscale=true'
    },
    listen_duration_estimate: 835
  },
  ....
}
*/

interface getArticlesResponse {
  state: number;
  complete: number;
  list: {
    [key: string]: responseArticle
  };
  error: Error;
  search_meta: {
    search_type: string
  };
  since: number
}

interface optionConfig {
  accessToken?: string,
  requestToken?: string,
  redirectUri?: string,
}

class ApiClient {
  requestTokenPath: string = "oauth/request";
  accessTokenPath: string = "oauth/authorize";
  getArticlesPath: string = "get";
  addArticlesPath: string = "add";
  sendArticlesPath: string = "send";
  _resArticles: any;

  _consumerKey: string;
  _accessToken?: string;
  _requestToken?: string;

  _redirectUri: string;

  constructor(consumerKey: string, options?: optionConfig) {
    this._consumerKey = consumerKey;
    this._redirectUri = "http://localhost:8080/get";
    if (options) {
      this._requestToken = options.requestToken;
      this._accessToken = options.accessToken;
      this._redirectUri = options.redirectUri;
    }
  }

  getRequestToken() {
    return request({
      method: "POST",
      data: {
        consumer_key: this._consumerKey,
        redirect_uri: "http://localhost:8080/get",
      },
      url: this.requestTokenPath,
    }).then(response => {
      this._requestToken = response.data.code;
      console.log(
        `open following url and accept application with running local server (go run main.go makes good for use). This must operate at least once.
          https://getpocket.com/auth/authorize?request_token=${
            this._requestToken
          }&redirect_uri=${this._redirectUri}
        `
      );
    });
  }

  getAccessToken() {
    if (!this._requestToken) {
      throw TypeError("this operation require request_token.");
    }
    return new Promise(resolve => {
      pocket.getAccessToken(
        this._consumerKey,
        this._requestToken,
        (data: requestTokenResponse) => {
          const accessToken = data.code;
          this._accessToken = accessToken;
          return resolve(accessToken);
        }
      );
    });
  }

  getArticles() {
    if (!this._accessToken) {
      throw TypeError("this operation require access_token.");
    }
    return new Promise((resolve, reject) => {
      pocket.getArticles(
        this._consumerKey,
        this._accessToken,
        (error, data?: getArticlesResponse) => {
          if (error || !data) {
            return reject(error);
          }

          const articleList = data.list;
          this._resArticles = Object.keys(articleList).map(
            key => articleList[key]
          );
          return resolve(this._resArticles);
        }
      );
    });
  }
}

export default ApiClient;
