#FROM node:20-alpine AS build
#WORKDIR /app
#COPY store-frontend/*.json ./
#COPY store-frontend/*.ts ./
#COPY store-frontend/src/*.ts ./
#RUN npm install
#COPY store-frontend/ ./
#RUN chmod +x node_modules/.bin/ng
##ng build --configuration production --base-href="/spa/"  
#RUN npx ng build --configuration production --base-href=/spa/
#RUN ls -la /app/dist/store-frontend

# BACKEND
FROM maven:3.9.6-eclipse-temurin-21 AS backend-builder
WORKDIR /project
COPY pom.xml /project/
RUN mvn dependency:go-offline
COPY store-gateway/src /project/src
# Copiar frontend compilado al src/main/resources/static/new antes del package
#cp dist/store-frontend/* ../store-gateway/src/main/resources/static/spa  
#RUN ls -la /project/src/main/resources/static/spa
#COPY --from=build /app/dist/store-frontend /project/src/main/resources/static/spa
#RUN ls -la /project/src/main/resources/static/spa
RUN mvn clean package -DskipTests

# CONTAINER FINAL
FROM eclipse-temurin:21-jdk
WORKDIR /usr/src/app
COPY --from=backend-builder /project/target/*.jar ./appGateway.jar
EXPOSE 8442
ENTRYPOINT ["java", "-jar", "appGateway.jar"]
