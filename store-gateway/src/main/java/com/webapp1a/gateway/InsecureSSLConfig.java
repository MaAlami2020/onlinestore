package com.webapp1a.gateway;

import java.io.InputStream;
import java.security.KeyStore;

import javax.net.ssl.TrustManagerFactory;

import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.SslContextBuilder;
import org.springframework.cloud.gateway.config.HttpClientCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

@Configuration
public class InsecureSSLConfig {

    @Bean
    public HttpClientCustomizer httpClientCustomizer() {
        return httpClient -> httpClient.secure(sslSpec -> {
            try (InputStream trustStoreStream = getClass().getResourceAsStream("/gateway-truststore.jks")) {
                KeyStore trustStore = KeyStore.getInstance("JKS");
                trustStore.load(trustStoreStream, "password".toCharArray());

                TrustManagerFactory trustManagerFactory =
                    TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
                trustManagerFactory.init(trustStore);

                SslContext sslContext = SslContextBuilder.forClient()
                        .trustManager(trustManagerFactory)
                        .build();

                sslSpec.sslContext(sslContext);

            } catch (Exception e) {
                throw new RuntimeException("Failed to create SSL context", e);
            }
        });
    }

    @Bean
    public WebClient webClient(HttpClient httpClient) {
        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
    }
}
