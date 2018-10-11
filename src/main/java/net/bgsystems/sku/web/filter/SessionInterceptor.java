package net.bgsystems.sku.web.filter;

import java.util.HashSet;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;

import net.bgsystems.sku.web.util.ApplicationRoles;
import net.bgsystems.util.web.User;

public class SessionInterceptor implements HandlerInterceptor {
	private static final Logger LOGGER = LogManager.getLogger(SessionInterceptor.class);

	@Resource(name = "sessionUser")
	private User sessionUser;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		loadUser(request);

		return HandlerInterceptor.super.preHandle(request, response, handler);
	}

	private void loadUser(HttpServletRequest request) throws Exception {
		if (!sessionUser.hasData()) {
			String userName = request.getUserPrincipal().getName();

			sessionUser.setName(userName);
			sessionUser.setRoles(getRoles(request));
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
