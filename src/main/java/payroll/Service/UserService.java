package payroll.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import payroll.Model.User.User;
import payroll.Model.User.UserRegister;
import payroll.Repository.ClientRepository;
import payroll.Repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public String registerUser(UserRegister userRegister){
        try{
            // do check for username
            User user = new User();
            user.setUsername(userRegister.getUsername());
            user.setPassword(bCryptPasswordEncoder().encode(userRegister.getPassword()));

            userRepository.save(user);
            return "Successful";
        }catch(Exception e){
            return "Unsuccessful";
        }


    }
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}