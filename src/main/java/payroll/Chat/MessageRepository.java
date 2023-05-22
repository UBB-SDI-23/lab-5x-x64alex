package payroll.Chat;

import org.springframework.data.jpa.repository.JpaRepository;
public interface MessageRepository extends JpaRepository<SavedMessage, Long> {
}