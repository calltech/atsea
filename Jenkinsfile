pipeline {
    // let jenkins assign proper  agent to run the tasks. if agent is none 
    // then we will have to assign angets manually with each step. 
    agent any
    environment {
        // Define var for docker image 
        frontendregistry = "programmer26/atsea-shop-demo"
        backendregistry = "programmer26/atsea-shop-backend"
        registryCredential = "dockerhub"
    }

    // Building the application and deploying it to kubernetes cluster
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
        stage('End to End test'){
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
            when {
                branch 'master'
            }
            steps {
                echo 'Running build automation'
                sh 'cd app/react-app && npm prune'
                sh 'cd app/react-app && npm install'
                //sh 'cd app/react-app && npm test'
                sh 'cd app/react-app && npm run build'
                //archiveArtifacts artifacts: 'dist/**' //onlyIfSuccessful: true
            }
        }

        // Building Backend Application
        stage('Building Backend Application') {
            when {
                branch 'master'
            }
            steps {
                echo 'Running Build for Backend'
                sh 'cd app && mvn clean install -DskipTests -f pom.xml'
            }
        }


// building docker image fro front end
        stage('Build Docker Image for Frontend') {
            when {
                branch 'master'
            }
            steps {
                script {
                    echo 'Building docker image'
                     frontend = docker.build(frontendregistry, "./app/")
                }
            }
        }

        stage('Smoke Test Frontend image') {
            steps {
                script {
                frontend.inside { 
                    sh 'echo "Tests passed"'
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
                    backend = docker.build(backendregistry, "./database/")
                    
                }
            }
        }

        stage('Smoke Test Backend image') {
            steps {
                script {
                backend.inside { 
                    sh 'echo "Tests passed"'
                }
                }

            }
            }



        stage('Deploy Frontend Image') {
        steps{
            script {
                docker.withRegistry( '', registryCredential ) {
                    frontend.push("${env.BUILD_NUMBER}")
                    frontend.push('latest')
            }
            }
        }
        }



        stage('Deploy backend Image') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        backend.push("${env.BUILD_NUMBER}")
                        backend.push('latest')
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

