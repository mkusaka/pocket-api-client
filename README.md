# pocket-api-client

promise based pocket api client. Inspired by https://github.com/tobiaswright/pocket-api and https://github.com/vicchi/node-getpocket/blob/master/getpocket.js

# install

```bash
npm install --save @mkusaka/pocket-api-client
```

# useage

node
```js
import ApiClient from "@mkusaka/pocket-api-client";

/*
  get request token
    you may have to authorize app using oauth2. steps are below.

    1. make server at locahost (example are at main.go, `go run main.go` up server at `http://localhost:8080/get`)

    2. make code and execute as below.
*/

const client = new ApiClient("your consumer_key");
client.getRequestToken()

/*
    3. then, url shown at console log like follow. so access and add permisson to application.
    open following url and accept application with running local server (go run main.go makes good for use). This must operate at least once.
          https://getpocket.com/auth/authorize?request_token=1111-abdc-eee&redirect_uri=http://localhost:8080/get


// I think this sequence are very troublesome (this troublesome comes from low understanding of me.. ). I should add some adequate redirect process, then it makes easier.
*/

/*
  get access token
    you can get access token using reuquest token and consumer_key exist. steps are below
      1. get consumer_key and request token (like above).
      2. set client and request
*/

const client = new ApiClient("your consumer_key", {
  requestToken: "your request token"
});

/*
  get articles
    you can article using access_key and consumer_key exist. steps are below
      1. get consumer_key and access key (like above).
      2. set client and request
*/

const client = new ApiClient("your consumer_key", {
  accessToken: "your request token",
});

client.retrieveArticles({
  count: 1
})
  .then(articles => {
    // some process
  });

```

# TODO
- seamless process like follow will be implemented (maybe).

```js
const client = new ApiClient("your consumer_key", {
}).
  client.retrieveArticles({
  count: 1
})
  .then(articles => );
```

# ref
- [Pocket Developer Program: Pocket API Documentation](https://getpocket.com/developer/docs/overview)
