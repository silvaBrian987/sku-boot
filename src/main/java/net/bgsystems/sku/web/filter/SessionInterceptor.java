package net.bgsystems.sku.web.filter;

import java.util.HashSet;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;

import net.bgsystems.util.web.User;

public class SessionInterceptor implements HandlerInterceptor {
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	@Resource(name = "sessionUser")
	//@Autowired
	//@Qualifier("sessionUser")
	private User sessionUser;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		LOGGER.trace("Handling request...");
		loadUser(request);
		LOGGER.trace("User loaded!");
		return HandlerInterceptor.super.preHandle(request, response, handler);
	}

	private void loadUser(HttpServletRequest request) throws Exception {
		if (!sessionUser.hasData()) {
			LOGGER.trace("User has no data!");

			String userName = "anonymous";

			if(request.getUserPrincipal() != null) userName = request.getUserPrincipal().getName();


            LOGGER.trace("Current user: " + userName);

			sessionUser.setName(userName);
			sessionUser.setCostCenter("none");
			sessionUser.setRoles(getRoles(request));
		}else{
            LOGGER.trace("User has data!");
        }
	}

	private Set<String> getRoles(HttpServletRequest request) {
		Set<String> roles = new HashSet<>();



		return roles;
	}
}
