FROM node:20-alpine AS build
WORKDIR /app
COPY store-frontend/*.json ./
COPY store-frontend/*.ts ./
COPY store-frontend/src/*.ts ./
RUN npm install
COPY store-frontend/ ./
RUN chmod +x node_modules/.bin/ng
RUN npx ng build --configuration production --base-href=/spa/

# BACKEND
FROM maven:3.9.6-eclipse-temurin-21 AS backend-builder
WORKDIR /project
COPY pom.xml .
RUN mvn dependency:go-offline
COPY store-gateway/src ./src
# Copiar frontend compilado al src/main/resources/static/new antes del package
COPY --from=build /project/dist/store-frontend ../store-gateway/src/main/resources/static/spa
RUN mvn clean package -DskipTests

# CONTAINER FINAL
FROM eclipse-temurin:21-jdk
WORKDIR /usr/src/app
COPY --from=backend-builder /project/target/*.jar ./appGateway.jar
EXPOSE 8442
ENTRYPOINT ["java", "-jar", "appGateway.jar"]
