package payroll.Model.Category;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import payroll.Model.Products.Product;
import payroll.Model.User.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Category")
@SequenceGenerator(name="seq", initialValue=1000000, allocationSize=100)
public class Category {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

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

    @JsonIgnore
    public CategoryProductDTO getCategoryProductDTO(int numberProducts,double averagePrice, String userName){
        CategoryProductDTO categoryDTO = new CategoryProductDTO();

        categoryDTO.setCategoryId(categoryId);
        categoryDTO.setCategoryName(categoryName);
        categoryDTO.setCategoryPopularity(categoryPopularity);
        categoryDTO.setCategoryReturnsPerMonth(categoryReturnsPerMonth);
        categoryDTO.setCategoryProfitability(categoryProfitability);
        categoryDTO.setCategorySales(categorySales);
        categoryDTO.setCategoryNumberProducts(numberProducts);
        categoryDTO.setCategoryAveragePrice(averagePrice);

        categoryDTO.setUserName(userName);

        return categoryDTO;
    }

    @JsonIgnore
    public CategoryProductIdDTO getCategoryProductIdDTO() {
        CategoryProductIdDTO categoryDTO = new CategoryProductIdDTO();

        categoryDTO.setCategoryId(categoryId);
        categoryDTO.setCategoryName(categoryName);
        categoryDTO.setCategoryPopularity(categoryPopularity);
        categoryDTO.setCategoryReturnsPerMonth(categoryReturnsPerMonth);
        categoryDTO.setCategoryProfitability(categoryProfitability);
        categoryDTO.setCategorySales(categorySales);
        categoryDTO.setProducts(products);

        categoryDTO.setUserName(user.getUsername());

        return categoryDTO;
    }

}