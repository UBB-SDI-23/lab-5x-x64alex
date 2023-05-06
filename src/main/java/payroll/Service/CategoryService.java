package payroll.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import payroll.Model.Category.*;
import payroll.Model.Products.Product;
import payroll.Model.User.User;
import payroll.Repository.CategoryRepository;
import payroll.Repository.UserRepository;
import payroll.Security.Services.UserDetailsImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    public Category saveCategory(Category category) {   
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = ((UserDetailsImpl) principal).getId();

        category.setUser(userRepository.getById(userId));
        categoryRepository.save(category);

        return category;
    }
    public List<Category> getCategoryList(){
        return  this.categoryRepository.findAll();
    }

    public Boolean hasCurrentUserAccess(long categoryId){
        Long categoryUserId = this.categoryRepository.getById(categoryId).getUser().getId();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            if (authentication.getPrincipal() instanceof UserDetailsImpl userDetails) {
                Long currentUserId = userDetails.getId();
                return Objects.equals(categoryUserId, currentUserId);
            }
        }
        return false;
    }

    public List<CategoryNameDTO> getCategoryNames(String givenString){
        Pageable page = PageRequest.of(0, 10);
        return this.categoryRepository.findCategoryNames(givenString, page);
    }


    public List<CategoryDTO> getCategoryDTOList() {
        List<CategoryDTO> categoryDTOS = new ArrayList<>();
        for(Category category : this.getCategoryList()){
            CategoryDTO categoryDTO = new CategoryDTO();

            categoryDTO.setCategoryId(category.getCategoryId());
            categoryDTO.setCategoryName(category.getCategoryName());
            categoryDTO.setCategoryProfitability(category.getCategoryProfitability());
            categoryDTO.setCategoryPopularity(category.getCategoryPopularity());
            categoryDTO.setCategorySales(category.getCategorySales());
            categoryDTO.setCategoryReturnsPerMonth(category.getCategoryReturnsPerMonth());

            categoryDTO.setUserId(category.getUser().getId());

            categoryDTOS.add(categoryDTO);
        }
        return categoryDTOS;
    }

    public Category getOne(Long categoryID) {return  this.categoryRepository.findById(categoryID).get(); }

    public Category updateCategory(CategoryNoProductDTO category, Long categoryId) {
        Category foundCategory = this.categoryRepository.findById(categoryId).get();

        // Do not update id
        foundCategory.setCategoryName(category.getCategoryName());
        foundCategory.setCategoryProfitability(category.getCategoryProfitability());
        foundCategory.setCategoryPopularity(category.getCategoryPopularity());
        foundCategory.setCategorySales(category.getCategorySales());
        foundCategory.setCategoryReturnsPerMonth(category.getCategoryReturnsPerMonth());


        return this.categoryRepository.save(foundCategory);
    }

    public void deleteCategory(Long categoryId) {
        this.categoryRepository.deleteById(categoryId);
    }

    public List<CategoryProductDTO> averagePriceProduct(int pageNumber, int pageSize){
       Pageable page = PageRequest.of(pageNumber, pageSize);
       List<Category> categories =  this.categoryRepository.findAll(page).stream().toList();

       return categories.stream().map((category)-> {
           Double categoryAvgPrice = (double) -100;
           if(this.categoryRepository.getCategoryAveragePrice(category.getCategoryId()) != null){
               categoryAvgPrice = Double.valueOf(this.categoryRepository.getCategoryAveragePrice(category.getCategoryId()));
           }
           System.out.println(categoryAvgPrice);

           Integer numberProducts = this.categoryRepository.getNumberProducts(category.getCategoryId());

           return category.getCategoryProductDTO(numberProducts, categoryAvgPrice);}
       ).toList();

    }
    public List<CategoryProductDTO> orderByAveragePriceProduct(){
        List<CategoryProductDTO> categoryProductDTOS = new ArrayList<>();

        for(Category category : this.getCategoryList()){
            CategoryProductDTO categoryProductDTO = new CategoryProductDTO();

            categoryProductDTO.setCategoryId(category.getCategoryId());
            categoryProductDTO.setCategoryName(category.getCategoryName());
            categoryProductDTO.setCategoryProfitability(category.getCategoryProfitability());
            categoryProductDTO.setCategoryPopularity(category.getCategoryPopularity());
            categoryProductDTO.setCategorySales(category.getCategorySales());
            categoryProductDTO.setCategoryReturnsPerMonth(category.getCategoryReturnsPerMonth());

            double sum = 0;

            for(Product product: category.getProducts()){
                sum += product.getProductPrice();
            }
            if(sum==0){
                categoryProductDTO.setCategoryAveragePrice(sum);
            } else{
                categoryProductDTO.setCategoryAveragePrice(sum/category.getProducts().size());
            }

            categoryProductDTOS.add(categoryProductDTO);
        }

//        //sort in ascending order bubble sort
//        categoryProductDTOS.sort(new Comparator<CategoryProductDTO>() {
//            @Override
//            public int compare(CategoryProductDTO o1, CategoryProductDTO o2) {
//                if(o1.getCategoryAveragePrice()==o2.getCategoryAveragePrice())
//                    return 0;
//                else if(o1.getCategoryAveragePrice()>o2.getCategoryAveragePrice())
//                    return 1;
//                else
//                    return -1;
//            }
//        });
        return categoryProductDTOS;
    }
}
