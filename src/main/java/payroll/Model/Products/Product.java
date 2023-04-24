package payroll.Model.Products;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import payroll.Model.Category.Category;
import payroll.Model.DTO.ProductDTO;

import jakarta.persistence.*;
import payroll.Model.Transactions.Transaction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Products", indexes = {@Index(name="name1",columnList = "ProductQuantity"),
        @Index(name="name4",columnList = "categoryID")
})
@SequenceGenerator(name="seq", initialValue=1000000, allocationSize=100)
public class Product {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
    private Long productId;

    @Column(name = "ProductName")
    private String productName;

    @Column(name = "ProductPrice")
    private Float productPrice;

    @Column(name = "ProductQuantity")
    private Integer productQuantity;

    @Column(name = "ProductOnSale")
    private boolean productOnSale;

    @Column(name = "ProductWeight")
    private double productWeight;
    @Column(name = "ProductDescription", columnDefinition="text")
    private String productDescription;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "categoryID", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Category category;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Transaction> transactions = new ArrayList<>();

    @JsonIgnore
    public ProductDTO getProductDTO(){
        ProductDTO productDTO = new ProductDTO();

        productDTO.setProductId(productId);
        productDTO.setProductName(productName);
        productDTO.setProductPrice(productPrice);
        productDTO.setProductQuantity(productQuantity);
        productDTO.setProductOnSale(productOnSale);
        productDTO.setProductWeight(productWeight);

        productDTO.setCategoryDTO(category.getCategoryDTO());


        return productDTO;
    }

    @JsonIgnore
    public ProductAggregate getProductAggregate(int transactionsCount){
        ProductAggregate product = new ProductAggregate();

        product.setProductId(productId);
        product.setProductName(productName);
        product.setProductPrice(productPrice);
        product.setProductQuantity(productQuantity);
        product.setProductOnSale(productOnSale);
        product.setProductWeight(productWeight);

        product.setTransactionsCount(transactionsCount);

        return product;
    }

}

