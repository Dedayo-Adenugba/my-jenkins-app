const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
  res.end('Hello from Jenkins & Docker!\n');
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
{
  "name": "my-jenkins-app",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  }
}
# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install

COPY . .

# Run app
CMD ["npm", "start"]

# Expose port
EXPOSE 3000
pipeline {
    agent any
    environment {
        DOCKERHUB = 'https://index.docker.io/v1/'
        IMAGE = dedayo77/my-jenkins-app'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE}:${env.BUILD_NUMBER}")
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry(DOCKERHUB, 'dockerhub-creds') {
                        def built = docker.build("${IMAGE}:${env.BUILD_NUMBER}")
                        built.push()
                        built.push('latest')
                    }
                }
            }
        }
    }
}

