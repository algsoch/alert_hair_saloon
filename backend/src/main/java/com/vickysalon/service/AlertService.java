package com.vickysalon.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AlertService {
    
    @Value("${phone.trigger.url:https://example.com/trigger}")
    private String phoneTriggerUrl;
    
    private final RestTemplate restTemplate;
    
    public AlertService() {
        this.restTemplate = new RestTemplate();
    }
    
    public void triggerPhoneAlert() {
        try {
            System.out.println("Triggering phone alert to URL: " + phoneTriggerUrl);
            
            // Check if it's the placeholder URL
            if (phoneTriggerUrl.contains("example.com")) {
                System.out.println("⚠️ Using placeholder URL. Alert simulated successfully!");
                System.out.println("📱 In production, configure PHONE_TRIGGER_URL environment variable");
                System.out.println("   Examples:");
                System.out.println("   - IFTTT: https://maker.ifttt.com/trigger/notify_barber/with/key/YOUR_KEY");
                System.out.println("   - Twilio: https://api.twilio.com/...");
                return; // Success - just simulated
            }
            
            // Send GET request to the phone trigger URL
            String response = restTemplate.getForObject(phoneTriggerUrl, String.class);
            
            System.out.println("Phone alert triggered successfully. Response: " + response);
        } catch (Exception e) {
            System.err.println("Error triggering phone alert: " + e.getMessage());
            
            // If it's the placeholder URL, don't throw error
            if (phoneTriggerUrl.contains("example.com")) {
                System.out.println("✅ Alert simulated (no real phone trigger configured)");
                return;
            }
            
            throw new RuntimeException("Failed to trigger phone alert", e);
        }
    }
}
