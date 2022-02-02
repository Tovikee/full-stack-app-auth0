package com.thornianleather.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseDTO {

    private String message;

    public ResponseDTO(String message) {
        super();
        this.message = message;
    }
}
