package net.bgsystems.sku.web.controller;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import net.bgsystems.sku.business.entity.Combo;
import net.bgsystems.sku.business.repository.ComboRepository;

@RestController
@RequestMapping("combo")
public class ComboController {
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ComboRepository comboRepository;

	@RequestMapping(path = "findAll", method = RequestMethod.GET)
	public ResponseEntity<List<Combo>> findAll() throws Exception {
		return ResponseEntity.ok(comboRepository.findAll());
	}

	@RequestMapping("save")
	public ResponseEntity<Combo> save(@RequestBody Combo combo) throws Exception {
		LOGGER.debug("Guardando combo " + combo);
		comboRepository.save(combo);
		return ResponseEntity.ok(combo);
	}
}
