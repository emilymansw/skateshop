package com.skateshop.backend.service;

import com.skateshop.backend.model.User;

public interface UserService {
    User getUserByFirebaseUid(String firebaseUid);
    String getRole(String firebaseUid);

}
