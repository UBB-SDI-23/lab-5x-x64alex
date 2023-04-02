package payroll.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import payroll.Model.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
