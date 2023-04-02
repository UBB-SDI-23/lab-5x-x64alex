package payroll.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import payroll.Model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{
}
