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

import net.bgsystems.sku.business.entity.ComboItem;
import net.bgsystems.sku.business.repository.ComboItemRepository;

@RestController
@RequestMapping("comboItem")
public class ComboItemController {
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private ComboItemRepository comboItemRespository;

	@RequestMapping(path = "findAll", method = RequestMethod.GET)
	public ResponseEntity<List<ComboItem>> findAll() throws Exception {
		return ResponseEntity.ok(comboItemRespository.findAll());
	}

	@RequestMapping("save")
	public ResponseEntity<ComboItem> save(@RequestBody ComboItem comboItem) throws Exception {
		LOGGER.debug("Guardando comboItem " + comboItem);
		comboItemRespository.save(comboItem);
		return ResponseEntity.ok(comboItem);
	}
}
