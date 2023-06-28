package com.harrisburgu.lms;

import software.amazon.awscdk.App;
import software.amazon.awscdk.StackProps;

import java.util.Map;

public class LmsInfrastructureApp {
    private static final String LmsInfrastructureStack = "LmsInfrastructureStack";
    
    public static void main(final String[] args) {
        App app = new App();
        System.out.println(System.getenv("CDK_DEFAULT_ACCOUNT"));

        new LmsInfrastructureStack(app, LmsInfrastructureStack, 
                StackProps.builder()
                        .description("Library Management System Stack")
                        .tags(Map.of("env","lms"))
                        .build());

        app.synth();
    }
}

