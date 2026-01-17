package com.webapp1a.gateway.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMapping;

@Configuration
public class SpaController {

    /*@Bean
    public RouterFunction<ServerResponse> spaRouter() {
        return RouterFunctions.route(
            RequestPredicates.GET("/new/**")
                .and(RequestPredicates.accept(MediaType.TEXT_HTML)),
            request -> ServerResponse.ok()
                .contentType(MediaType.TEXT_HTML)
                .bodyValue(new ClassPathResource("/spa/index.html"))
        );
    }*/

    @RequestMapping(value = {"/spa/**"})
    public String forward() {
        return "forward:/spa/index.html";
    }
}