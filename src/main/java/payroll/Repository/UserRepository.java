package payroll.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import payroll.Model.User.User;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);
}
