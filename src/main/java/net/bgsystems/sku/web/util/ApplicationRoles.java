package net.bgsystems.sku.web.util;

public enum ApplicationRoles {
	ROLE_USER;
	
	public static String[] getRoles() {
		ApplicationRoles[] roles = values();
		String[] arrRoles = new String[roles.length];
		
		for(int i = 0; i < roles.length; i++)
			arrRoles[i] = roles[i].name();
		
		return arrRoles;
	}
}
