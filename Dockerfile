FROM node:18-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY server.js .
COPY public ./public

# Environment variables for backend communication
ENV PORT=3000
ENV BACKEND_URL=http://localhost:5000

EXPOSE 3000

CMD ["npm", "start"]
