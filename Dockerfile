FROM node:16-alpine

USER node
WORKDIR /home/node/app

COPY --chown=node package*.json .
RUN npm ci

COPY --chown=node . .
RUN npm run build

EXPOSE 3000-3001

ENV NODE_ENV=production
CMD ["npm", "run", "start:pm2"]
