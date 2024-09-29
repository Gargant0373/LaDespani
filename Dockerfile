FROM node:18-alpine AS build

WORKDIR /app
COPY . /app
RUN npm install
RUN npm i -g serve
RUN npm run build
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
