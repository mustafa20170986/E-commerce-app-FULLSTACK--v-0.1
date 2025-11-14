#Base image
FROM node:22-alpine
#working directory
 WORKDIR /app
 #copy package and files
 COPY package*.json ./

 RUN npm install 
 #copy all files 
 COPY . .
 #expose port 
 EXPOSE 2007
 #commadn to run the service
 CMD ["node","server.js"]