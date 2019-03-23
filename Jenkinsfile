pipeline {
    // let jenkins assign proper  agent to run the tasks. if agent is none 
    // then we will have to assign angets manually with each step. 
  agent any
    environment {
        // Define var for docker image 
        FRONTEND_IMAGE = "programmer26/frontend-atsa-shop"
        BACKEND_IMAGE = "programmer26/backend-atsa-shop"
        registryCredential = 'dockerhub'
    }

    // Building the application and saving it as an jenkins artifact in dist folder
    stages {


    

// Unit Tests ...
    stage('Unit Tests') {
        steps {
            echo 'Unit test begins ..... '
            // unstash 'node_modules'
            // sh 'yarn test:ci'
            // junit 'reports/**/*.xml'
        }
    }

// End to end tests , 
    stage ('End to End test'){
        steps {
            echo 'End to End Tests Start Now!'
            // unstash 'node_modules'
            // sh 'mkdir -p reports'
            // sh 'yarn e2e:pre-ci'
            // sh 'yarn e2e:ci'
            // sh 'yarn e2e:post-ci'
            // junit 'reports/**/*.xml'
        }
    }


// Build the application
        stage('Building Front end application') {
            steps {
                echo 'Running build automation'
              //  sh 'cd app/react-app'
                sh 'cd app/react-app && npm prune'
               // sh 'npm prune'
                sh 'cd app/react-app && npm install'
               // sh 'cd app/react-app && npm test'
                sh 'cd app/react-app && npm run build'
                archiveArtifacts artifacts: 'dist/**' //onlyIfSuccessful: true
            }
        }

        // Building Backend Application
        stage('Building Backend Application') {
            steps {
                echo 'Running Build for Backend'
                sh 'mvn -B -f app/pom.xml'
            }
        }


// building docker image fro front end
        stage('Build Docker Image for Frontend') {
            when {
                branch 'master'
            }
            steps {
                script {
                    dockerfile = 'Dockerfile'
                    app = docker.build("FRONTEND_IMAGE:${env.BUILD_ID}", "-f ${dockerfile} ./app")
                    app.inside {
                        sh 'echo Hello, World!'
                    }
                }
            }
        }




        // building docker image for backend
        stage('Build Docker Image for Backend') {
            when {
                branch 'master'
            }
            steps {
                script {
                    dockerfile_backend = 'Dockerfile'
                    app = docker.build("BACKEND_IMAGE:${env.BUILD_ID}", "-f ${dockerfile} ./database")
                    app.inside {
                        sh 'echo Hello, World!'
                    }
                }
            }
        }





// pushing docker image to the docker repository
        stage('Push Docker Image') {
            when {
                branch 'master'
            }
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }

        // Deploying it to productions
        // stage('DeployToProduction') {
        //     when {
        //         branch 'master'
        //     }
        //     steps {
        //         input 'Deploy to Production?'
        //         milestone(1)
        //         kubernetesDeploy(
        //             kubeconfigId: 'kubeconfig',
        //             configs: 'assignment01-full.yml',
        //             enableConfigSubstitution: true
        //         )
        //     }
        // }
    }
}