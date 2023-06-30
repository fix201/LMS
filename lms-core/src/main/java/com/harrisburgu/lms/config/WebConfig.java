package com.harrisburgu.lms.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("http://library-mngmt-system.s3-website-us-east-1.amazonaws.com/")
				.allowedMethods("GET", "POST", "DELETE", "HEAD", "OPTIONS")
				.allowedHeaders("*")
				.allowCredentials(true);
	}
}