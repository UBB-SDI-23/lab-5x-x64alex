package payroll.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import payroll.Model.DTO.ProductBoughtDTO;
import payroll.Model.DTO.ProductClientDTO;
import payroll.Model.DTO.ProductDTO;
import payroll.Model.DTO.ProductIdDTO;
import payroll.Model.Product;
import payroll.Service.ProductService;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public List<ProductIdDTO> getProducts(){
        return this.productService.getProductIdDTOList();
    }

    @GetMapping("/products/sorted")
    public List<ProductBoughtDTO> getProductsSorted(){
        return this.productService.sorted();
    }

    @GetMapping("/products/getProductsSortedClientsBought")
    public List<ProductClientDTO> getProductsSortedClientsBought(){
        return this.productService.sortNumberOfProductsBought();
    }

    @GetMapping("/products/{productId}")
    public ProductDTO getOneProduct(@PathVariable("productId") Long productId){
        return this.productService.getOneProduct(productId);
    }
    // Filter product quantity
    @GetMapping("/products/filter/{filterValue}")
    public List<ProductIdDTO> filterQuantity(@PathVariable("filterValue") int filterValue){
        return this.productService.filterQuantity(filterValue);
    }
    @PostMapping("/products")
    public Product saveProduct(@RequestBody ProductIdDTO product){
        return this.productService.saveProduct(product);
    }

    @PutMapping("/products/{productId}")
    public Product updateProduct(@RequestBody ProductIdDTO product, @PathVariable("productId") Long productId){
        return this.productService.updateProduct(product, productId);
    }

    @DeleteMapping("/products/{productId}")
    public String deleteProduct(@PathVariable("productId") Long productId){
        this.productService.deleteProduct(productId);
        return "Product deleted";
    }

}