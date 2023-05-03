package payroll.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import payroll.Model.User.UserConfirmation;

public interface UserConfirmationRepository extends JpaRepository<UserConfirmation, Long> {

    Boolean existsByConfirmationToken(String confirmationToken);

    Boolean existsByUsername(String username);

    UserConfirmation findByConfirmationToken(String confirmationToken);

    void deleteByUsername(String username);

}
