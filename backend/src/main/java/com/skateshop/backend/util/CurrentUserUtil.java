package com.skateshop.backend.util;

import com.skateshop.backend.model.User;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

import java.security.Principal;

public class CurrentUserUtil {
    public static User getUser(Principal principal) {
        if (principal instanceof PreAuthenticatedAuthenticationToken) {
            PreAuthenticatedAuthenticationToken preAuthenticated = (PreAuthenticatedAuthenticationToken) principal;
            if (preAuthenticated.getPrincipal() instanceof User) {
                return (User) preAuthenticated.getPrincipal();
            }
        }
        return null;
    }
}
