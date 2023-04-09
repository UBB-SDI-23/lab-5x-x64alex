package payroll.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import payroll.Model.DTO.ProductDTO;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Products")
@SequenceGenerator(name="seq", initialValue=1000000, allocationSize=1000)
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

        return productDTO;
    }
}

