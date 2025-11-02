pipeline {
    agent any

    tools {
        nodejs "Node_20_LTS"   // Must match your NodeJS name in Jenkins Global Tool Configuration
        git "DefaultGit"        // Optional if Git is globally available
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Pulling code from GitHub repository..."
                git branch: 'devops-docker-integration',
                    credentialsId: 'github-credentials',  // ✅ Use the ID of the credentials you created in Jenkins
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

        stage('Serve Build Locally (Optional)') {
            steps {
                echo "Starting local HTTP server to test the build output..."
                // Optional: Uncomment below if you have `serve` installed globally
                // bat 'npx serve -s build -l 3000'
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