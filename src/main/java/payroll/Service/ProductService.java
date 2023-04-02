package payroll.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import payroll.Model.Category;
import payroll.Model.Client;
import payroll.Model.DTO.*;
import payroll.Model.Product;
import payroll.Model.Transaction;
import payroll.Repository.CategoryRepository;
import payroll.Repository.ClientRepository;
import payroll.Repository.ProductRepository;
import payroll.Repository.TransactionRepository;

import java.util.*;

@Service
public class ProductService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ClientRepository clientRepository;


    public Product saveProduct(ProductIdDTO productIdDTO) {
        Category category = categoryRepository.findById(productIdDTO.getCategoryId()).get();
        Product product = new Product();

        product.setProductId(productIdDTO.getProductId());
        product.setProductName(productIdDTO.getProductName());
        product.setProductPrice(productIdDTO.getProductPrice());
        product.setProductQuantity(productIdDTO.getProductQuantity());
        product.setProductOnSale(productIdDTO.isProductOnSale());
        product.setProductWeight(productIdDTO.getProductWeight());

        product.setCategory(category);

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

        productDTO.setCategoryDTO(categoryDTO);


        return productDTO;
    }

    public void deleteProduct(Long productId) {
        this.productRepository.deleteById(productId);
    }

    public Product updateProduct(ProductIdDTO product, Long productId) {
        Product oldProduct = productRepository.findById(productId).get();
        Category category = categoryRepository.findById(product.getCategoryId()).get();

        oldProduct.setProductName(product.getProductName());
        oldProduct.setProductPrice(product.getProductPrice());
        oldProduct.setProductQuantity(product.getProductQuantity());
        oldProduct.setProductOnSale(product.isProductOnSale());
        oldProduct.setProductWeight(product.getProductWeight());

        oldProduct.setCategory(category);

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

                filteredProduct.setCategoryId(product.getCategory().getCategoryId());

                productList.add(filteredProduct);
            }
        }
        return productList;
    }

    public List<ProductBoughtDTO> sorted(){
        List<ProductBoughtDTO> productList = new ArrayList<>();
        for(Product product : this.productRepository.findAll()){
            HashMap<Long, Integer> categoryHashMap = new HashMap<>();

            for(Category category: this.categoryRepository.findAll()) {
                if(! categoryHashMap.containsKey(category.getCategoryId())){
                    categoryHashMap.put(category.getCategoryId(), 0);
                }

                if(Objects.equals(category.getCategoryId(), product.getCategory().getCategoryId())){
                    categoryHashMap.put(category.getCategoryId(), categoryHashMap.get(category.getCategoryId())+ product.getCategory().getProducts().size()-1);
                }
            }

            ProductBoughtDTO productBoughtDTO = new ProductBoughtDTO();

            productBoughtDTO.setProductId(product.getProductId());
            productBoughtDTO.setProductName(product.getProductName());

            productBoughtDTO.setNumberOfProductsInCategory(categoryHashMap.get(product.getCategory().getCategoryId()));

            productList.add(productBoughtDTO);
        }

        //sort in ascending order bubble sort
        productList.sort(new Comparator<ProductBoughtDTO>() {
            @Override
            public int compare(ProductBoughtDTO o1, ProductBoughtDTO o2) {
                if(o1.getNumberOfProductsInCategory()==o2.getNumberOfProductsInCategory())
                    return 0;
                else if(o1.getNumberOfProductsInCategory()>o2.getNumberOfProductsInCategory())
                    return 1;
                else
                    return -1;
            }
        });

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