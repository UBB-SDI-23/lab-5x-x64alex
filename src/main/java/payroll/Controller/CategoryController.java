package payroll.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import payroll.Model.Category.*;
import payroll.Service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @GetMapping()
    public List<CategoryDTO> getCategories() {
        return this.categoryService.getCategoryDTOList();
    }

    @GetMapping("/names")
    public List<CategoryNameDTO> getCategoryNames(@RequestParam(defaultValue = "") String searchString) {
        return this.categoryService.getCategoryNames(searchString);
    }


    @GetMapping("/orderByAveragePriceProduct")
    public List<CategoryProductDTO> getCategoryProducts() {
        return this.categoryService.orderByAveragePriceProduct();
    }

    @GetMapping("/averagePriceProduct")
    public List<CategoryProductDTO> getCategoryProducts(@RequestParam(defaultValue = "0") int pageNumber,
                                                        @RequestParam(defaultValue = "100") int pageSize) {
        return this.categoryService.averagePriceProduct(pageNumber, pageSize);
    }

    @GetMapping("/{categoryId}")
    public Category getOne(@PathVariable("categoryId") Long categoryId) {
        return this.categoryService.getOne(categoryId);
    }
    @PostMapping()
    @PreAuthorize("hasRole('ROLE_REGULAR') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public Category saveCategory(@RequestBody Category category) {
        return this.categoryService.saveCategory(category);
    }

    @PutMapping("/{categoryId}")
    @PreAuthorize("(hasRole('ROLE_REGULAR') and @categoryService.getUserIdForCategory(#categoryId) == 1) or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public Category updateCategory(@RequestBody CategoryNoProductDTO category, @PathVariable("categoryId") Long categoryId) {
        return this.categoryService.updateCategory(category, categoryId);
    }

    @DeleteMapping("/{categoryId}")
    @PreAuthorize("(hasRole('ROLE_REGULAR') and @categoryService.getUserIdForCategory(#categoryId) == 1) or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public String deleteCategory(@PathVariable("categoryId") Long categoryId) {
        this.categoryService.deleteCategory(categoryId);
        return "Category deleted";
    }
}
