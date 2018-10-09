package net.bgsystems.sku.business.entity.generator;

import java.io.Serializable;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import net.bgsystems.sku.business.entity.Combo;
import net.bgsystems.sku.business.entity.ComboItem;

public class SkuGenerator implements IdentifierGenerator {

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		if (object instanceof Combo) {
			String sku = "";
			Combo combo = (Combo) object;
			sku += combo.getItemBase().getProducto().getSku();
			for (ComboItem item : combo.getItems()) {
				sku += item.getProducto().getSku();
			}
			return sku;
		}
		return null;
	}

}
