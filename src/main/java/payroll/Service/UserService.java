package payroll.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import payroll.Model.User.User;
import payroll.Repository.ClientRepository;
import payroll.Repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

}