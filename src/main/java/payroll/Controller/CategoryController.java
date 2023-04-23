package payroll.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import payroll.Model.Category;
import payroll.Model.DTO.CategoryDTO;
import payroll.Model.DTO.CategoryProductDTO;
import payroll.Service.CategoryService;

import java.util.List;

@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public List<CategoryDTO> getCategories() {
        return this.categoryService.getCategoryDTOList();
    }

    @GetMapping("/categories/orderByAveragePriceProduct")
    public List<CategoryProductDTO> getCategoryProducts() {
        return this.categoryService.orderByAveragePriceProduct();
    }

    @GetMapping("/categories/{categoryId}")
    public Category getOne(@PathVariable("categoryId") Long categoryId) {
        return this.categoryService.getOne(categoryId);
    }

    @PostMapping("/categories")
    public Category saveCategory(@RequestBody Category category) {
        return this.categoryService.saveCategory(category);
    }

    @PutMapping("/categories/{categoryId}")
    public Category updateCategory(@RequestBody Category category, @PathVariable("categoryId") Long categoryId) {
        return this.categoryService.updateCategory(category, categoryId);
    }

    @DeleteMapping("/categories/{categories}")
    public String deleteCategory(@PathVariable("categories") Long categoryId) {
        this.categoryService.deleteCategory(categoryId);
        return "Category deleted";
    }
}
