package payroll;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.*;
import java.net.URL;
import java.nio.file.LinkPermission;
import java.util.Properties;

@SpringBootApplication
public class PayrollApplication{
	public static void main(String... args) {
		SpringApplication.run(PayrollApplication.class, args);
	}

}
