package payroll.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import payroll.Model.User.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);
}