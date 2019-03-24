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
                    def frontend = docker.build(frontendregistry, "./app/")
                }
            }
        }

// Pushing frontwnd docker image to the registry
        stage('Pushing frontend docker image to reository') {
            when {
                branch 'master'
            }
            steps {
                script {
                docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                //frontend.push()
                     //sh 'docker tag atsea-shop-demo:latest programmer26/atsea-shop-demo:latest'
                sh 'docker login -u programmer26 -p 612254Abc'
                sh "docker push programmer26/atsea-shop-demo:latest"
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
                   def backend = docker.build(backendregistry, "./database/")
                    
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
                    // backend.push()
                sh 'docker login -u programmer26 -p 612254Abc'
                sh 'docker push programmer26/atsea-shop-backend:latest'
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