package com.vickysalon.controller;

import com.vickysalon.dto.AlertResponse;
import com.vickysalon.service.AlertService;
import com.vickysalon.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AlertController {
    
    @Autowired
    private AlertService alertService;
    
    @Autowired
    private NotificationService notificationService;
    
    // Root endpoint welcome message
    @GetMapping("/")
    public ResponseEntity<WelcomeResponse> welcome() {
        WelcomeResponse response = new WelcomeResponse(
            "Vicky Hair Salon - Alert System API",
            "Backend is running successfully! ✅",
            "https://alert-vicky-hair-saloon.vercel.app",
            new String[]{
                "POST /api/alert - Send customer alert",
                "GET /api/health - Health check",
                "GET /api/shop-info - Get shop information",
                "GET /api/notifications/stream - SSE notification stream"
            }
        );
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/alert")
    public ResponseEntity<AlertResponse> sendAlert(
            HttpServletRequest request,
            @RequestBody(required = false) AlertRequest alertRequest) {
        try {
            // Get customer IP address
            String customerIp = getClientIp(request);
            String customerPhoto = (alertRequest != null) ? alertRequest.photo : null;
            
            // Send real-time notification to owner
            notificationService.sendNotification(customerIp, "जल्दी आइये! ग्राहक इंतज़ार कर रहा है।", customerPhoto);
            
            // Also trigger external phone alert (if configured)
            try {
                alertService.triggerPhoneAlert();
            } catch (Exception e) {
                System.out.println("External alert failed (not configured): " + e.getMessage());
            }
            
            return ResponseEntity.ok(new AlertResponse("success", "बार्बर को नोटिफिकेशन भेज दिया गया है!", System.currentTimeMillis()));
        } catch (Exception e) {
            return ResponseEntity.ok(new AlertResponse("error", "Failed to send alert: " + e.getMessage(), System.currentTimeMillis()));
        }
    }
    
    // Inner class for alert request body
    public static class AlertRequest {
        public String photo;
    }
    
    @GetMapping("/alert")
    public ResponseEntity<AlertResponse> sendAlertGet(HttpServletRequest request) {
        try {
            String customerIp = getClientIp(request);
            notificationService.sendNotification(customerIp, "जल्दी आइये! ग्राहक इंतज़ार कर रहा है।", null);
            
            try {
                alertService.triggerPhoneAlert();
            } catch (Exception e) {
                System.out.println("External alert failed (not configured): " + e.getMessage());
            }
            
            return ResponseEntity.ok(new AlertResponse("success", "बार्बर को नोटिफिकेशन भेज दिया गया है!", System.currentTimeMillis()));
        } catch (Exception e) {
            return ResponseEntity.ok(new AlertResponse("error", "Failed to send alert: " + e.getMessage(), System.currentTimeMillis()));
        }
    }
    
    @GetMapping("/notifications/stream")
    public SseEmitter streamNotifications() {
        return notificationService.subscribe();
    }
    
    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        // If multiple IPs, take the first one
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }
        return ip != null ? ip : "Unknown";
    }
    
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Backend is running!");
    }
    
    @GetMapping("/shop-info")
    public ResponseEntity<ShopInfo> getShopInfo() {
        ShopInfo info = new ShopInfo(
            "Vicky Hair Salon",
            "Karpuri Thakur",
            "7835805279",
            "20+ Years of Excellence",
            "Welcome to Vicky Hair Salon, where tradition meets excellence. With over two decades of expertise in hair styling and grooming, we provide premium services tailored to your needs. From classic cuts to modern styles, our experienced barber ensures you leave looking your absolute best."
        );
        return ResponseEntity.ok(info);
    }
    
    // Inner class for shop info
    public static class ShopInfo {
        public String shopName;
        public String ownerName;
        public String phoneNumber;
        public String experience;
        public String description;
        
        public ShopInfo(String shopName, String ownerName, String phoneNumber, String experience, String description) {
            this.shopName = shopName;
            this.ownerName = ownerName;
            this.phoneNumber = phoneNumber;
            this.experience = experience;
            this.description = description;
        }
    }
    
    // Inner class for welcome response
    public static class WelcomeResponse {
        public String service;
        public String status;
        public String frontend;
        public String[] endpoints;
        
        public WelcomeResponse(String service, String status, String frontend, String[] endpoints) {
            this.service = service;
            this.status = status;
            this.frontend = frontend;
            this.endpoints = endpoints;
        }
    }
}
