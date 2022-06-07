package com.skateshop.backend.controller;

import com.skateshop.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/user/role/{firebaseUid}")
    public String getUserRole(Principal principal, @PathVariable String firebaseUid)  {
        String useRole = userService.getRole(firebaseUid);
        if(useRole != null){
            return useRole;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
}
