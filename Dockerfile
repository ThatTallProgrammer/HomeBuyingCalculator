FROM tomcat:9.0-alpine
LABEL maintainer="thattallprogrammer@gmail.com"
RUN rm -rf /usr/local/tomcat/webapps/*
ADD /build/libs/homebuyingcalculator.war /usr/local/tomcat/webapps
EXPOSE 8080
CMD ["catalina.sh", "run"]
