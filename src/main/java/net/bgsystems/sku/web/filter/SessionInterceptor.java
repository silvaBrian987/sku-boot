package net.bgsystems.sku.web.filter;

import java.util.HashSet;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;

import net.bgsystems.sku.web.util.ApplicationRoles;
import net.bgsystems.util.web.User;

public class SessionInterceptor implements HandlerInterceptor {
	private static final Logger LOGGER = LoggerFactory.getLogger(SessionInterceptor.class);

	@Resource(name = "sessionUser")
	private User sessionUser;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		LOGGER.debug("Handling request...");
		loadUser(request);
		LOGGER.debug("User loaded!");
		return HandlerInterceptor.super.preHandle(request, response, handler);
	}

	private void loadUser(HttpServletRequest request) throws Exception {
		if (!sessionUser.hasData()) {
			LOGGER.debug("User has no data!");
			String userName = request.getUserPrincipal().getName();

            LOGGER.debug("Current user: " + userName);

			sessionUser.setName(userName);
			sessionUser.setRoles(getRoles(request));
		}else{
            LOGGER.debug("User has data!");
        }
	}

	private Set<String> getRoles(HttpServletRequest request) {
		Set<String> roles = new HashSet<>();

		for (ApplicationRoles role : ApplicationRoles.values()) {
			String rolName = role.name();
			if (request.isUserInRole(rolName)) {
				roles.add(role.name());
			}
		}

		return roles;
	}
}
