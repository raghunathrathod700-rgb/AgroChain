package com.agrochain.dto.user;

import jakarta.validation.constraints.Size;

public class UserUpdateRequest {

    @Size(max = 120)
    private String firstName;

    @Size(max = 120)
    private String lastName;

    @Size(max = 32)
    private String phone;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
