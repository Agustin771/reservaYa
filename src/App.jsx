import { useEffect, useState } from "react";
import ProductDetail from "./pages/ProductDetail";
import AdminPanel from "./pages/AdminPanel";
import {
  obtenerProductos,
  crearProducto,
  eliminarProducto,
} from "./services/productos";
import {
  Search,
  Hotel,
  Plane,
  Shirt,
  CarFront,
  ArrowRight,
  Heart,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import "./App.css";

const categories = [
  { name: "Todos", icon: Search },
  { name: "Hoteles", icon: Hotel },
  { name: "Vuelos", icon: Plane },
  { name: "Moda", icon: Shirt },
  { name: "Autos", icon: CarFront },
];

function Header({ onHome }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function goHome() {
    setMenuOpen(false);
    onHome();
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          href="#inicio"
          className="brand"
          onClick={(event) => {
            event.preventDefault();
            goHome();
          }}
        >
          <span className="brand-logo">R</span>

          <span className="brand-text">
            <strong>ReservaYa</strong>
            <small>Tu próxima experiencia comienza aquí</small>
          </span>
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`header-actions ${menuOpen ? "open" : ""}`}>
          <button className="btn btn-outline" disabled>
            Crear cuenta
          </button>

          <button className="btn btn-primary" disabled>
            Iniciar sesión
          </button>
        </nav>
      </div>
    </header>
  );
}

function ProductCard({ product, onSelectProduct }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <article className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} />

        <span className="image-category">{product.category}</span>

        <button
          className={`favorite-btn ${favorite ? "favorite-active" : ""}`}
          onClick={() => setFavorite(!favorite)}
          aria-label={
            favorite ? "Quitar de favoritos" : "Marcar como favorito"
          }
        >
          <Heart
            size={19}
            fill={favorite ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="product-info">
        <div className="product-location">
          <MapPin size={15} />
          {product.location}
        </div>

        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-bottom">
          <div>
            <small>Precio de referencia</small>
            <strong>
              ${product.price.toLocaleString("es-AR")}
            </strong>
          </div>

          <button
            className="detail-btn"
            onClick={() => onSelectProduct(product)}
          >
            Ver detalle <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

function Footer({ onHome }) {
  return (
    <footer className="site-footer">
      <a
        href="#inicio"
        className="footer-brand"
        onClick={(event) => {
          event.preventDefault();
          onHome();
        }}
      >
        <span className="brand-logo">R</span>
        <strong>ReservaYa</strong>
      </a>

      <p>
        © {new Date().getFullYear()} ReservaYa. Todos los derechos reservados.
      </p>
    </footer>
  );
}

function App() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");

  useEffect(() => {
    let cancelled = false;

  async function loadProducts() {
    try {
      setLoadingProducts(true);
      setProductsError("");
    const data = await obtenerProductos();

    if (!Array.isArray(data)) {
      throw new Error("La API no devolvió una lista de productos.");
    }
  const productosAdaptados = data.map((producto) => {
  const images = Array.isArray(producto.images)
    ? producto.images.filter(Boolean)
    : [];

  const mainImage =
    producto.image ?? producto.imagen ?? images[0] ?? "";

  return {
    id: producto.id,
    name: producto.name ?? producto.nombre ?? "",
    category: producto.category ?? producto.categoria ?? "",
    location: producto.location ?? producto.ubicacion ?? "",
    price: Number(producto.price ?? producto.precio ?? 0),
    image: mainImage,
    images: images.length ? images : mainImage ? [mainImage] : [],
    description: producto.description ?? producto.descripcion ?? "",
  };
  });

    if (!cancelled) {
      setProducts(productosAdaptados);
    }
    } catch (error) {
      if (!cancelled) {
        setProductsError(
          "No pudimos cargar los productos desde el servidor. " +
          "Verificá que Spring Boot esté funcionando."
        );
        console.error("Error cargando productos:", error);
      }
    } finally {
      if (!cancelled) {
        setLoadingProducts(false);
      }
    }
  }

  loadProducts();

  return () => {
    cancelled = true;
  };
}, []);

  const pageSize = 10;

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "Todos" || product.category === category;

    const query = search.trim().toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.location.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const visibleProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  function selectCategory(name) {
    setCategory(name);
    setPage(1);
  }

  function updateSearch(value) {
    setSearch(value);
    setPage(1);
  }

  function openProduct(product) {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const recommendations = [...products]
  .sort((a, b) => a.id - b.id)
  .slice(0, 10);

  if (window.location.pathname.startsWith("/administracion")) {
    return (
      <AdminPanel
        products={products}
        onAddProduct={async (newProduct) => {
          const created = await crearProducto(newProduct);

        const images = Array.isArray(created.images) && created.images.length
    ? created.images
    : Array.isArray(newProduct.images)
      ? newProduct.images.filter(Boolean)
      : [];

const product = {
  id: created.id,
  name: created.name ?? created.nombre ?? newProduct.name,
  category:
    created.category ?? created.categoria ?? newProduct.category,
  location:
    created.location ?? created.ubicacion ?? newProduct.location,
  price: Number(
    created.price ?? created.precio ?? newProduct.price
  ),
  image:
    created.image ?? created.imagen ?? images[0] ?? newProduct.image,
  images,
  description:
    created.description ??
    created.descripcion ??
    newProduct.description,
};

        setProducts((current) => [...current, product]);
      }}
      onDeleteProduct={async (productId) => {
        await eliminarProducto(productId);

        setProducts((current) =>
          current.filter((product) => product.id !== productId)
        );
      }}
    />
  );
}

  if (selectedProduct) {
    return (
      <div id="inicio" className="app">
        <Header onHome={goHome} />

        <ProductDetail
          product={selectedProduct}
          onBack={goHome}
        />

        <Footer onHome={goHome} />
      </div>
    );
  }

  return (
    <div id="inicio" className="app">
      <Header onHome={goHome} />

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">
              DESCUBRÍ · EXPLORÁ · RESERVÁ
            </span>

            <h1>
              Tu próxima experiencia
              <span> empieza acá.</span>
            </h1>

            <p>
              Encontrá hoteles, viajes, moda y autos para disfrutar
              cada momento a tu manera.
            </p>

            <form
              className="search-box"
              onSubmit={(event) => {
                event.preventDefault();

                document
                  .getElementById("catalogo")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Search size={21} />

              <input
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
                placeholder="¿Qué estás buscando?"
                aria-label="Buscar productos"
              />

              <button className="btn btn-primary" type="submit">
                Buscar
              </button>
            </form>

            <div className="hero-trust">
              <span>✓ Experiencias únicas</span>
              <span>✓ Múltiples categorías</span>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1100&q=85"
              alt="Lago rodeado de montañas"
            />

            <div className="floating-card">
              <span className="floating-icon">✦</span>

              <div>
                <strong>El mundo te espera</strong>
                <small>¿Cuál será tu próximo destino?</small>
              </div>
            </div>
          </div>
        </section>

        <section className="section categories-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">ENCONTRÁ LO QUE BUSCÁS</span>
              <h2>Explorá por categoría</h2>
              <p>
                Todo lo que necesitás para tu próxima experiencia.
              </p>
            </div>
          </div>

          <div className="categories-grid">
            {categories.map(({ name, icon: Icon }) => (
              <button
                key={name}
                className={`category-card ${
                  category === name ? "category-active" : ""
                }`}
                onClick={() => {
                  selectCategory(name);

                  document
                    .getElementById("catalogo")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="category-icon">
                  <Icon size={25} />
                </span>

                <strong>{name}</strong>

                <span className="category-arrow">
                  <ArrowRight size={17} />
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="section catalog-section" id="catalogo">
          <div className="section-heading catalog-heading">
          <div>
            <span className="eyebrow">INSPIRACIÓN PARA VOS</span>

            <h2>
              {category === "Todos"
                ? "Descubrí nuevas experiencias"
                : category}
            </h2>

            <p>
              Encontramos {filteredProducts.length} propuestas para vos.
            </p>
          </div>

          <span className="results-badge">
            {filteredProducts.length} productos
          </span>
        </div>
            {loadingProducts ? (
            <div className="empty-state">
              <p>Cargando experiencias...</p>
            </div>
          ) : productsError ? (
            <div className="empty-state">
              <h3>No pudimos cargar los productos</h3>
              <p>{productsError}</p>
              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Reintentar
              </button>
            </div>
          ) : visibleProducts.length > 0 ? (
            <div className="products-grid">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={openProduct}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={32} />
              <h3>No encontramos resultados</h3>
              <p>
                Probá otra búsqueda o seleccioná una categoría diferente.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  updateSearch("");
                  selectCategory("Todos");
                }}
              >
                Ver todos los productos
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="btn btn-outline"
                disabled={page === 1}
                onClick={() => setPage(1)}
              >
                Inicio
              </button>

              <button
                className="page-arrow"
                disabled={page === 1}
                onClick={() => setPage((current) => current - 1)}
                aria-label="Página anterior"
              >
                ←
              </button>

              <span>
                Página <strong>{page}</strong> de {totalPages}
              </span>

              <button
                className="page-arrow"
                disabled={page === totalPages}
                onClick={() => setPage((current) => current + 1)}
                aria-label="Página siguiente"
              >
                →
              </button>
            </div>
          )}
        </section>

        <section className="recommendations section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SELECCIÓN ESPECIAL</span>
              <h2>Recomendados para vos</h2>
              <p>
                Dejá que te sorprendamos con nuevas ideas.
              </p>
            </div>
          </div>

          <div className="products-grid">
            {recommendations.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={openProduct}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer onHome={goHome} />
    </div>
  );
}

export default App;