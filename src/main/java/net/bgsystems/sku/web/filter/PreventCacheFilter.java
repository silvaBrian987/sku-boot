package net.bgsystems.sku.web.filter;

import java.io.IOException;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;

import net.bgsystems.util.HTTPUtils;

@WebFilter("/*")
public class PreventCacheFilter implements Filter {
	private static final Logger LOGGER = Logger.getLogger(PreventCacheFilter.class.getName());

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		LOGGER.info("Filter initialized");
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		if (response != null) {
			HttpServletResponse resp = (HttpServletResponse) response;
			Map<String, String> noCacheHeaders = HTTPUtils.getNoCacheHeaders();

			noCacheHeaders.putAll(HTTPUtils.getCORSHeaders());
			for (String key : noCacheHeaders.keySet()) {
				resp.setHeader(key, (String) noCacheHeaders.get(key));
			}
		}
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
		LOGGER.info("Filter destroyed");
	}

}
