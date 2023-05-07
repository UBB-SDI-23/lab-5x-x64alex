package payroll.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import payroll.Model.User.User;

import javax.transaction.Transactional;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);
    @Transactional
    @Modifying
    @Query(value = "TRUNCATE category, products, clients, transactions cascade",nativeQuery = true)
    void deleteAllDataEntities();

    @Query(value = "select count(*) from Category c where c.user.id = :userId")
    Integer getNumberCategory(
            @Param("userId") Long userId
    );

    @Query(value = "select count(*) from Product p where p.user.id = :userId")
    Integer getNumberProducts(
            @Param("userId") Long userId
    );

    @Query(value = "select count(*) from Client c where c.user.id = :userId")
    Integer getNumberClients(
            @Param("userId") Long userId
    );

    @Query(value = "select count(*) from Transaction t where t.user.id = :userId")
    Integer getNumberTransactions(
            @Param("userId") Long userId
    );

}
