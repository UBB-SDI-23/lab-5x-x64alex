package payroll.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import payroll.Model.User.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {}
