# =====================================================
# JustDefenders ©
# Enterprise Container Runtime
# =====================================================

FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "run", "dev"]