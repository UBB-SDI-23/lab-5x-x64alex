package payroll.Model.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserStatistics {
    private Long id;
    private int categoriesAdded;
    private int productsAdded;
    private int clientsAdded;
    private int transactionsAdded;
}
