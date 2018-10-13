package net.bgsystems.sku.web.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ProductoRepository productoRepository;
	
	@GetMapping("search")
	public ResponseEntity<List<Producto>> search(@RequestParam String name) throws Exception {
		return ResponseEntity.ok(productoRepository.findByNombreContaining(name));
	}

	@GetMapping("findAll")
	public ResponseEntity<List<Producto>> findAll() throws Exception {
		return ResponseEntity.ok(productoRepository.findAll());
	}

	@PostMapping("save")
	public ResponseEntity<Producto> save(@RequestBody Producto producto) throws Exception {
		LOGGER.debug("Guardando producto " + producto);
		productoRepository.save(producto);
		return ResponseEntity.ok(producto);
	}

}
