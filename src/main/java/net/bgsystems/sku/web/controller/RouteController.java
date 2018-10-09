package net.bgsystems.sku.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RouteController {
//	@GetMapping("/{path:[^\\.]*}")
//	public String redirect() {
//		return "forward:/";
//	}

	@GetMapping({ "/", "/index" })
	String getView(Model model) {
		// model.addAttribute("msg", "Hello there, This message has been injected from
		// the controller method");
		return "index";
	}
}
