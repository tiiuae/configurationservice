package com.adminconsole.service;
import com.adminconsole.dto.AuthenticationResponse;
import com.adminconsole.dto.LoginRequest;
import com.adminconsole.dto.ResponseDTO;
import com.adminconsole.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class AuthService {




    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtProvider;
    @Autowired
    private RefreshTokenService refreshTokenService;



    public AuthenticationResponse login(LoginRequest loginRequest) {
        Authentication authenticate = authenticationManager.
                authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                        loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());

        final String jwt = jwtProvider.generateToken(userDetails);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        ResponseDTO<AuthenticationResponse> res= new ResponseDTO<AuthenticationResponse>();
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setAuthenticationToken(jwt);
    //    authenticationResponse.setRefreshToken(refreshTokenService.generateRefreshToken().getToken());
        authenticationResponse.setExpiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()));
        authenticationResponse.setUsername(loginRequest.getUsername());
        authenticationResponse.setRoles(roles);
        return authenticationResponse;
    }

/*    public AuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.validateRefreshToken(refreshTokenRequest.getRefreshToken());
        String jwt = jwtProvider.generateTokenWithUserName(refreshTokenRequest.getUsername());
        final UserDetails userDetails = userDetailsService.loadUserByUsername(refreshTokenRequest.getUsername());

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setAuthenticationToken(jwt);
        authenticationResponse.setRefreshToken(refreshTokenRequest.getRefreshToken());
        authenticationResponse.setExpiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()));
        authenticationResponse.setUsername(refreshTokenRequest.getUsername());
        authenticationResponse.setRoles(roles);

        return authenticationResponse;

    }*/

}
