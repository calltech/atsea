package com.docker.atsea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

import com.docker.atsea.configuration.JpaConfiguration;
import com.docker.atsea.security.JwtFilter;


@Import(JpaConfiguration.class)
@SpringBootApplication(scanBasePackages={"com.docker.atsea"})
@EntityScan("com.docker.atsea.model")
public class AtSeaApp {

	@Bean
	public FilterRegistrationBean<JwtFilter> jwtFilter() {
		final FilterRegistrationBean<JwtFilter> registrationBean = new FilterRegistrationBean<>();
		registrationBean.setFilter(new JwtFilter());
		registrationBean.addUrlPatterns("/purchase/*");

		return registrationBean;
	}

	public static void main(String[] args) {
		SpringApplication.run(AtSeaApp.class, args);
	}
}
