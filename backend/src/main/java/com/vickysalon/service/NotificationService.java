package com.vickysalon.service;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class NotificationService {
    
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    public SseEmitter subscribe() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((e) -> emitters.remove(emitter));
        
        emitters.add(emitter);
        
        System.out.println("📱 New owner device connected. Total connected: " + emitters.size());
        
        // Send initial connection message
        try {
            emitter.send(SseEmitter.event()
                .name("connected")
                .data("कनेक्ट हो गया! नोटिफिकेशन के लिए तैयार।"));
        } catch (IOException e) {
            emitters.remove(emitter);
        }
        
        return emitter;
    }
    
    public void sendNotification(String customerIp, String message, String customerPhoto) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("hh:mm:ss a"));
        
        String textNotification = String.format(
            "🔔 ग्राहक आया है!\n" +
            "समय: %s\n" +
            "IP: %s\n" +
            "%s",
            timestamp, customerIp, message
        );
        
        System.out.println("📢 Sending notification to " + emitters.size() + " devices");
        System.out.println(textNotification);
        if (customerPhoto != null) {
            System.out.println("📸 Customer photo included (size: " + customerPhoto.length() + " chars)");
        }
        
        List<SseEmitter> deadEmitters = new ArrayList<>();
        
        emitters.forEach(emitter -> {
            try {
                // Create JSON payload with message, IP, timestamp, and photo
                Map<String, String> payload = new HashMap<>();
                payload.put("message", textNotification);
                payload.put("ip", customerIp);
                payload.put("timestamp", timestamp);
                payload.put("photo", customerPhoto);
                payload.put("spokenMessage", "ग्राहक आ गया है, जल्दी आओ");
                
                String jsonPayload = objectMapper.writeValueAsString(payload);
                
                emitter.send(SseEmitter.event()
                    .name("customer-alert")
                    .data(jsonPayload));
            } catch (Exception e) {
                deadEmitters.add(emitter);
                System.err.println("Failed to send to emitter: " + e.getMessage());
            }
        });
        
        // Remove dead connections
        emitters.removeAll(deadEmitters);
    }
}
