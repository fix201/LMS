# Script is not intended to be run as is
exit
mvn clean install
#####################################################################################
#                                Infrastructure                                     #
#####################################################################################
cd ../lms-infrastructure
cdk synth
cdk deploy
cdk destroy

#####################################################################################
#                                  Backend                                          #
#####################################################################################
# Build package
cd ../lms-core
mvn clean package -P prod

# Move package to cloud
scp -P 22 -i key-pair.pem ../lms-core/target/lms-core-1.0.0.jar  ec2-user@ip:~

# Run package
java -jar lms-core-1.0.0.jar

#####################################################################################
#                                  Frontend                                         #
#####################################################################################
# change lms-ui/src/config.js api
aws s3 sync ./build s3://library-mngmt-system --delete