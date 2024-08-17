package com.ecommerceportfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@ComponentScan(basePackages = {"com.ecommerceportfolio.services", "com.ecommerceportfolio.controllers"})
@EnableJpaRepositories(basePackages = "com.ecommerceportfolio.repositories")
@EntityScan(basePackages = "com.ecommerceportfolio.entities")
public class EcommerceportfolioApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceportfolioApplication.class, args);
	}

}
