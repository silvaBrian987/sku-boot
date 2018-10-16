package net.bgsystems.sku.web.controller;

import net.bgsystems.sku.business.entity.Combo;
import net.bgsystems.sku.business.repository.ComboRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("combo")
public class ComboController {
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ComboRepository comboRepository;

    @GetMapping("findAll")
	public ResponseEntity<List<Combo>> findAll() throws Exception {
		return ResponseEntity.ok(comboRepository.findAll());
	}

    @PostMapping("save")
	public ResponseEntity<Combo> save(@RequestBody Combo combo) throws Exception {
		LOGGER.debug("Guardando combo " + combo);
		comboRepository.save(combo);
		return ResponseEntity.ok(combo);
	}
}
