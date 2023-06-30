package com.harrisburgu.lms;

import software.amazon.awscdk.CfnOutput;
import software.amazon.awscdk.RemovalPolicy;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;
import software.amazon.awscdk.services.ec2.AmazonLinuxEdition;
import software.amazon.awscdk.services.ec2.AmazonLinuxGeneration;
import software.amazon.awscdk.services.ec2.AmazonLinuxImage;
import software.amazon.awscdk.services.ec2.AmazonLinuxStorage;
import software.amazon.awscdk.services.ec2.AmazonLinuxVirt;
import software.amazon.awscdk.services.ec2.IMachineImage;
import software.amazon.awscdk.services.ec2.IVpc;
import software.amazon.awscdk.services.ec2.Instance;
import software.amazon.awscdk.services.ec2.InstanceClass;
import software.amazon.awscdk.services.ec2.InstanceSize;
import software.amazon.awscdk.services.ec2.InstanceType;
import software.amazon.awscdk.services.ec2.Peer;
import software.amazon.awscdk.services.ec2.Port;
import software.amazon.awscdk.services.ec2.SecurityGroup;
import software.amazon.awscdk.services.ec2.SubnetSelection;
import software.amazon.awscdk.services.ec2.SubnetType;
import software.amazon.awscdk.services.ec2.UserData;
import software.amazon.awscdk.services.ec2.Vpc;
import software.amazon.awscdk.services.ec2.VpcLookupOptions;
import software.amazon.awscdk.services.rds.DatabaseInstance;
import software.amazon.awscdk.services.rds.DatabaseInstanceEngine;
import software.amazon.awscdk.services.rds.StorageType;
import software.amazon.awscdk.services.s3.BlockPublicAccess;
import software.amazon.awscdk.services.s3.Bucket;
import software.constructs.Construct;

import java.util.List;

public class LmsInfrastructureStack extends Stack {

    public LmsInfrastructureStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        final IVpc vpc = Vpc.fromLookup(this, "DefaultVPC", VpcLookupOptions.builder().isDefault(true).build());

        SecurityGroup rdsSecurityGroup = SecurityGroup.Builder.create(this,  "LMS-DB-SG")
                .vpc(vpc)
                .description("Allow MySQL traffic from EC2 instances")
                .build();
        rdsSecurityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(3306), "allow MySQL access from the world");
        
        // create rds
        final DatabaseInstance instance = DatabaseInstance.Builder.create(this, "LMS-DB")
                .databaseName("lms")
                .instanceType(InstanceType.of(InstanceClass.BURSTABLE3, InstanceSize.MICRO))
                .engine(DatabaseInstanceEngine.MARIADB)
                .storageType(StorageType.GP2)
                .allocatedStorage(20)
                .vpc(vpc)
                .securityGroups(List.of(rdsSecurityGroup))
                .publiclyAccessible(true)
                .vpcSubnets(SubnetSelection.builder().subnetType(SubnetType.PUBLIC).build())
                .removalPolicy(RemovalPolicy.DESTROY)
                .build();

        // ec2 instance security group
        SecurityGroup securityGroup = SecurityGroup.Builder.create(this, "LMS-Server-SG")
                .vpc(vpc)
                .description("Allow ssh access to ec2 instances")
                .allowAllOutbound(true)
                .disableInlineRules(true)
                .build();
        securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(22), "allow ssh access from the world");
        securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(8080), "allow tomcat server access");

        // ec2 instance image
        IMachineImage image = AmazonLinuxImage.Builder.create()
                .generation(AmazonLinuxGeneration.AMAZON_LINUX_2)
                .edition(AmazonLinuxEdition.STANDARD)
                .virtualization(AmazonLinuxVirt.HVM)
                .storage(AmazonLinuxStorage.GENERAL_PURPOSE)
                .build();

        // use scripts to install java
        UserData userData = UserData.forLinux();
        userData.addCommands("""
                yum update -y
                yum install java-17-amazon-corretto-headless -y
                """);

        // Create an EC2 instance
        Instance ec2Instance = Instance.Builder.create(this, "LMS-SERVER")
                .instanceType(InstanceType.of(InstanceClass.BURSTABLE2, InstanceSize.MICRO))
                .machineImage(image)
                .vpc(vpc)
                .securityGroup(securityGroup)
                .userData(userData)
                .keyName("lms-kp")
                .build();

        // create s3 bucket for user interface
        Bucket websiteBucket = Bucket.Builder.create(this, "LMS-S3")
                .bucketName("library-mngmt-system")
                .removalPolicy(RemovalPolicy.DESTROY)
                .autoDeleteObjects(true)
                .blockPublicAccess(BlockPublicAccess.Builder.create().blockPublicPolicy(false).build())
                .publicReadAccess(true)
                .websiteIndexDocument("index.html")
                .websiteErrorDocument("index.html")
                .build();
        
        CfnOutput.Builder.create(this, "WebsiteURL")
                .value(websiteBucket.getBucketWebsiteUrl())
                .build();

        CfnOutput.Builder.create(this, "Database URL")
                .value(instance.getDbInstanceEndpointAddress())
                .build();

        CfnOutput.Builder.create(this, "Database Password")
                .value(instance.getSecret().secretValueFromJson("password").unsafeUnwrap())
                .build();
    }
}
