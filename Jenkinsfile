pipeline {
    agent any

    stages {
        stage('Build Backend') {
            steps {
                nodejs('node') {
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                nodejs('node') {
                    sh 'npm test'
                }
            }
        }
    }
}
