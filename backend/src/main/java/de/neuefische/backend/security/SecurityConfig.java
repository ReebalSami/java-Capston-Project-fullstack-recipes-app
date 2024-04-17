package de.neuefische.backend.security;

import de.neuefische.backend.model.user.User;
import de.neuefische.backend.repository.UsersRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;

import java.util.NoSuchElementException;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final UsersRepo usersRepo;
    @Value("${app.url}")
    private String appUrl;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(a -> a
                        .requestMatchers(HttpMethod.GET, "/", "/api/recipes").permitAll()
                        .requestMatchers(RegexRequestMatcher.regexMatcher("^(?!/api).*$")).permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .exceptionHandling(e -> e
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .oauth2Login(o -> o.successHandler(((request, response, authentication) -> {
                    var principal = (OAuth2User)authentication.getPrincipal();
                    String id = principal.getAttributes().get("id").toString();
                    User user= usersRepo.findById(id).orElseThrow(()-> new NoSuchElementException("No user found"));
                    if(!user.isNewUser()){
                        response.sendRedirect(appUrl);
                    } else {

                        response.sendRedirect(appUrl+"sign_up");
                    }
                })))
                .logout(l -> l.logoutSuccessUrl(appUrl));
        return http.build();
    }
    @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService() {
        DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();

        return request -> {
            OAuth2User user = delegate.loadUser(request);

            if (!usersRepo.existsById(user.getAttributes().get("id").toString())) {
                User newUser = new User(user.getAttributes());
                usersRepo.save(newUser);
                return user;
            }
            return user;
        };
    }
}
