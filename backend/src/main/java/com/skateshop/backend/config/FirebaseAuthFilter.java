package com.skateshop.backend.config;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.skateshop.backend.model.*;
import com.skateshop.backend.service.CustomerService;
import com.skateshop.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;

@Component
public class FirebaseAuthFilter extends OncePerRequestFilter {
    @Autowired
    UserService userService;
    @Autowired
    CustomerService customerService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        verifyToken(request);
        filterChain.doFilter(request, response);
    }

    private void verifyToken(HttpServletRequest request) {
        FirebaseToken decodedToken = null;
        String token = getBearerToken(request);
        try {
            if (token != null) {
                decodedToken =
                        FirebaseAuth.getInstance().verifyIdToken(token);
            }
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
        }
        if (decodedToken != null) {
            String uid = decodedToken.getUid();
            String name = decodedToken.getName();
            String email = decodedToken.getEmail();
            User user = userService.getUserByFirebaseUid(uid);
            Collection<SimpleGrantedAuthority> authorities = null;
            if(user instanceof Customer){
                authorities = Arrays.asList( new SimpleGrantedAuthority("ROLE_CUSTOMER"));
            } else if (user instanceof Admin){
                authorities = Arrays.asList( new SimpleGrantedAuthority("ROLE_ADMIN"));
            }
            if (user == null) {
                Customer customer = new Customer();
                customer.setFirebaseUid(uid);
                customer.setName(name);
                customer.setEmail(email);
                customerService.saveCustomer(customer);
                user = userService.getUserByFirebaseUid(uid);
                authorities = Arrays.asList( new SimpleGrantedAuthority("ROLE_CUSTOMER"));
            }
            PreAuthenticatedAuthenticationToken authentication =
                    new PreAuthenticatedAuthenticationToken(user, token, authorities);
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }

    public String getBearerToken(HttpServletRequest request) {
        String bearerToken = null;
        String authorization = request.getHeader("Authorization");
        if (StringUtils.hasText(authorization) && authorization.startsWith("Bearer ")) {
            bearerToken = authorization.substring(7);
        }
        return bearerToken;
    }


}
