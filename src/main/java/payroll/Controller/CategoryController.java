package payroll.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import payroll.Model.Category.*;
import payroll.Service.CategoryService;
import payroll.Service.EntriesService;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @Autowired
    EntriesService entriesService;
    @GetMapping()
    public List<CategoryDTO> getCategories() {
        return this.categoryService.getCategoryDTOList();
    }

    @GetMapping("/names")
    public List<CategoryNameDTO> getCategoryNames(@RequestParam(defaultValue = "") String searchString) {
        return this.categoryService.getCategoryNames(searchString);
    }

    @GetMapping("/averagePriceProduct")
    public List<CategoryProductDTO> getCategoryProducts(@RequestParam(defaultValue = "0") int pageNumber,
                                                        @RequestParam(defaultValue = "100") int pageSize) {
        int entities = entriesService.getEntries();
        return this.categoryService.averagePriceProduct(pageNumber, entities);
    }

    @GetMapping("/{categoryId}")
    public CategoryProductIdDTO getOne(@PathVariable("categoryId") Long categoryId) {
        return this.categoryService.getOne(categoryId);
    }
    @PostMapping()
    @PreAuthorize("hasRole('ROLE_REGULAR') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public Category saveCategory(@RequestBody Category category) {
        return this.categoryService.saveCategory(category);
    }

    @PutMapping("/{categoryId}")
    @PreAuthorize("(hasRole('ROLE_REGULAR') and @categoryService.hasCurrentUserAccess(#categoryId)) or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public Category updateCategory(@RequestBody CategoryNoProductDTO category, @PathVariable("categoryId") Long categoryId) {
        return this.categoryService.updateCategory(category, categoryId);
    }

    @DeleteMapping("/{categoryId}")
    @PreAuthorize("(hasRole('ROLE_REGULAR') and @categoryService.hasCurrentUserAccess(#categoryId)) or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public String deleteCategory(@PathVariable("categoryId") Long categoryId) {
        this.categoryService.deleteCategory(categoryId);
        return "Category deleted";
    }
}
