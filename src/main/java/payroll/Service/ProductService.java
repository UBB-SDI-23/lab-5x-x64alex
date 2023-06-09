package payroll.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import payroll.Model.Category.Category;
import payroll.Model.Category.CategoryDTO;
import payroll.Model.Client.Client;
import payroll.Model.Products.*;
import payroll.Model.Transactions.Transaction;
import payroll.Repository.CategoryRepository;
import payroll.Repository.ProductRepository;
import payroll.Repository.TransactionRepository;
import payroll.Repository.UserRepository;
import payroll.Security.Services.UserDetailsImpl;

import java.util.*;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;


    public Boolean hasCurrentUserAccess(long productId){
        Long userId = this.productRepository.getById(productId).getUser().getId();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            if (authentication.getPrincipal() instanceof UserDetailsImpl userDetails) {
                Long currentUserId = userDetails.getId();
                return Objects.equals(userId, currentUserId);
            }
        }
        return false;
    }

    public List<Product> getFilterGreaterThanPageable(int quantity, int pageNumber, int pageSize, int sortByQuantityDescending) {
        Pageable page;
        if(sortByQuantityDescending == 0){
            page = PageRequest.of(pageNumber, pageSize, Sort.by("ProductQuantity").ascending());
        }else {
            page = PageRequest.of(pageNumber, pageSize, Sort.by("ProductQuantity").descending());
        }
        return productRepository.findByProductQuantityGreaterThan(quantity, page);
    }
    public List<Product> getFilterGreaterThan(int quantity, long startId, long endId) {
        return productRepository.filterByQuantityGreater(quantity, startId, endId);
    }

    public int getTransactionsCount(Long productId) {
        return productRepository.getTransactionsCount(productId);
    }

    public List<ProductNameDTO> getProductNames(String givenString){
        Pageable page = PageRequest.of(0, 10);
        return this.productRepository.findProductNames(givenString, page);
    }

    public Product saveProduct(ProductIdDTO productIdDTO) {
        Product product = new Product();

        Category category = categoryRepository.findById(productIdDTO.getCategoryId()).get();



        product.setProductId(productIdDTO.getProductId());
        product.setProductName(productIdDTO.getProductName());
        product.setProductPrice(productIdDTO.getProductPrice());
        product.setProductQuantity(productIdDTO.getProductQuantity());
        product.setProductOnSale(productIdDTO.isProductOnSale());
        product.setProductWeight(productIdDTO.getProductWeight());
        product.setProductDescription(productIdDTO.getProductDescription());

        product.setCategory(category);

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = ((UserDetailsImpl) principal).getId();
        product.setUser(userRepository.getById(userId));

        productRepository.save(product);

        return product;
    }

    public List<ProductIdDTO> getProductIdDTOList(){
        List<ProductIdDTO> productIdDTOS = new ArrayList<>();
        for(Product product : this.productRepository.findAll()){
            ProductIdDTO productIdDTO = new ProductIdDTO();

            productIdDTO.setProductId(product.getProductId());
            productIdDTO.setProductName(product.getProductName());
            productIdDTO.setProductPrice(product.getProductPrice());
            productIdDTO.setProductQuantity(product.getProductQuantity());
            productIdDTO.setProductOnSale(product.isProductOnSale());
            productIdDTO.setProductWeight(product.getProductWeight());
            productIdDTO.setProductDescription(product.getProductDescription());

            productIdDTO.setCategoryId(product.getCategory().getCategoryId());


            productIdDTOS.add(productIdDTO);
        }
        return productIdDTOS;
    }

    public ProductDTO getOneProduct(Long productId){
        Product product = productRepository.findById(productId).get();

        // Get categoryDTO from category
        Category category = categoryRepository.findById(product.getCategory().getCategoryId()).get();
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setCategoryId(category.getCategoryId());
        categoryDTO.setCategoryName(category.getCategoryName());
        categoryDTO.setCategoryProfitability(category.getCategoryProfitability());
        categoryDTO.setCategoryPopularity(category.getCategoryPopularity());
        categoryDTO.setCategorySales(category.getCategorySales());
        categoryDTO.setCategoryReturnsPerMonth(category.getCategoryReturnsPerMonth());

        // Construct productDTO
        ProductDTO productDTO = new ProductDTO();
        productDTO.setProductId(product.getProductId());
        productDTO.setProductName(product.getProductName());
        productDTO.setProductPrice(product.getProductPrice());
        productDTO.setProductQuantity(product.getProductQuantity());
        productDTO.setProductOnSale(product.isProductOnSale());
        productDTO.setProductWeight(product.getProductWeight());
        productDTO.setProductDescription(product.getProductDescription());

        productDTO.setCategoryDTO(categoryDTO);



        return productDTO;
    }

    public void deleteProduct(Long productId) {
        this.productRepository.deleteById(productId);
    }

    public Product updateProduct(ProductIdDTO product, Long productId) {
        Product oldProduct = productRepository.findById(productId).get();

        oldProduct.setProductName(product.getProductName());
        oldProduct.setProductPrice(product.getProductPrice());
        oldProduct.setProductQuantity(product.getProductQuantity());
        oldProduct.setProductOnSale(product.isProductOnSale());
        oldProduct.setProductWeight(product.getProductWeight());
        oldProduct.setProductDescription(product.getProductDescription());


        return productRepository.save(oldProduct);
    }

    public List<ProductIdDTO> filterQuantity(int filterValue){
        List<ProductIdDTO> productList = new ArrayList<>();
        for(Product product : this.productRepository.findAll()){
            if(product.getProductQuantity() > filterValue){
                ProductIdDTO filteredProduct = new ProductIdDTO();

                filteredProduct.setProductId(product.getProductId());
                filteredProduct.setProductName(product.getProductName());
                filteredProduct.setProductPrice(product.getProductPrice());
                filteredProduct.setProductQuantity(product.getProductQuantity());
                filteredProduct.setProductOnSale(product.isProductOnSale());
                filteredProduct.setProductWeight(product.getProductWeight());


                productList.add(filteredProduct);
            }
        }
        return productList;
    }

    public List<ProductClientDTO> sortNumberOfProductsBought(){
        List<ProductClientDTO> productList = new ArrayList<>();

        //clientId: set{products id}
        HashMap<Long, Set<Long>> clientHashMap = new HashMap<>();
        for(Transaction transaction: this.transactionRepository.findAll()) {
            if(! clientHashMap.containsKey(transaction.getClient().getClientId())){
                Long productId = transaction.getProduct().getProductId();
                Set<Long> newSet = new HashSet<>();
                newSet.add(productId);
                clientHashMap.put(transaction.getClient().getClientId(),newSet);
            }
            else {
                Long productId = transaction.getProduct().getProductId();
                Set<Long> newSet = clientHashMap.get(transaction.getClient().getClientId());
                newSet.add(productId);
                clientHashMap.put(transaction.getClient().getClientId(), newSet);
            }
        }

        for(Product product : this.productRepository.findAll()){
            List<Transaction> transactionsProduct = product.getTransactions();

            //get product clients
            List<Client> productClients = new ArrayList<>();

            for(Transaction transaction: transactionsProduct){
                if(transaction.getProduct().getProductId() == product.getProductId()){
                    productClients.add(transaction.getClient());
                }
            }
            int otherProducts = 0;

            for(Client client: productClients){
                for(Long productId: clientHashMap.get(client.getClientId())){
                    if(productId != product.getProductId()){
                        otherProducts+=1;
                    }
                }
                //otherProducts += clientHashMap.get(client.getClientId()).size();
            }



            ProductClientDTO productClientDTO = new ProductClientDTO();

            productClientDTO.setProductId(product.getProductId());
            productClientDTO.setProductName(product.getProductName());

            productClientDTO.setNumberOfProductsBought(otherProducts);

            productList.add(productClientDTO);
        }

        //sort in ascending order bubble sort
        productList.sort(new Comparator<ProductClientDTO>() {
            @Override
            public int compare(ProductClientDTO o1, ProductClientDTO o2) {
                if(o1.getNumberOfProductsBought()==o2.getNumberOfProductsBought())
                    return 0;
                else if(o1.getNumberOfProductsBought()<o2.getNumberOfProductsBought())
                    return 1;
                else
                    return -1;
            }
        });

        return productList;
    }
}