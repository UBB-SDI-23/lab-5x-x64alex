package payroll.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import payroll.Model.Transactions.Transaction;

public interface TransactionRepository  extends JpaRepository<Transaction, Long> {
    @Query("select avg(t.transactionQuantity) from Transaction t where t.client.clientId = :clientId")
    Integer getClientAverageOrderQuantity(
            @Param("clientId") Long clientId
    );
}