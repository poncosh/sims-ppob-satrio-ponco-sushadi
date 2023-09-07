FROM node:18.12.1

ENV VITE_APP_URI=

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]