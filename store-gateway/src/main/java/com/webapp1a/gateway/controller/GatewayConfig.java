package com.webapp1a.gateway.controller;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("orders_route", r -> r.path("/order/**")
                .filters(f -> f.stripPrefix(1)
                    .circuitBreaker(c -> c
                        .setName("ordersCB")
                        .setFallbackUri("forward:/fallback/order")
                    )
                )
                .uri("http://localhost:8445")
            )
            .build();
    }
}
