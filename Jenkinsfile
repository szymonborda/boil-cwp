pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "boil-cwp"
        DOCKER_TAG = "latest"
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub')
        VERSION = "latest"
        ARTIFACT_NAME = "boil-cwp${VERSION}"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                branches: [[name: '*/main']],
                userRemoteConfigs: [[url: 'https://github.com/szymonborda/boil-cwp.git']]])
            }
        }
        stage('Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} --target boil-cwp-nginx ."
            }
        }
        stage('Test') {
          parallel {
                stage('Vitest') {
                  steps {
                    sh "touch logs.log"
                    sh "docker build -t boil-cwp-vitest:${VERSION} --target boil-cwp-vitest ."
                    sh "docker remove boil-cwp-vitest -f"
                    sh "docker run --name boil-cwp-vitest boil-cwp-vitest:${VERSION}"
                    archiveArtifacts '**/*log'
                  }
                }
                stage('Typecheck') {
                  steps {
                    sh "touch logs.log"
                    sh "docker build -t boil-cwp-typecheck:${VERSION} --target boil-cwp-typecheck ."
                    sh "docker remove boil-cwp-typecheck -f"
                    sh "docker run --name boil-cwp-typecheck boil-cwp-typecheck:${VERSION}"
                    archiveArtifacts '**/*log'
                  }
                }
                stage('Lint') {
                  steps {
                    sh "touch logs.log"
                    sh "docker build -t boil-cwp-lint:${VERSION} --target boil-cwp-lint ."
                    sh "docker remove boil-cwp-lint -f"
                    sh "docker run --name boil-cwp-lint boil-cwp-lint:${VERSION}"
                    archiveArtifacts '**/*log'
                  }
                }
            }
        }
        stage('Deploy') {
            steps {
                sh "docker remove boil-cwp-nginx -f"
                sh "docker run -d --name boil-cwp-nginx -p 80:80 boil-cwp:${VERSION}"
            }
        }
        stage('Publish') {
            steps {
                withCredentials([
                  usernamePassword(
                    credentialsId: 'docker-hub',
                    usernameVariable: 'DOCKER_HUB_USERNAME',
                    passwordVariable: 'DOCKER_HUB_PASSWORD'
                  )
                ]) {
                    sh 'docker login -u="${DOCKER_HUB_USERNAME}" -p="${DOCKER_HUB_PASSWORD}"'
                    sh 'docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} szymonborda/${DOCKER_IMAGE}:${DOCKER_TAG}'
                    sh 'docker push szymonborda/${DOCKER_IMAGE}:${DOCKER_TAG}'
                }
            }
        }
    }
}
