package payroll.Controller;

import java.util.*;
import java.util.stream.Collectors;


import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import payroll.Exception.JwtTokenInvalidException;
import payroll.Model.RegisterDTO;
import payroll.Model.User.*;
import payroll.Repository.RoleRepository;
import payroll.Repository.UserConfirmationRepository;
import payroll.Repository.UserProfileRepository;
import payroll.Repository.UserRepository;
import payroll.Security.JWT.JwtUtils;
import payroll.Security.Payload.request.LoginRequest;
import payroll.Security.Payload.request.SignupRequest;
import payroll.Security.Payload.response.MessageResponse;
import payroll.Security.Payload.response.UserInfoResponse;
import payroll.Security.Services.UserDetailsImpl;


@CrossOrigin(allowCredentials = "true", origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class AuthController {
    AuthenticationManager authenticationManager;

    UserRepository userRepository;

    UserProfileRepository userProfileRepository;

    UserConfirmationRepository userConfirmationRepository;

    RoleRepository roleRepository;

    PasswordEncoder encoder;

    JwtUtils jwtUtils;

    public AuthController(AuthenticationManager authenticationManager,
                          UserRepository userRepository,
                          UserProfileRepository userProfileRepository,
                          UserConfirmationRepository userConfirmationRepository,
                          RoleRepository roleRepository,
                          PasswordEncoder encoder,
                          JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.userConfirmationRepository = userConfirmationRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        try {
            if (userRepository.existsByUsername(signUpRequest.getUsername())) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
            }

            if (userConfirmationRepository.existsByUsername(signUpRequest.getUsername())) {
                userConfirmationRepository.deleteByUsername(signUpRequest.getUsername());
            }

            String confirmationToken = UUID.randomUUID().toString();

            UserConfirmation userConfirmation = new UserConfirmation();
            userConfirmation.setUsername(signUpRequest.getUsername());
            userConfirmation.setPassword(encoder.encode(signUpRequest.getPassword()));
            userConfirmation.setConfirmationToken(confirmationToken);

            userConfirmation.setName(signUpRequest.getName());
            userConfirmation.setBio(signUpRequest.getBio());
            userConfirmation.setGender(signUpRequest.getGender());
            userConfirmation.setLocation(signUpRequest.getLocation());
            userConfirmation.setBirthdate(signUpRequest.getBirthdate());

            Calendar date = Calendar.getInstance();
            long timeInSecs = date.getTimeInMillis();
            Date afterAdding10Mins = new Date(timeInSecs + (10 * 60 * 1000));

            userConfirmation.setExpirationDate(afterAdding10Mins);

            userConfirmationRepository.save(userConfirmation);

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new RegisterDTO(userConfirmation.getUsername(), userConfirmation.getConfirmationToken()));
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register user: " + e.getMessage());
        }
    }

    @PostMapping("register/confirm/{confirmationToken}")
    public ResponseEntity<?> confirmUser(@PathVariable String confirmationToken) {

        if (!userConfirmationRepository.existsByConfirmationToken(confirmationToken)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Token is invalid!"));
        }

        UserConfirmation userConfirmation = userConfirmationRepository.findByConfirmationToken(confirmationToken);
        Date now = new Date();
        if(now.compareTo(userConfirmation.getExpirationDate())>0){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Token has expired!"));
        }

        UserProfile userProfile = new UserProfile();
        userProfile.setBio(userConfirmation.getBio());
        userProfile.setName(userConfirmation.getName());
        userProfile.setBirthdate(userConfirmation.getBirthdate());
        userProfile.setGender(userConfirmation.getGender());
        userProfile.setLocation(userConfirmation.getLocation());


        userProfileRepository.save(userProfile);

        User user = new User();
        user.setUsername(userConfirmation.getUsername());
        user.setPassword(userConfirmation.getPassword());

        Set<Role> roles = new HashSet<>();
        Role userRole = new Role();

        if(userConfirmation.getUsername().equals("admin") ||
                userConfirmation.getUsername().equals("m") ||
                userConfirmation.getUsername().equals("m1") ||
                userConfirmation.getUsername().equals("m2") ||
                userConfirmation.getUsername().equals("m3") ||
                userConfirmation.getUsername().equals("m4") ||
                userConfirmation.getUsername().equals("m5") ||
                userConfirmation.getUsername().equals("m6")
        ){
            userRole.setName(ERole.ROLE_ADMIN);
        }
        else{
            userRole.setName(ERole.ROLE_REGULAR);
        }
        roleRepository.save(userRole);
        roles.add(userRole);
        user.setRoles(roles);


        user.setUserProfile(userProfile);

        userConfirmationRepository.delete(userConfirmation);

        userRepository.save(user);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new MessageResponse("Successfully confirmed the registration code!"));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String jwtCookie = jwtUtils.generateTokenFromUsernameSignIn(userDetails.getUsername()).toString();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity
                .status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, jwtCookie)
                .body(new UserInfoResponse(userDetails.getId(),
                        userDetails.getUsername(),
                        roles,
                        jwtCookie
                        ));
    }

    @PostMapping("/signout")
    @PreAuthorize("hasRole('ROLE_REGULAR') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> logoutUser() {
        String cookie = jwtUtils.getCleanJwtCookie().toString();
        return ResponseEntity
                .status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, cookie)
                .body(new MessageResponse("You've been signed out!"));
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}