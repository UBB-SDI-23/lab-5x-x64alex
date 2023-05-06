package payroll.Model.Products;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductAggregate {
    private Long productId;
    private String productName;
    private Float productPrice; //in usd
    private Integer productQuantity;
    private boolean productOnSale;
    private double productWeight;
    private int transactionsCount;

    private String userName;
}