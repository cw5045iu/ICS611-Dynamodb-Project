# ICS611-Dynamodb-Project
A class project implementing web app using AWS Dynamodb and Node.js


# Setup and Installation
* Download [vscode](https://code.visualstudio.com/download)
* Install Node.js [14.16](https://nodejs.org/en/)
    * Test Install
        * node -v
        * npm -v

* Download AWS-CLI
    * Mac sure java is [installed](https://java.com/en/download/apple.jsp) 
    * MAC OS: Brew install awscli
* Install dynamodb for local developement
    * Download [dynamodb-local](https://s3-us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.zip)
    * extract
* Run local DynamoDb instance
    * navigate to folder in previous step
    * Run "java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb"
* Run AWS CLI
    * Open new terminal and navigate to "/usr/local/Cellar/awscli/{version number}" 
    * Run "aws configure" in terminal
        * the following with need to be inputted 
            * AWS Access Key ID [None]: 123ABC
            * AWS Secret Access Key [None]: 123ABC
            * Default region name [None]: local
            * Default output format [None]: json
        * Now we are set up locally 
            * aws dynamodb list-tables --endpoint-url http://localhost:8000 
* clone repo
* cd into folder
* npm install
* npm run debug
