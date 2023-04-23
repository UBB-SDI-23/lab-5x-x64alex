package payroll.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import payroll.Model.Category.Category;
import payroll.Model.Category.CategoryDTO;
import payroll.Model.Category.CategoryNameDTO;
import payroll.Model.Category.CategoryProductDTO;
import payroll.Model.Product;
import payroll.Repository.CategoryRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Category saveCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    public List<Category> getCategoryList(){
        return  this.categoryRepository.findAll();
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

            categoryDTOS.add(categoryDTO);
        }
        return categoryDTOS;
    }

    public Category getOne(Long categoryID) {return  this.categoryRepository.findById(categoryID).get(); }

    public Category updateCategory(Category category, Long categoryId) {
        Category foundCategory = this.categoryRepository.findById(categoryId).get();

        // Do not update id
        foundCategory.setCategoryName(category.getCategoryName());
        foundCategory.setCategoryProfitability(category.getCategoryProfitability());
        foundCategory.setCategoryPopularity(category.getCategoryPopularity());
        foundCategory.setCategorySales(category.getCategorySales());
        foundCategory.setCategoryReturnsPerMonth(category.getCategoryReturnsPerMonth());

        // Many to one update
        foundCategory.setProducts(category.getProducts());

        return this.categoryRepository.save(foundCategory);
    }

    public void deleteCategory(Long categoryId) {
        this.categoryRepository.deleteById(categoryId);
    }

    public List<CategoryProductDTO> averagePriceProduct(int pageNumber, int pageSize){
       Pageable page = PageRequest.of(pageNumber, pageSize);
       List<Category> categories =  this.categoryRepository.findAll(page).stream().toList();

        System.out.println(this.categoryRepository.getCategoryAveragePrice((long) 1));
        System.out.println(this.categoryRepository.getCategoryAveragePrice((long) 2));
        System.out.println(this.categoryRepository.getCategoryAveragePrice((long) 3));
        System.out.println(this.categoryRepository.getCategoryAveragePrice((long) 4));
        System.out.println(this.categoryRepository.getCategoryAveragePrice((long) 5));

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
