package net.bgsystems.sku.web.controller;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.bgsystems.sku.business.entity.Producto;
import net.bgsystems.sku.business.repository.ProductoRepository;

@RestController
@RequestMapping("producto")
public class ProductoController {
	private static final Logger LOGGER = LogManager.getLogger(ProductoController.class);

	@Autowired
	private ProductoRepository productoRepository;
	
	@GetMapping("search")
	public ResponseEntity<List<Producto>> search(@RequestParam String name) throws Exception {
		return ResponseEntity.ok(productoRepository.findByNombre(name));
	}

	@GetMapping("findAll")
	public ResponseEntity<List<Producto>> findAll() throws Exception {
		return ResponseEntity.ok(productoRepository.findAll());
	}

	@PostMapping("save")
	public ResponseEntity<Producto> save(@RequestBody Producto producto) throws Exception {
		LOGGER.debug(producto);
		productoRepository.save(producto);
		return ResponseEntity.ok(producto);
	}

}
