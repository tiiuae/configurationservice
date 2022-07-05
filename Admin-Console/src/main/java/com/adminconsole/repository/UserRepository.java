package com.adminconsole.repository;

import com.adminconsole.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Modifying
    @Transactional
    @Query("update User u set u.password=:password where u.userId=:userId")
    void changePassword(String password, int userId);

    @Modifying
    @Transactional
    @Query("update User u set u.username=:username,u.password=:password where u.userId=:userId")
    void saveUserCredentials(String username, String password, int userId);


    User findByUsername(String username);

    List<User> findByRolesRoleId(int i);
}
