package com.harrisburgu.lms;

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
import software.amazon.awscdk.services.s3.Bucket;
import software.constructs.Construct;

import java.util.List;

public class LmsInfrastructureStack extends Stack {

    public LmsInfrastructureStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        final IVpc vpc = Vpc.fromLookup(this, "DefaultVPC", VpcLookupOptions.builder().isDefault(true).build());

        SecurityGroup rdsSecurityGroup = SecurityGroup.Builder.create(this, id + "-rds-sg")
                .vpc(vpc)
                .description("Allow MySQL traffic from EC2 instances")
                .build();
        rdsSecurityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(3306), "allow MySQL access from the world");
        
        // create rds
        // return endpoint
        final DatabaseInstance instance = DatabaseInstance.Builder.create(this, id + "-rds")
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
        SecurityGroup securityGroup = SecurityGroup.Builder.create(this, id + "-ec2-sg")
                .vpc(vpc)
                .description("Allow ssh access to ec2 instances")
                .allowAllOutbound(true)
                .disableInlineRules(true)
                .build();
        securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(22), "allow ssh access from the world");

        // ec2 instance image
        IMachineImage image = AmazonLinuxImage.Builder.create()
                .generation(AmazonLinuxGeneration.AMAZON_LINUX)
                .edition(AmazonLinuxEdition.STANDARD)
                .virtualization(AmazonLinuxVirt.HVM)
                .storage(AmazonLinuxStorage.GENERAL_PURPOSE)
                .build();

        UserData userData = UserData.forLinux();
        userData.addCommands("""
                touch hello.txt
                """);

        // create ec2 instance
        // use scripts to install java
        // environment variable for rds endpoint
        // Create an EC2 instance
        Instance ec2Instance = Instance.Builder.create(this, id + "-ec2")
                .instanceType(InstanceType.of(InstanceClass.BURSTABLE2, InstanceSize.MICRO))
                .machineImage(image)
                .vpc(vpc)
                .securityGroup(securityGroup)
                .userData(userData)
                .keyName("lms-kp")
                .build();

        // create s3 bucket for user interface
        // variable for backend endpoint
        Bucket websiteBucket = Bucket.Builder.create(this, id + "-s3")
                .removalPolicy(RemovalPolicy.DESTROY)
                .build();
    }
}
