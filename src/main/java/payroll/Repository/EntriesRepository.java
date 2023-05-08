package payroll.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import payroll.Model.EntriesPerPage;
import payroll.Model.User.User;

public interface EntriesRepository  extends JpaRepository<EntriesPerPage, Long> {
    @Query(value = "select entries from entries_per_page WHERE id = (SELECT MIN(id) FROM entries_per_page);", nativeQuery = true)
    Integer getEntriesPerPage();
}
