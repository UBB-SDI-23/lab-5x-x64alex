package payroll;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import payroll.Controller.ProductController;
import payroll.Model.DTO.ProductBoughtDTO;
import payroll.Model.DTO.ProductIdDTO;
import payroll.Service.ProductService;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(ProductController.class)
public class ProductTests {

    @MockBean
    private ProductService service;

//    @InjectMocks
//    private ProductController dealershipController;

    @Autowired
    private MockMvc mvc;

    @Test
    public void basicTest() throws Exception {
        ProductIdDTO p = new ProductIdDTO(1L,"",3.0F,3,true,2.0,1L);
        List<ProductIdDTO> productList = new ArrayList<>();
        productList.add(p);

        when(service.getProductIdDTOList()).thenReturn(productList);
        mvc.perform(get("/products"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    public void filterTest() throws Exception {
        ProductIdDTO p1 = new ProductIdDTO(1L,"",3.0F,3,true,2.0,1L);
        List<ProductIdDTO> productList = new ArrayList<>();
        List<ProductIdDTO> emptyProductList = new ArrayList<>();
        productList.add(p1);
        when(service.filterQuantity(0)).thenReturn(productList);
        when(service.filterQuantity(10)).thenReturn(emptyProductList);

        mvc.perform(get("/products/filter/{filterValue}", "10"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));

        mvc.perform(get("/products/filter/{filterValue}", "0"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));


    }

    @Test
    public void sortTest() throws Exception {
        ProductBoughtDTO p1 = new ProductBoughtDTO(1L,"",3.0F,3,true,2.0,1);
        ProductBoughtDTO p2 = new ProductBoughtDTO(2L,"",3.0F,3,true,2.0,2);
        List<ProductBoughtDTO> productList = new ArrayList<>();
        productList.add(p1);
        productList.add(p2);
        when(service.sorted()).thenReturn(productList);

        mvc.perform(get("/products/sorted"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().json("[{\"productId\":1,\"productName\":\"\",\"productPrice\":3.0,\"productQuantity\":3,\"productOnSale\":true,\"productWeight\":2.0,\"numberOfProductsInCategory\":1},{\"productId\":2,\"productName\":\"\",\"productPrice\":3.0,\"productQuantity\":3,\"productOnSale\":true,\"productWeight\":2.0,\"numberOfProductsInCategory\":2}]"));
    }
}