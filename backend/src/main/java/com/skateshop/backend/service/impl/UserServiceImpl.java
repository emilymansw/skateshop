package com.skateshop.backend.service.impl;

import com.skateshop.backend.model.Admin;
import com.skateshop.backend.model.Customer;
import com.skateshop.backend.model.User;
import com.skateshop.backend.repository.UserRepository;
import com.skateshop.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Override
    public User getUserByFirebaseUid(String firebaseUid){
        return userRepository.findFirstByFirebaseUid(firebaseUid);
    }

    @Override
    public String getRole(String firebaseUid){
        User user = userRepository.findFirstByFirebaseUid(firebaseUid);
        if(user instanceof Customer){
            return "customer";
        } else if(user instanceof Admin){
            return "admin";
        } else {
            return null;
        }
    }

}
