FROM node:lts AS development

ENV CI=true
ENV PORT=5173

WORKDIR /code
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

CMD ["npm", "run", "host"]

FROM development AS builder

RUN npm run build

FROM nginx:1.13-alpine

COPY --from=builder /code/dist /usr/share/nginx/html
