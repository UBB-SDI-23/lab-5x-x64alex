package payroll.Model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductClientDTO {
    private Long productId;
    private String productName;
    private Float productPrice;
    private Integer productQuantity;
    private boolean productOnSale;
    private double productWeight;

    private int numberOfProductsBought;

}
