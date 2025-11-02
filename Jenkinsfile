pipeline {
    agent any

    tools {
        nodejs "Node_20_LTS"   // Must match your NodeJS name in Jenkins Global Tool Configuration
        git "DefaultGit"        // Optional if Git is globally available
    }

    environment {
        IMAGE_NAME = "animated-portfolio"      // local image name
        IMAGE_TAG  = "v1.0"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Pulling code from GitHub repository..."
                git branch: 'devops-docker-integration',
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/ArghyanilChowdhury/Animated-Portfolio-Website.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                bat 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                echo "Building the React project..."
                bat 'npm run build'
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                echo "Archiving the build folder for later stages..."
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                bat "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Run Docker Container') {
    steps {
        echo "Running Docker container locally..."

        // Stop and remove old container if it exists (Windows compatible)
        bat '''
        docker ps -a -q -f name=animated-portfolio > temp.txt
        for /f %%i in (temp.txt) do (
            docker stop animated-portfolio
            docker rm animated-portfolio
        )
        del temp.txt
        echo No existing container found or cleaned up successfully
        '''

        // Run new container
        bat 'docker run -d -p 8080:80 --name animated-portfolio animated-portfolio:v1.0'
    }
}


        stage('Verify Running Container') {
            steps {
                echo "Listing running containers..."
                bat 'docker ps'
            }
        }

        stage('Serve Build Locally (Optional)') {
            steps {
                echo "Starting local HTTP server to test the build output..."
                // Optional: Uncomment below if you have `serve` installed globally
                // bat 'npx serve -s dist -l 3000'
            }
        }
    }

    post {
        success {
            echo "✅ Jenkins pipeline executed successfully!"
        }
        failure {
            echo "❌ Jenkins pipeline failed. Please check the logs."
        }
    }
}