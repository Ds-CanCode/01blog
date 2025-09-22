FROM node:22
COPY . /app
WORKDIR /app
RUN npm install
CMD ["npm", "start", "--", "--host", "0.0.0.0"]