package payroll.Repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import payroll.Model.Category.Category;
import payroll.Model.Category.CategoryNameDTO;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("select count(*) from Product p where p.category.categoryId = :categoryId")
    Integer getNumberProducts(
            @Param("categoryId") Long categoryId
    );

    @Query("select avg(p.productPrice) from Product p where p.category.categoryId = :categoryId")
    Integer getCategoryAveragePrice(
            @Param("categoryId") Long categoryId
    );
    @Query(value = "select c.category_id as categoryId, c.category_name as categoryName from Category c where strpos(lower(c.category_name), lower(:givenString)) > 0", nativeQuery = true)
    List<CategoryNameDTO> findCategoryNames(String givenString, Pageable pageable);

}
