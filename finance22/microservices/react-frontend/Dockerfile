FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY public /app/public
# COPY src /app/src
EXPOSE 3000
CMD ["npm", "start"]