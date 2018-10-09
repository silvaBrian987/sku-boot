package net.bgsystems.sku.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import net.bgsystems.util.ExceptionUtils;

//@ControllerAdvice
public class GlobalExceptionController {
	private static final Logger LOGGER = LogManager.getLogger(GlobalExceptionController.class);

	@ExceptionHandler(Exception.class)
	public @ResponseBody ResponseEntity<Object> handleException(HttpServletRequest req, HttpServletResponse res,
			Throwable t) {
		LOGGER.info(ExceptionUtils.getSimpleMessage(t, false));
		LOGGER.debug("", t);

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ExceptionUtils.customJsonError(t));
	}
}
