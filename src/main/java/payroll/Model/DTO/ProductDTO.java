package payroll.Model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import payroll.Model.Category.CategoryDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long productId;
    private String productName;
    private Float productPrice;
    private Integer productQuantity;
    private boolean productOnSale;
    private double productWeight;
    private String productDescription;
    private CategoryDTO categoryDTO;

}
