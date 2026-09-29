FROM node:18-alpine AS build

WORKDIR /app
# Dependencies first, so this layer stays cached until package-lock.json changes.
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Only the built site and the web server ship. node_modules stays in the build
# stage, which keeps the image small on a VPS with limited disk.
FROM node:18-alpine

WORKDIR /app
# Pinned: serve.json uses serve 14's config format.
RUN npm i -g serve@14
COPY --from=build /app/dist ./dist
COPY serve.json ./
EXPOSE 3000
# No -s (single-page mode): it rewrites every extensionless URL to the root
# index.html, so the prerendered page in dist/<route>/index.html is never served
# and unknown URLs return the homepage with a 200 instead of 404.html.
# Redirects and headers live in serve.json (resolved relative to dist/).
CMD ["serve", "dist", "-l", "3000", "-c", "../serve.json"]
