FROM node:20

# 在镜像中创建一个文件夹存放应用程序代码，这将是你的应用程序工作目录
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./
# COPY . /usr/src/app
COPY package*.json ./
COPY tsconfig.build.json ./

RUN npm install -g pnpm --registry=https://registry.npm.taobao.org

RUN pnpm install

RUN pnpm run build
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD npm run start:prod

EXPOSE 4888

# CMD [ "npm" ,"start" ] 