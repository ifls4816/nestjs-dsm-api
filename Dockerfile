###################

# BUILD FOR LOCAL DEVELOPMENT

###################

FROM node:20-alpine As development

# 创建应用目录
WORKDIR /usr/src/app

# 复制依赖清单到容器镜像里.
# 这个星号通配符意思是复制package.json和package-lock.json,复制到当前应用目录.
# 首先复制这个选项可以防止在每次代码更改时重新运行npm install.
COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig.build.json ./

# 使用npm ci来安装依赖而不是npm install
RUN npm ci

# 复制安装后的依赖包到当前目录下
COPY --chown=node:node . .


###################

# BUILD FOR PRODUCTION

###################

FROM node:20-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig.build.json ./

# 通过Nest CLI 来执行npm run build,这是个开发依赖，然后把安装后依赖全部复制到指定目录
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .


RUN npm run build

# 设置生产环境变量
ENV NODE_ENV production

# 运行' npm ci '会删除现有的node_modules目录，并传入——only=production确保只安装了生产依赖项。这确保node_modules目录尽可能优化
RUN npm ci --only=production && npm cache clean --force


###################

# PRODUCTION

###################

FROM node:20-alpine As production

# 将生产依赖和打包后的文件复制到指定目录下
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# 暴漏端口号
EXPOSE 4888

CMD [ "node", "dist/main.js" ]

# 镜像可能需要另外运行 node dist/main.js
