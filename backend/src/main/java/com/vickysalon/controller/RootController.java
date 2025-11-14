package com.vickysalon.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class RootController {
    
    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> root() {
        Map<String, Object> response = new HashMap<>();
        response.put("service", "Vicky Hair Salon - Alert System API");
        response.put("status", "Backend is running successfully! ✅");
        response.put("version", "1.0.0");
        response.put("frontend", "https://alert-vicky-hair-saloon.vercel.app");
        
        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("Root API", "/api/");
        endpoints.put("Health Check", "/api/health");
        endpoints.put("Shop Info", "/api/shop-info");
        endpoints.put("Send Alert", "POST /api/alert");
        endpoints.put("Notification Stream", "GET /api/notifications/stream");
        
        response.put("endpoints", endpoints);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("service", "Vicky Hair Salon Alert System");
        response.put("timestamp", String.valueOf(System.currentTimeMillis()));
        return ResponseEntity.ok(response);
    }
}
