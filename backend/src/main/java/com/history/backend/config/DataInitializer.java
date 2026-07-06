package com.history.backend.config;

import com.history.backend.model.Theme;
import com.history.backend.model.User;
import com.history.backend.repository.ThemeRepository;
import com.history.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner{

    private final UserRepository userRepository;
    private final ThemeRepository themeRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, ThemeRepository themeRepository, PasswordEncoder passwordEncoder){
        this.userRepository=userRepository;
        this.themeRepository=themeRepository;
        this.passwordEncoder=passwordEncoder;
    }

    /**
     * Inserts default admin user and SPICE-T themes if they do not already exist.
     * @param args command line arguments
     */
    @Override
    public void run(String... args){
        String adminEmail="richie-rich90454@aphistory.com";
        User admin=userRepository.findByEmail(adminEmail).orElse(null);
        if (admin == null){
            admin=new User();
            admin.setEmail(adminEmail);
            admin.setRole("admin");
            admin.setCreatedAt(LocalDateTime.now());
        }
        admin.setPasswordHash(passwordEncoder.encode("password"));
        userRepository.save(admin);
        System.out.println("Admin user ensured: "+adminEmail+" with password 'password'");

        List<String> themeNames=Arrays.asList("Social", "Political", "Interactions", "Cultural", "Economic", "Technology");
        for (String name : themeNames){
            if (themeRepository.findByName(name).isEmpty()){
                Theme theme=new Theme(name, "SPICE-T theme: "+name);
                themeRepository.save(theme);
            }
        }
    }
}