package payroll.Model.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import payroll.Model.Category;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductIdDTO {
    private Long productId;
    private String productName;
    private Float productPrice; //in usd
    private Integer productQuantity;
    private boolean productOnSale;
    private double productWeight;
    private Long categoryId;
}
