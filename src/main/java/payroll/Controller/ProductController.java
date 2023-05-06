package payroll.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import payroll.Model.Products.ProductClientDTO;
import payroll.Model.Products.ProductDTO;
import payroll.Model.Products.ProductIdDTO;
import payroll.Model.Products.Product;
import payroll.Model.Products.ProductAggregate;
import payroll.Model.Products.ProductNameDTO;
import payroll.Service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping()
    public List<ProductIdDTO> getProducts(){
        return this.productService.getProductIdDTOList();
    }

    @GetMapping("/getProductsSortedClientsBought")
    public List<ProductClientDTO> getProductsSortedClientsBought(){
        return this.productService.sortNumberOfProductsBought();
    }

    @GetMapping("/names")
    public List<ProductNameDTO> getProductNames(@RequestParam(defaultValue = "") String searchString) {
        return this.productService.getProductNames(searchString);
    }
    @GetMapping("/{productId}")
    public ProductDTO getOneProduct(@PathVariable("productId") Long productId){
        return this.productService.getOneProduct(productId);
    }

    @GetMapping("/{productId}/getTransactionsCount")
    public Integer getProductTransactionsCount(@PathVariable("productId") Long productId){
        return this.productService.getTransactionsCount(productId);
    }

    // Filter product quantity
    @GetMapping("/filterQuantityGreaterThan/{filterValue}")
    public List<ProductIdDTO> filterQuantity(@PathVariable("filterValue") int filterValue){
        return this.productService.filterQuantity(filterValue);
    }


    @GetMapping("/filterQuantityGreaterThanPageable/{filterValue}")
    public List<ProductAggregate> filterQuantityPageable(@PathVariable("filterValue") int filterValue,
                                                    @RequestParam(defaultValue = "0") int pageNumber,
                                                    @RequestParam(defaultValue = "100") int pageSize,
                                                         @RequestParam(defaultValue = "0") int sortByQuantityDescending){
        return this.productService.getFilterGreaterThanPageable(filterValue,pageNumber,pageSize, sortByQuantityDescending).stream().map(product -> product.getProductAggregate(productService.getTransactionsCount(product.getProductId()))).toList();
    }


    @GetMapping("/filterQuantityGreaterThan100/{filterValue}")
    public List<ProductAggregate> filterQuantity100(@PathVariable("filterValue") int filterValue,
                                                    @RequestParam(defaultValue = "1") Long startId,
                                                    @RequestParam(defaultValue = "100") Long endId){
        return this.productService.getFilterGreaterThan(filterValue,startId,endId).stream().map(product -> product.getProductAggregate(productService.getTransactionsCount(product.getProductId()))).toList();
    }
    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_REGULAR') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public Product saveProduct(@RequestBody ProductIdDTO product){
        return this.productService.saveProduct(product);
    }

    @PutMapping("/{productId}")
    @PreAuthorize("(hasRole('ROLE_REGULAR') and @productService.hasCurrentUserAccess(#productId)) or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public Product updateProduct(@RequestBody ProductIdDTO product, @PathVariable("productId") Long productId){
        return this.productService.updateProduct(product, productId);
    }

    @DeleteMapping("/{productId}")
    @PreAuthorize("(hasRole('ROLE_REGULAR') and @productService .hasCurrentUserAccess(#productId)) or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public String deleteProduct(@PathVariable("productId") Long productId){
        this.productService.deleteProduct(productId);
        return "Product deleted";
    }

}