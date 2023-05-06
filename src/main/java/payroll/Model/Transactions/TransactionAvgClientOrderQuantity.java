package payroll.Model.Transactions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionAvgClientOrderQuantity {
    private Long transactionId;
    private Date transactionDate;
    private int transactionQuantity;
    private Long clientId;
    private Long productId;
    private int avgClientOrderQuantity;
    private String userName;

}