package payroll.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import payroll.Model.DTO.CategoryDTO;
import payroll.Model.DTO.ProductDTO;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long categoryId;

    @Column(name = "CategoryName")
    private String categoryName;

    @Column(name = "CategoryPopularity")
    private int categoryPopularity; //out of 100

    @Column(name = "CategorySales")
    private Long categorySales;

    @Column(name = "CategoryReturnsPerMonth")
    private double categoryReturnsPerMonth;

    @Column(name = "CategoryProfitability")
    private int categoryProfitability; //out of 1000

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Product> products = new ArrayList<>();

    @JsonIgnore
    public CategoryDTO getCategoryDTO(){
        CategoryDTO categoryDTO = new CategoryDTO();

        categoryDTO.setCategoryId(categoryId);
        categoryDTO.setCategoryName(categoryName);
        categoryDTO.setCategoryPopularity(categoryPopularity);
        categoryDTO.setCategoryReturnsPerMonth(categoryReturnsPerMonth);
        categoryDTO.setCategoryProfitability(categoryProfitability);

        return categoryDTO;
    }
}
