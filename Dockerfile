FROM node:18 as boil-cwp-build
WORKDIR /usr/src/app
RUN git clone https://github.com/szymonborda/boil-cwp.git
WORKDIR /usr/src/app/boil-cwp
RUN yarn
RUN yarn run build

FROM boil-cwp-build as boil-cwp-vitest
CMD ["yarn", "run", "test"]

FROM boil-cwp-build as boil-cwp-typecheck
CMD ["yarn", "run", "typecheck"]

FROM boil-cwp-build as boil-cwp-lint
CMD ["yarn", "run", "lint"]

FROM nginx:1.23 as boil-cwp-nginx
COPY --from=boil-cwp-build /usr/src/app/boil-cwp/dist /usr/share/nginx/html
