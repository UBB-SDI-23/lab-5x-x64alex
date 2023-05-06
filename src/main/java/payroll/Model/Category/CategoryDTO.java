package payroll.Model.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Long categoryId;
    private String categoryName;
    private int categoryPopularity;
    private Long categorySales;
    private double categoryReturnsPerMonth;
    private int CategoryProfitability;
    private Long userId;
}