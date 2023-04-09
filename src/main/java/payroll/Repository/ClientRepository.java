package payroll.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.w3c.dom.stylesheets.LinkStyle;
import payroll.Model.Client;
import payroll.Model.Product;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
