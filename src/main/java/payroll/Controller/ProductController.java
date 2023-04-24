package payroll.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import payroll.Model.Client.ClientNameDTO;
import payroll.Model.DTO.ProductClientDTO;
import payroll.Model.DTO.ProductDTO;
import payroll.Model.DTO.ProductIdDTO;
import payroll.Model.Products.Product;
import payroll.Model.Products.ProductAggregate;
import payroll.Model.Products.ProductNameDTO;
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

    @GetMapping("/products/getProductsSortedClientsBought")
    public List<ProductClientDTO> getProductsSortedClientsBought(){
        return this.productService.sortNumberOfProductsBought();
    }

    @GetMapping("/products/names")
    public List<ProductNameDTO> getProductNames(@RequestParam(defaultValue = "") String searchString) {
        return this.productService.getProductNames(searchString);
    }
    @GetMapping("/products/{productId}")
    public ProductDTO getOneProduct(@PathVariable("productId") Long productId){
        return this.productService.getOneProduct(productId);
    }

    @GetMapping("/products/{productId}/getTransactionsCount")
    public Integer getProductTransactionsCount(@PathVariable("productId") Long productId){
        return this.productService.getTransactionsCount(productId);
    }

    // Filter product quantity
    @GetMapping("/products/filterQuantityGreaterThan/{filterValue}")
    public List<ProductIdDTO> filterQuantity(@PathVariable("filterValue") int filterValue){
        return this.productService.filterQuantity(filterValue);
    }


    @GetMapping("/products/filterQuantityGreaterThanPageable/{filterValue}")
    public List<ProductAggregate> filterQuantityPageable(@PathVariable("filterValue") int filterValue,
                                                    @RequestParam(defaultValue = "0") int pageNumber,
                                                    @RequestParam(defaultValue = "100") int pageSize,
                                                         @RequestParam(defaultValue = "0") int sortByQuantityDescending){
        return this.productService.getFilterGreaterThanPageable(filterValue,pageNumber,pageSize, sortByQuantityDescending).stream().map(product -> product.getProductAggregate(productService.getTransactionsCount(product.getProductId()))).toList();
    }


    @GetMapping("/products/filterQuantityGreaterThan100/{filterValue}")
    public List<ProductAggregate> filterQuantity100(@PathVariable("filterValue") int filterValue,
                                                    @RequestParam(defaultValue = "1") Long startId,
                                                    @RequestParam(defaultValue = "100") Long endId){
        return this.productService.getFilterGreaterThan(filterValue,startId,endId).stream().map(product -> product.getProductAggregate(productService.getTransactionsCount(product.getProductId()))).toList();
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