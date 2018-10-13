package net.bgsystems.sku.web.util;

import net.bgsystems.util.web.User;

public class MyUser extends User {
    @Override
    public boolean hasData() {
        return getName() != null;
    }
}
