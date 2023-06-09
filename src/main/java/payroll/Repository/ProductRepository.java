package payroll.Repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import payroll.Model.Client.ClientNameDTO;
import payroll.Model.Products.Product;
import payroll.Model.Products.ProductNameDTO;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByProductQuantityGreaterThan(int quantity, Pageable pageable);

    @Query("select p from Product p where p.productQuantity> :quantity AND p.productId >= :startIndex AND p.productId <= :endIndex")
    List<Product> filterByQuantityGreater(
            @Param("quantity") int quantity,
            @Param("startIndex") Long startIndex,
            @Param("endIndex") Long endIndex
            );

    @Query("select count(*) from Transaction t where t.product.productId = :productId")
    Integer getTransactionsCount(
            @Param("productId") Long productId
    );

    @Query(value = "select c.product_id as productId, c.product_name as productName from Products c where strpos(lower(c.product_name), lower(:givenString)) > 0", nativeQuery = true)
    List<ProductNameDTO> findProductNames(String givenString, Pageable pageable);
}
