package payroll.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import payroll.Model.User.UserRegister;
import payroll.Service.UserService;
import static payroll.Utils.SecurityConstants.SIGN_UP_URL;
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(SIGN_UP_URL)
    public String register(@RequestBody UserRegister userRegister) {
        return this.userService.registerUser(userRegister);
    }

}
