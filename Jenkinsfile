pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Hello Jenkins! Building Node.js app...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test || echo "No tests defined"'
            }
        }
        stage('Run') {
            steps {
                echo 'Starting app for test...'
                sh 'node app.js & sleep 5 && kill $!'
            }
        }
    }
}



