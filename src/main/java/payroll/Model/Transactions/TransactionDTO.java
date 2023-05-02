package payroll.Model.Transactions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import payroll.Model.Client.ClientDTO;
import payroll.Model.Products.ProductDTO;


import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO {
    private Long transactionId;

    private Date transactionDate;

    private int transactionQuantity;

    private ClientDTO clientDTO;

    private ProductDTO productDTO;
}
