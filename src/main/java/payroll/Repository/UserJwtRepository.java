package payroll.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import payroll.Model.User.UserJwt;

public interface UserJwtRepository extends JpaRepository<UserJwt, Long> {

    Boolean existsByJwtToken(String jwtToken);

    Boolean existsByUsername(String username);

    UserJwt findByJwtToken(String jwtToken);

    void deleteByUsername(String username);

}
