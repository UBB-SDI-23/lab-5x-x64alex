package payroll.Controller;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import payroll.Model.User.User;
import payroll.Model.User.UserProfile;
import payroll.Model.User.UserStatistics;
import payroll.Security.Payload.response.MessageResponse;
import payroll.Security.Payload.response.UserInfoResponse;
import payroll.Service.UserService;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;


    @GetMapping("/{username}")
    public ResponseEntity getUserProfile(@PathVariable("username") String username){
        try {
            UserProfile user = userService.getUserProfileByUsername(username);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(user);
        }catch (Exception e){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username does not exist!"));
        }
    }

    @GetMapping("/statistics/{username}")
    public ResponseEntity getUserStatistics(@PathVariable("username") String username){
        try {
            UserProfile user = userService.getUserProfileByUsername(username);
            UserStatistics statistics = userService.getUserStatistics(user.getId());

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(statistics);
        }catch (Exception e){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username does not exist!"));
        }
    }
}