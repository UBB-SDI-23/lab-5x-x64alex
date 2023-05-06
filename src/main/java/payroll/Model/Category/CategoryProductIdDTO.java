package payroll.Model.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import payroll.Model.Products.Product;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryProductIdDTO {
    private Long categoryId;
    private String categoryName;
    private int categoryPopularity;
    private Long categorySales;
    private double categoryReturnsPerMonth;
    private int CategoryProfitability;
    private List<Product> products;
    private String userName;
}
