# graphql-nodejs
> Graphql with nodejs

## v 1.0.0
- [x] Node.js(express)
- [x] apollo-server
- [x] es6
- [x] login and jwt session
- [x] sign-up
- [x] Graphql query, mutation
- [x] prisma
- [x] sqlite
- [ ] [hacker news api](https://news.ycombinator.com/best)
- [x] Realtime Graphql subscriptions
  - update new link()
  - update vote()
- [ ] filtering
- [ ] pagination
- [ ] sorting

## v 2.0.0
- [ ] middleware validation(pipelining)
- [ ] websocket performance refactor
  - [live 1M GraphQL Websocket](https://itnext.io/how-we-manage-live-1m-graphql-websocket-subscriptions-11e1880758b0)
  - [apollo-subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/)
- [ ] prisma performance optimization
- [ ] typescript
- [ ] google oauth2
- [ ] realtime chatting
- [ ] 3rd party api

## setup
```
npm install apollo-server graphql
npm install jsonwebtoken bcryptjs
npm i @prisma/cli -D


npx prisma init
npx prisma migrate dev --preview-feature
npx prisma generate
npx prisma studio # check model with prisma studio web
```


## ref

- [hackernews-graphql-js](https://github.com/howtographql/graphql-js)


