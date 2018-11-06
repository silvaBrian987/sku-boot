package net.bgsystems.sku.business.service;

import net.bgsystems.sku.business.entity.Combo;
import net.bgsystems.sku.business.entity.ComboItem;
import net.bgsystems.sku.business.repository.ComboRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComboService {
    @Autowired
    private ComboRepository comboRepository;

    public void generateSKU(Combo combo) {

        if(combo.getSku() != null || !combo.getSku().isEmpty())
            return;

        String sku = "";
        sku += combo.getItemBase().getProducto().getSku();
        for (ComboItem item : combo.getItems()) {
            sku += item.getProducto().getSku();
        }
        combo.setSku(sku);
    }
}
