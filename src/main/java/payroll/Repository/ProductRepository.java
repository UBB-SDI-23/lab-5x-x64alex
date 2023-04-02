package payroll.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import payroll.Model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
