FROM node:13-alpine 
# Create app directory
WORKDIR /app
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]