package com.docker.atsea.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.docker.atsea.model.Customer;
import com.docker.atsea.model.Order;
import com.docker.atsea.model.Product;
import com.docker.atsea.repositories.CustomerRepository;
import com.docker.atsea.repositories.OrderRepository;
import com.docker.atsea.repositories.ProductRepository;
import com.docker.atsea.service.CustomerServiceImpl;
import com.docker.atsea.service.OrderServiceImpl;
import com.docker.atsea.service.ProductServiceImpl;

@ExtendWith(MockitoExtension.class)
class UnitTest {

	@Mock
	CustomerRepository customerRepository;

	@InjectMocks
	CustomerServiceImpl customerService;

	@Mock
	ProductRepository productRepository;

	@InjectMocks
	ProductServiceImpl productService;

	@Mock
	OrderRepository orderRepository;

	@InjectMocks
	OrderServiceImpl orderService;

	// Mock customer
	public Customer returnCustomer = new Customer(1L, "Arthur Dent", "Dockerland", "ad@null.com", "415-555-5555",
			"arthurd", "docker!", true, "ADMIN");

	// Mock product
	public Product returnProduct = new Product(1L, "Container", "container picture", 25.50, "http://localhost:8080/atsea/static/images/container.jpg");

	// Mock order
	public Date orderDate = new Date();
	private static Map<Integer, Integer> productsOrdered;
	static {
		productsOrdered = new HashMap<>();
		productsOrdered.put(2, 4);
		productsOrdered.put(3, 9);
		productsOrdered.put(4, 16);
	}
	public Order referenceOrder = new Order(1L, orderDate, 2L, productsOrdered);

	@Test
	void whenCustomerUserNameIsProvided_theReturnedNameIsCorrect() {
		when(customerRepository.findByUserName("arthurd")).thenReturn(returnCustomer);
		assertEquals("Arthur Dent", customerService.findByUserName("arthurd").getName());
	}

	@Test
	void whenProductIdIsProvided_theReturnedDescriptionIsCorrect() {
		when(productRepository.findById(1L)).thenReturn(Optional.of(returnProduct));
		assertEquals("container picture", productService.findById(1L).getDescription());
	}

	@Test
	void whenOrderFindById_theReferenceOrderIsReturned() {
		when(orderRepository.findById(1L)).thenReturn(Optional.of(referenceOrder));
		assertSame(referenceOrder, orderService.findById(1L));
	}
}
