import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ArrowLeft,
  Menu,
  X,
  ShieldCheck,
  Trash2,
  Search,
  ArrowUpLeft,
  MapPin,
  Pencil,
} from "lucide-react";
import "./AdminPanel.css";

const EMPTY_FORM = {
  name: "",
  category: "Hoteles",
  location: "",
  price: "",
  images: [""],
  description: "",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80";

export default function AdminPanel({
  products = [],
  onAddProduct,
  onDeleteProduct,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const isProductList = currentPath === "/administracion/productos";
  const isNewProduct = currentPath === "/administracion/productos/nuevo";

  const filteredProducts = products.filter((product) =>
    String(product.name ?? "")
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function updateImage(index, value) {
    setForm((current) => {
      const images = [...current.images];
      images[index] = value;

      return {
        ...current,
        images,
        image: images[0] || "",
      };
    });
  }

  function addImageField() {
    setForm((current) => ({
      ...current,
      images: [...current.images, ""],
    }));
  }

  function removeImageField(index) {
    setForm((current) => {
      const images = current.images.filter((_, i) => i !== index);

      return {
        ...current,
        images: images.length ? images : [""],
        image: images[0] || "",
      };
    });
  }

  async function handleCreateProduct(event) {
    event.preventDefault();
    setFormError("");

    const name = form.name.trim();
    const location = form.location.trim();
    const description = form.description.trim();
    const price = Number(form.price);

    if (!name || !location || !description || form.price.trim() === "") {
      setFormError("Completá todos los campos obligatorios.");
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      setFormError("Ingresá un precio válido, igual o mayor a cero.");
      return;
    }

    const images = form.images
      .map((url) => url.trim())
      .filter(Boolean);

    if (images.length === 0) {
      setFormError("Agregá al menos una imagen.");
      return;
    }

    for (const image of images) {
      try {
        const parsedUrl = new URL(image);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          throw new Error("URL inválida");
        }
      } catch {
        setFormError("Revisá las URL de las imágenes.");
        return;
      }
    }

    if (!onAddProduct) {
      setFormError("La función para guardar productos no está conectada.");
      return;
    }

    try {
      setSaving(true);

      await onAddProduct({
        name,
        category: form.category,
        location,
        price,
        image: images[0],
        images,
        description,
      });

      setForm(EMPTY_FORM);
      window.location.href = "/administracion/productos";
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "No se pudo guardar el producto."
      );
    } finally {
      setSaving(false);
    }
  }

  function handleDelete(product) {
    const confirmed = window.confirm(
      `¿Seguro que querés eliminar "${product.name}"?\n\nEsta acción no se puede deshacer.`
    );

    if (confirmed) {
      onDeleteProduct?.(product.id);
    }
  }

  return (
    <div className="admin-layout">
      <aside
        className={`admin-sidebar ${
          menuOpen ? "admin-sidebar-open" : ""
        }`}
      >
        <a className="admin-brand" href="/">
          <span className="admin-brand-logo">R</span>
          <span>
            <strong>ReservaYa</strong>
            <small>Administración</small>
          </span>
        </a>

        <div className="admin-menu-label">MENÚ PRINCIPAL</div>

        <nav className="admin-nav">
          <a
            className={`admin-nav-link ${
              !isProductList && !isNewProduct ? "admin-nav-active" : ""
            }`}
            href="/administracion"
            onClick={() => setMenuOpen(false)}
          >
            <LayoutDashboard size={19} />
            <span>Panel principal</span>
          </a>

          <a
            className={`admin-nav-link ${
              isProductList ? "admin-nav-active" : ""
            }`}
            href="/administracion/productos"
            onClick={() => setMenuOpen(false)}
          >
            <Package size={19} />
            <span>Lista de productos</span>
          </a>

          <a
            className={`admin-nav-link ${
              isNewProduct ? "admin-nav-active" : ""
            }`}
            href="/administracion/productos/nuevo"
            onClick={() => setMenuOpen(false)}
          >
            <PlusCircle size={19} />
            <span>Agregar producto</span>
          </a>
        </nav>

        <a className="admin-back-home" href="/">
          <ArrowLeft size={18} />
          Volver al sitio
        </a>
      </aside>

      {menuOpen && (
        <button
          className="admin-mobile-overlay"
          aria-label="Cerrar menú"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <main className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <div>
            <span className="admin-topbar-label">
              RESERVAYA / ADMINISTRACIÓN
            </span>

            <h1>
              {isProductList
                ? "Lista de productos"
                : isNewProduct
                ? "Agregar producto"
                : "Panel de administración"}
            </h1>
          </div>

          <span className="admin-status">
            <span className="admin-status-dot" />
            Administración
          </span>
        </header>

        {isProductList ? (
          <section className="admin-section admin-product-list">
            <div className="admin-list-heading">
              <div>
                <span className="admin-eyebrow">CATÁLOGO</span>
                <h2>Productos registrados</h2>
                <p>Consultá y gestioná los productos de ReservaYa.</p>
              </div>

              <a
                className="admin-add-button"
                href="/administracion/productos/nuevo"
              >
                <PlusCircle size={18} />
                Agregar producto
              </a>
            </div>

            <div className="admin-list-toolbar">
              <label className="admin-search">
                <Search size={18} />
                <input
                  type="search"
                  placeholder="Buscar por nombre..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>

              <span className="admin-product-count">
                {filteredProducts.length} de {products.length} productos
              </span>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Ubicación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="admin-id">#{product.id}</td>

                      <td>
                        <div className="admin-product-cell">
                          <img
                            src={product.image || DEFAULT_IMAGE}
                            alt=""
                            className="admin-product-thumb"
                          />

                          <div>
                            <strong>{product.name}</strong>
                            <small>
                              $
                              {Number(product.price || 0).toLocaleString(
                                "es-AR"
                              )}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="admin-category-pill">
                          {product.category}
                        </span>
                      </td>

                      <td>
                        <span className="admin-location">
                          <MapPin size={14} />
                          {product.location}
                        </span>
                      </td>

                      <td>
                        <div className="admin-row-actions">
                          <button
                            type="button"
                            className="admin-edit-button"
                            title="Edición pendiente"
                            aria-label={`Editar ${product.name}`}
                            onClick={() =>
                              window.alert(
                                "La edición todavía no está implementada."
                              )
                            }
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            className="admin-delete-button"
                            title="Eliminar producto"
                            aria-label={`Eliminar ${product.name}`}
                            onClick={() => handleDelete(product)}
                          >
                            <Trash2 size={16} />
                            <span>Eliminar</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <div className="admin-empty-state">
                  <Package size={36} />
                  <h3>No encontramos productos</h3>
                  <p>
                    {search
                      ? "Probá con otro nombre."
                      : "Todavía no hay productos registrados."}
                  </p>

                  {search && (
                    <button
                      className="admin-secondary-button"
                      onClick={() => setSearch("")}
                    >
                      Limpiar búsqueda
                    </button>
                  )}
                </div>
              )}
            </div>

            <a className="admin-list-back" href="/administracion">
              <ArrowUpLeft size={17} />
              Volver al panel
            </a>
          </section>
        ) : isNewProduct ? (
          <section className="admin-section admin-form-section">
            <div className="admin-list-heading">
              <div>
                <span className="admin-eyebrow">CATÁLOGO</span>
                <h2>Nuevo producto</h2>
                <p>
                  Completá los datos para agregar una nueva experiencia a ReservaYa.
                </p>
              </div>
            </div>

            <form
              className="admin-product-form"
              onSubmit={handleCreateProduct}
            >
              <div className="admin-form-grid">
                <label className="admin-field">
                  Nombre del producto *
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    placeholder="Ej. Hotel Boutique Palermo"
                    maxLength={120}
                    required
                  />
                </label>

                <label className="admin-field">
                  Categoría *
                  <select
                    name="category"
                    value={form.category}
                    onChange={updateField}
                    required
                  >
                    <option value="Hoteles">Hoteles</option>
                    <option value="Vuelos">Vuelos</option>
                    <option value="Moda">Moda</option>
                    <option value="Autos">Autos</option>
                  </select>
                </label>

                <label className="admin-field">
                  Ubicación *
                  <input
                    name="location"
                    value={form.location}
                    onChange={updateField}
                    placeholder="Ej. Palermo, Buenos Aires"
                    maxLength={180}
                    required
                  />
                </label>

                <label className="admin-field">
                  Precio de referencia (ARS) *
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={updateField}
                    placeholder="85000"
                    required
                  />
                </label>

                <div className="admin-field admin-field-full">
                  <label>Imágenes del producto *</label>

                  <span className="admin-field-help">
                    Pegá una URL pública por imagen. La primera será la imagen principal.
                  </span>

                  <div className="admin-images-form-list">
                    {form.images.map((image, index) => (
                      <div className="admin-image-input-row" key={index}>
                        <input
                          type="url"
                          value={image}
                          onChange={(event) =>
                            updateImage(index, event.target.value)
                          }
                          placeholder={`https://ejemplo.com/imagen-${index + 1}.jpg`}
                          aria-label={`URL de imagen ${index + 1}`}
                          required={index === 0}
                        />

                        {form.images.length > 1 && (
                          <button
                            type="button"
                            className="admin-remove-image"
                            onClick={() => removeImageField(index)}
                            aria-label={`Eliminar imagen ${index + 1}`}
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="admin-secondary-button admin-add-image"
                    onClick={addImageField}
                  >
                    <PlusCircle size={17} />
                    Agregar otra imagen
                  </button>
                </div>

                <label className="admin-field admin-field-full">
                  Descripción *
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={updateField}
                    placeholder="Describí el producto o la experiencia..."
                    maxLength={1000}
                    rows={5}
                    required
                  />
                </label>
              </div>

              {formError && (
                <p className="admin-form-message admin-form-error" role="alert">
                  {formError}
                </p>
              )}

              <div className="admin-form-actions">
                <a
                  className="admin-cancel-button"
                  href="/administracion/productos"
                >
                  Cancelar
                </a>

                <button
                  className="admin-add-button"
                  type="submit"
                  disabled={saving}
                >
                  <PlusCircle size={18} />
                  {saving ? "Guardando..." : "Guardar producto"}
                </button>
              </div>
            </form>
          </section>
        ) : (
          <>
            <section className="admin-welcome">
              <span className="admin-eyebrow">CENTRO DE GESTIÓN</span>
              <h2>¡Bienvenido a ReservaYa!</h2>
              <p>
                Administrá los productos que se muestran en el catálogo
                de tu aplicación desde un único lugar.
              </p>
            </section>

            <section className="admin-section">
              <div className="admin-section-heading">
                <h2>Gestión de productos</h2>
                <p>Seleccioná una opción para continuar.</p>
              </div>

              <div className="admin-actions-grid">
                <a
                  className="admin-action-card"
                  href="/administracion/productos"
                >
                  <span className="admin-action-icon">
                    <Package size={25} />
                  </span>
                  <h3>Lista de productos</h3>
                  <p>Consultá los productos del catálogo.</p>
                  <span className="admin-action-link">
                    Ver productos →
                  </span>
                  <span className="admin-card-count">
                    {products.length} productos registrados
                  </span>
                </a>

                <a
                  className="admin-action-card"
                  href="/administracion/productos/nuevo"
                >
                  <span className="admin-action-icon">
                    <PlusCircle size={25} />
                  </span>
                  <h3>Agregar producto</h3>
                  <p>Completá el formulario de alta.</p>
                  <span className="admin-action-link">
                    Crear producto →
                  </span>
                </a>
              </div>
            </section>
          </>
        )}

        <footer className="admin-footer">
          ReservaYa · Panel de administración
        </footer>
      </main>
    </div>
  );
}