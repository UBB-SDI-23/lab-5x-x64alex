package payroll;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import payroll.Controller.ProductController;
import payroll.Model.DTO.ProductBoughtDTO;
import payroll.Model.DTO.ProductIdDTO;
import payroll.Service.ProductService;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(ProductController.class)
public class ProductTests {

    @MockBean
    private ProductService service;

    @InjectMocks
    private ProductController dealershipController;

    @Autowired
    private MockMvc mvc;

    @Test
    public void basicTest() throws Exception {
        ProductIdDTO p = new ProductIdDTO(1L,"",3.0F,3,true,2.0,"");
        List<ProductIdDTO> productList = new ArrayList<>();
        productList.add(p);

        when(service.getProductIdDTOList()).thenReturn(productList);
        mvc.perform(get("/products"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    public void filterTest() throws Exception {
        ProductIdDTO p1 = new ProductIdDTO(1L,"",3.0F,3,true,2.0,"");
        List<ProductIdDTO> productList = new ArrayList<>();
        List<ProductIdDTO> emptyProductList = new ArrayList<>();
        productList.add(p1);
        when(service.filterQuantity(0)).thenReturn(productList);
        when(service.filterQuantity(10)).thenReturn(emptyProductList);

        mvc.perform(get("/products/filterQuantityGreaterThan/{filterValue}", "10"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));

        mvc.perform(get("/products/filterQuantityGreaterThan/{filterValue}", "0"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));


    }
}