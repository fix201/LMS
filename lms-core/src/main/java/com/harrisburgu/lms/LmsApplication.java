package com.harrisburgu.lms;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class LmsApplication implements CommandLineRunner {
	
	public static void main(String[] args) {
		SpringApplication.run(LmsApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
	}

	@RequestMapping(value = "/", method = RequestMethod.GET, produces = "application/json")
	public String home(){
		return "Welcome to Library Management System!";
	}
}
