package com.jorkdev.clientes.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class RootController {

    @GetMapping("/api")
    public Map<String, Object> apiRoot() {
        return Map.of(
            "name", "modulo-clientes",
            "version", "1.0.0",
            "status", "OK"
        );
    }
}


