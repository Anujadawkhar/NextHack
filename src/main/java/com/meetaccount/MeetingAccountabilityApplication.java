package com.meetaccount;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.meetaccount")
public class MeetingAccountabilityApplication {

    public static void main(String[] args) {
        SpringApplication.run(MeetingAccountabilityApplication.class, args);
    }
}