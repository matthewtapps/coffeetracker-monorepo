FROM node:lts AS development

ENV CI=true
ENV PORT=5173

WORKDIR /code
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

ENV VITE_APP_API_ENDPOINT=http://localapi.com/
ENV VITE_APP_MODE=development

CMD ["npm", "run", "host"]
