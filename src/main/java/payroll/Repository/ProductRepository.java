package payroll.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import payroll.Model.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findFirst100By();

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
}
