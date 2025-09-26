pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Dedayo-Adenugba/my-jenkins-app.git'
            }
        }

        stage('Build App') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test App') {
            steps {
                sh 'npm test || echo "No tests yet"'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t dedayo77/my-jenkins-app:${env.BUILD_NUMBER} ."
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                        sh "echo $PASS | docker login -u $USER --password-stdin"
                        sh "docker push yourdockerhubusername/my-jenkins-app:${env.BUILD_NUMBER}"
                    }
                }
            }
        }
    }
}

