package payroll.Repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import payroll.Model.Category.CategoryNameDTO;
import payroll.Model.Client.Client;
import payroll.Model.Client.ClientNameDTO;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query("select count(*) from Transaction t where t.client.clientId = :clientId")
    Integer getTransactionsCount(
            @Param("clientId") Long clientId
    );

    @Query(value = "select c.client_id as clientId, c.client_last_name as clientLastName from Clients c where strpos(lower(c.client_last_name), lower(:givenString)) > 0", nativeQuery = true)
    List<ClientNameDTO> findClientLastNames(String givenString, Pageable pageable);
}
