package payroll.Model.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryProductDTO {
    private Long categoryId;
    private String categoryName;
    private int categoryPopularity;
    private Long categorySales;
    private double categoryReturnsPerMonth;
    private int categoryProfitability;

    private int categoryNumberProducts;
    private double categoryAveragePrice;
}
