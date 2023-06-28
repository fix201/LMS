package com.harrisburgu.lms;

import software.amazon.awscdk.RemovalPolicy;
import software.amazon.awscdk.SecretValue;
import software.amazon.awscdk.services.ec2.Instance;
import software.amazon.awscdk.services.ec2.InstanceClass;
import software.amazon.awscdk.services.ec2.InstanceSize;
import software.amazon.awscdk.services.ec2.MachineImage;
import software.amazon.awscdk.services.ec2.SubnetSelection;
import software.amazon.awscdk.services.ec2.SubnetType;
import software.amazon.awscdk.services.rds.DatabaseInstance;
import software.amazon.awscdk.services.rds.DatabaseInstanceEngine;
import software.amazon.awscdk.services.ec2.InstanceType;
import software.amazon.awscdk.services.rds.IInstanceEngine;
import software.amazon.awscdk.services.rds.MariaDbInstanceEngineProps;
import software.constructs.Construct;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;

public class LmsInfrastructureStack extends Stack {
    public LmsInfrastructureStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public LmsInfrastructureStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        // create rds
        // return endpoint
        final IInstanceEngine instanceEngine = DatabaseInstanceEngine.mariaDb(
                MariaDbInstanceEngineProps.builder().build()
        );

        final DatabaseInstance databaseInstance = DatabaseInstance.Builder.create(this, id + "-rds")
                .instanceType(InstanceType.of(InstanceClass.BURSTABLE3, InstanceSize.MICRO))
                .engine(instanceEngine)
                .instanceIdentifier(id + "-rds")
                .allocatedStorage(20)
                .removalPolicy(RemovalPolicy.DESTROY)
                .build();
        
        // create ec2 instance
        // use scripts to install java
        // environment variable for rds endpoint
        // Create an EC2 instance
        Instance ec2Instance = Instance.Builder.create(this, "Ec2Instance")
                .instanceType(InstanceType.of(InstanceClass.BURSTABLE2, InstanceSize.MICRO))
                .build();

        // create s3 bucket for user interface
        // variable for backend endpoint

    }
}
