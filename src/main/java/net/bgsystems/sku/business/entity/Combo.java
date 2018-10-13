package net.bgsystems.sku.business.entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table
public class Combo implements Serializable {
	@Id
	@Basic(optional = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@GenericGenerator(name = "sku", strategy = "net.bgsystems.sku.business.entity.generator.SkuGenerator")
	@GeneratedValue(generator = "sku")
	@Column(name = "sku")
	private String sku;
	@Column
	private String nombre;
	@OneToOne(cascade = CascadeType.ALL)
	private ComboItem itemBase;
	@ManyToMany(cascade = CascadeType.ALL)
	private Set<ComboItem> items;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public ComboItem getItemBase() {
		return itemBase;
	}

	public void setItemBase(ComboItem itemBase) {
		this.itemBase = itemBase;
	}

	public Set<ComboItem> getItems() {
		return items;
	}

	public void setItems(Set<ComboItem> items) {
		this.items = items;
	}
}
