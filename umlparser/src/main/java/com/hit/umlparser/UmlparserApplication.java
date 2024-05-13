package com.hit.umlparser;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.hit.umlparser.mapper")
public class UmlparserApplication {

    public static void main(String[] args) {
        SpringApplication.run(UmlparserApplication.class, args);
    }

}
