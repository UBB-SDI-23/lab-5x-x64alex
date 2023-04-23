package payroll.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import payroll.Model.DTO.ProductBoughtDTO;
import payroll.Model.DTO.ProductClientDTO;
import payroll.Model.DTO.ProductDTO;
import payroll.Model.DTO.ProductIdDTO;
import payroll.Model.Product;
import payroll.Repository.CategoryRepository;
import payroll.Service.ProductService;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/products")
    public List<ProductIdDTO> getProducts(){
        return this.productService.getProductIdDTOList();
    }

//    @GetMapping("/products100")
//    public List<ProductDTO> getProducts100(){
//        return this.productService.getFirst100Products().stream().map(Product::getProductDTO)
//                .toList();
//    }

    @GetMapping("/products/getProductsSortedClientsBought")
    public List<ProductClientDTO> getProductsSortedClientsBought(){
        return this.productService.sortNumberOfProductsBought();
    }

    @GetMapping("/products/{productId}")
    public ProductDTO getOneProduct(@PathVariable("productId") Long productId){
        return this.productService.getOneProduct(productId);
    }
    // Filter product quantity
    @GetMapping("/products/filterQuantityGreaterThan/{filterValue}")
    public List<ProductIdDTO> filterQuantity(@PathVariable("filterValue") int filterValue){
        return this.productService.filterQuantity(filterValue);
    }

    @GetMapping("/products/filterQuantityGreaterThan100/{filterValue}")
    public List<ProductDTO> filterQuantity100(@PathVariable("filterValue") int filterValue,
                                              @RequestParam(defaultValue = "1") Long startId,
                                              @RequestParam(defaultValue = "100") Long endId){
        return this.productService.getFilterGreaterThan(filterValue,startId,endId).stream().map(Product::getProductDTO).toList();
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