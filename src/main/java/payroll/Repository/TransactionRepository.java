package payroll.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import payroll.Model.Transaction;

public interface TransactionRepository  extends JpaRepository<Transaction, Long> {
}