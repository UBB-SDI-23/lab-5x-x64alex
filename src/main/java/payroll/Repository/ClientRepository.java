package payroll.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import payroll.Model.Client.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query("select count(*) from Transaction t where t.client.clientId = :clientId")
    Integer getTransactionsCount(
            @Param("clientId") Long clientId
    );
}
