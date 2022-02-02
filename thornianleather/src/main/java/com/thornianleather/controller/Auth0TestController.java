package com.thornianleather.controller;

import com.thornianleather.model.ResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/auth0")
public class Auth0TestController {
    Logger logger = LoggerFactory.getLogger(Auth0TestController.class);

    @GetMapping(value = "/public")
    public ResponseEntity<ResponseDTO> publicEndpoint() {
        logger.info("Public endpoint");
        return ResponseEntity.ok(new ResponseDTO("Public Endpoint Working fine !"));
    }

    @GetMapping(value = "/private")
    public ResponseEntity<ResponseDTO> privateEndpoint() {
        logger.info("Private Endpoint success!");
        return ResponseEntity.ok(new ResponseDTO("Private Endpoint Working fine !"));
    }
}
