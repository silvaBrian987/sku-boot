package net.bgsystems.sku.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import net.bgsystems.util.ExceptionUtils;

@ControllerAdvice
public class GlobalExceptionController {
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	@ExceptionHandler(Exception.class)
	public @ResponseBody ResponseEntity<Object> handleException(HttpServletRequest req, HttpServletResponse res,
			Throwable t) {
		LOGGER.info(ExceptionUtils.getSimpleMessage(t, false));
		LOGGER.debug("", t);

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ExceptionUtils.customJsonError(t));
	}
}
