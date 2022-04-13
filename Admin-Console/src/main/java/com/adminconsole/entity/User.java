package com.adminconsole.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Entity
public class User {
    public User(User user) {
        this.username = user.getUsername();
        // this.password = user.getPassword();
        this.active = user.isActive();
        this.userId = user.getUserId();

    }
    public User() {}
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;


    @Column(length = 100)
    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(length = 100)
    private String password;


    @Column(name = "active")
    private boolean active;


    @CreationTimestamp
    @Column(name = "added_date")
    private Timestamp addedDate;

    @JsonIgnore
    @CreationTimestamp
    @Column(name = "updated_date")
    private Timestamp updatedDate;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = ("user_id")))
    @JsonIgnore
    private Set<Role> roles;

    @JsonIgnore
    @ManyToMany(mappedBy = "members")
    private Set<Group> groups;
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Timestamp getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(Timestamp addedDate) {
        this.addedDate = addedDate;
    }

    public Timestamp getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Timestamp updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}