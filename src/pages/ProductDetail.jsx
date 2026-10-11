import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import "../App.css";

const demoImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=85",
];

export default function ProductDetail({ product, onBack }) {
  const [showGallery, setShowGallery] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [favorite, setFavorite] = useState(false);

  if (!product) {
    return (
      <main className="detail-not-found">
        <h2>Producto no encontrado</h2>
        <button className="btn btn-primary" onClick={onBack}>
          Volver al catálogo
        </button>
      </main>
    );
  }

  const images = product.images?.length
    ? product.images
    : [product.image, ...demoImages.slice(1)];

  function previousImage() {
    setActiveImage((current) => (current - 1 + images.length) % images.length);
  }

  function nextImage() {
    setActiveImage((current) => (current + 1) % images.length);
  }

  return (
    <main className="product-detail-page">
      <header className="detail-header">
        <div className="detail-header-inner">
          <div className="detail-heading">
            <span className="detail-category">{product.category}</span>
            <h1>{product.name}</h1>
          </div>

          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={18} />
            Volver
          </button>
        </div>
      </header>

      <div className="detail-content">
        <div className="detail-location">
          <MapPin size={18} />
          {product.location}
        </div>

        <section className="detail-gallery" aria-label="Galería del producto">
          <button
            className="gallery-main"
            onClick={() => {
              setActiveImage(0);
              setShowGallery(true);
            }}
            aria-label="Ver imagen principal"
          >
            <img src={images[0]} alt={`${product.name}, imagen 1`} />
          </button>

          <div className="gallery-side">
            {images.slice(1, 5).map((image, index) => (
              <button
                className="gallery-thumb"
                key={`${image}-${index}`}
                onClick={() => {
                  setActiveImage(index + 1);
                  setShowGallery(true);
                }}
                aria-label={`Ver imagen ${index + 2}`}
              >
                <img
                  src={image}
                  alt={`${product.name}, imagen ${index + 2}`}
                />
                {index === 3 && (
                  <span className="gallery-more">
                    Ver más <span>＋</span>
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="detail-information">
          <div className="detail-description">
            <span className="eyebrow">CONOCÉ MÁS</span>
            <h2>Acerca de esta experiencia</h2>
            <p>{product.description}</p>
            <p>
              Descubrí todos los detalles de esta propuesta y preparate
              para disfrutar de tu próxima experiencia con ReservaYa.
            </p>
          </div>

          <aside className="detail-price-card">
            <button
              className={`detail-favorite ${favorite ? "favorite-active" : ""}`}
              onClick={() => setFavorite(!favorite)}
            >
              <Heart size={19} fill={favorite ? "currentColor" : "none"} />
              {favorite ? "Guardado" : "Guardar favorito"}
            </button>

            <span className="detail-price-label">Precio de referencia</span>
            <strong className="detail-price">
              ${Number(product.price).toLocaleString("es-AR")}
            </strong>
            <p>El precio final dependerá de la disponibilidad del servicio.</p>

            <button
              className="btn btn-primary detail-reserve-btn"
              onClick={() =>
                alert("Próximamente: disponibilidad y proceso de reserva.")
              }
            >
              Consultar disponibilidad
            </button>
          </aside>
        </section>
      </div>

      {showGallery && (
        <div
          className="gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Galería de imágenes"
          onClick={() => setShowGallery(false)}
        >
          <button
            className="gallery-close"
            onClick={() => setShowGallery(false)}
            aria-label="Cerrar galería"
          >
            <X size={26} />
          </button>

          <span className="gallery-counter">
            {activeImage + 1} / {images.length}
          </span>

          <button
            className="gallery-navigation gallery-previous"
            onClick={(event) => {
              event.stopPropagation();
              previousImage();
            }}
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={30} />
          </button>

          <img
            className="gallery-modal-image"
            src={images[activeImage]}
            alt={`${product.name}, imagen ${activeImage + 1}`}
            onClick={(event) => event.stopPropagation()}
          />

          <button
            className="gallery-navigation gallery-next"
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            aria-label="Imagen siguiente"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      )}
    </main>
  );
}