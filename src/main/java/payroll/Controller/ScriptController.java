package payroll.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.AuthenticationException;
import org.springframework.util.FileCopyUtils;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ScriptController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/run-script")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> runScript(@RequestParam(defaultValue = "sql_script10k.sql") String scriptName) {
        try {
            ClassPathResource resource = new ClassPathResource("scripts/"+scriptName);
            byte[] content = FileCopyUtils.copyToByteArray(resource.getInputStream());
            String script = new String(content);


            jdbcTemplate.execute(script);

            return ResponseEntity.ok("Script executed successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to execute script");
        }
    }
}
