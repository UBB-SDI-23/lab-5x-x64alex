package payroll.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import payroll.Model.User.UserRegister;
import payroll.Service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/register")
    public String register(@RequestBody UserRegister userRegister) {
        return this.userService.registerUser(userRegister);
    }

}
