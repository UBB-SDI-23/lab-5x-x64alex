package payroll.Model.Transactions;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import payroll.Model.Client.Client;
import payroll.Model.Products.Product;
import payroll.Model.Products.ProductAggregate;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Transactions", indexes = {@Index(name="name2",columnList = "clientId"),
        @Index(name="name3",columnList = "productId")
})
@SequenceGenerator(name="seq", initialValue=1000000, allocationSize=100)
public class Transaction {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
    private Long transactionId;

    @Column(name = "TransactionDate")
    private Date transactionDate;

    @Column(name = "TransactionQuantity")
    private int transactionQuantity;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "clientId", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Client client;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "productId", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Product product;

    @JsonIgnore
    public TransactionAvgClientOrderQuantity getTransactionAvgClientOrderQuantity(int orderQuantity){
        TransactionAvgClientOrderQuantity transactionAvgClientOrderQuantity = new TransactionAvgClientOrderQuantity();

        transactionAvgClientOrderQuantity.setTransactionId(transactionId);
        transactionAvgClientOrderQuantity.setTransactionDate(transactionDate);
        transactionAvgClientOrderQuantity.setTransactionQuantity(transactionQuantity);

        transactionAvgClientOrderQuantity.setClientId(client.getClientId());
        transactionAvgClientOrderQuantity.setProductId(product.getProductId());

        transactionAvgClientOrderQuantity.setAvgClientOrderQuantity(orderQuantity);

        return transactionAvgClientOrderQuantity;
    }

}
