package net.bgsystems.sku.business.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import net.bgsystems.sku.business.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
	List<Producto> findByNombre(String name);
}
