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

export default function AdminPanel({ products = [], onDeleteProduct }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const currentPath = window.location.pathname;
  const isProductList = currentPath === "/administracion/productos";
  const isNewProduct = currentPath === "/administracion/productos/nuevo";

  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  function handleDelete(product) {
    const confirmed = window.confirm(
      `¿Seguro que querés eliminar "${product.name}"?\n\nEsta acción no se puede deshacer en esta sesión.`
    );

    if (confirmed) {
      onDeleteProduct?.(product.id);
    }
  }

  if (isMobile) {
    return (
      <main className="admin-mobile-message">
        <ShieldCheck size={48} />
        <h1>ReservaYa Administración</h1>
        <p>
          El panel de administración no está disponible en dispositivos
          móviles. Ingresá desde una computadora.
        </p>
        <a href="/">Volver al inicio</a>
      </main>
    );
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
          >
            <LayoutDashboard size={19} />
            <span>Panel principal</span>
          </a>

          <a
            className={`admin-nav-link ${
              isProductList ? "admin-nav-active" : ""
            }`}
            href="/administracion/productos"
          >
            <Package size={19} />
            <span>Lista de productos</span>
          </a>

          <a
            className={`admin-nav-link ${
              isNewProduct ? "admin-nav-active" : ""
            }`}
            href="/administracion/productos/nuevo"
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

      <main className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
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
            Modo demostración
          </span>
        </header>

        {isProductList ? (
          <section className="admin-section admin-product-list">
            <div className="admin-list-heading">
              <div>
                <span className="admin-eyebrow">CATÁLOGO</span>
                <h2>Productos registrados</h2>
                <p>
                  Consultá y gestioná los productos de ReservaYa.
                </p>
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
                            src={product.image}
                            alt=""
                            className="admin-product-thumb"
                          />
                          <div>
                            <strong>{product.name}</strong>
                            <small>
                              ${product.price.toLocaleString("es-AR")}
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
                            title="Editar (próximamente)"
                            aria-label={`Editar ${product.name}`}
                            onClick={() =>
                              window.alert(
                                "La edición de productos estará disponible en una próxima etapa."
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
                    Probá con otro nombre o revisá si hay productos
                    registrados.
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
          <section className="admin-placeholder">
            <span className="admin-action-icon">
              <PlusCircle size={28} />
            </span>
            <h2>Alta de productos</h2>
            <p>
              En el siguiente paso construiremos el formulario para
              registrar productos, validar nombres y cargar imágenes.
            </p>
            <a
              className="admin-secondary-button"
              href="/administracion/productos"
            >
              Volver al listado
            </a>
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
                  <p>
                    Consultá los productos disponibles en el catálogo.
                  </p>
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
                  <p>
                    Prepará el alta de nuevos productos para ReservaYa.
                  </p>
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