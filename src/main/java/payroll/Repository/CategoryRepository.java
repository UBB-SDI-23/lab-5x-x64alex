package payroll.Repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import payroll.Model.Category;
import payroll.Model.DTO.CategoryNameDTO;
import payroll.Model.Product;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query(value = "select c.category_id as categoryId, c.category_name as categoryName from Category c where strpos(lower(c.category_name), lower(:givenString)) > 0", nativeQuery = true)
    List<CategoryNameDTO> findCategoryNames(String givenString, Pageable pageable);

}
