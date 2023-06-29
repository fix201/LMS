package com.harrisburgu.lms;

import software.amazon.awscdk.App;
import software.amazon.awscdk.Environment;
import software.amazon.awscdk.StackProps;

import java.util.Map;

public class LmsInfrastructureApp {
    private static final String LmsInfrastructureStack = "LmsInfrastructureStack";
    
    static Environment makeEnv(String account, String region) {
        account = (account == null) ? System.getenv("CDK_DEFAULT_ACCOUNT") : account;
        region = (region == null) ? System.getenv("CDK_DEFAULT_REGION") : region;

        return Environment.builder()
                .account(account)
                .region(region)
                .build();
    }
    
    public static void main(final String[] args) {
        App app = new App();

        new LmsInfrastructureStack(app, LmsInfrastructureStack, 
                StackProps.builder()
                        .description("Library Management System Stack")
                        .tags(Map.of("env","lms"))
                        .env(makeEnv(null, null))
                        .build());

        app.synth();
    }
}

