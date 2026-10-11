import { useState } from "react";
import ProductDetail from "./pages/ProductDetail";
import AdminPanel from "./pages/AdminPanel";
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

const initialProducts = [
  {
    id: 1,
    name: "Hotel Boutique Palermo",
    category: "Hoteles",
    location: "Palermo, Buenos Aires",
    price: 85000,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    description: "Confort, diseño y una experiencia única.",
  },
  {
    id: 2,
    name: "Escapada a Bariloche",
    category: "Vuelos",
    location: "Bariloche, Argentina",
    price: 180000,
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80",
    description: "Descubrí paisajes increíbles en la Patagonia.",
  },
  {
    id: 3,
    name: "Moda urbana",
    category: "Moda",
    location: "Buenos Aires, Argentina",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    description: "Encontrá tu próximo look favorito.",
  },
  {
    id: 4,
    name: "SUV para viajar",
    category: "Autos",
    location: "Buenos Aires, Argentina",
    price: 95000,
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
    description: "Espacio y comodidad para tu próximo viaje.",
  },
  {
    id: 5,
    name: "Hotel frente al mar",
    category: "Hoteles",
    location: "Mar del Plata, Argentina",
    price: 72000,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
    description: "Despertate con vistas al océano.",
  },
  {
    id: 6,
    name: "Aventura en la montaña",
    category: "Vuelos",
    location: "Mendoza, Argentina",
    price: 135000,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    description: "Una experiencia para los amantes de la naturaleza.",
  },
  {
    id: 7,
    name: "Colección elegante",
    category: "Moda",
    location: "Buenos Aires, Argentina",
    price: 32000,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
    description: "Estilo y elegancia para cada ocasión.",
  },
  {
    id: 8,
    name: "Auto para escapadas",
    category: "Autos",
    location: "Tigre, Buenos Aires",
    price: 65000,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    description: "Prepará tu próxima aventura sobre ruedas.",
  },
  {
    id: 9,
    name: "Resort con piscina",
    category: "Hoteles",
    location: "Córdoba, Argentina",
    price: 110000,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80",
    description: "Relajación y comodidad para desconectar.",
  },
  {
    id: 10,
    name: "Look de temporada",
    category: "Moda",
    location: "Buenos Aires, Argentina",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
    description: "Renová tu estilo con nuevas propuestas.",
  },
  {
    id: 11,
    name: "Escapada a la naturaleza",
    category: "Hoteles",
    location: "Patagonia, Argentina",
    price: 92000,
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80",
    description: "Descanso rodeado de paisajes naturales.",
  },
  {
    id: 12,
    name: "Viaje entre montañas",
    category: "Vuelos",
    location: "Salta, Argentina",
    price: 145000,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    description: "Conocé nuevos destinos y culturas.",
  },
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
  const [products, setProducts] = useState(initialProducts);

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

  const [recommendations] = useState(() => {
    const shuffled = [...products];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, 10);
  });

if (window.location.pathname.startsWith("/administracion")) {
  return (
    <AdminPanel
      products={products}
      onDeleteProduct={(productId) => {
        setProducts((currentProducts) =>
          currentProducts.filter((product) => product.id !== productId)
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

          {visibleProducts.length > 0 ? (
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