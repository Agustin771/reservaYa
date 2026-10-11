import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ArrowLeft,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import "./AdminPanel.css";

export default function AdminPanel() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Esta comprobación es visual; no reemplaza la seguridad del backend.
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;

  if (isMobile) {
    return (
      <main className="admin-mobile-message">
        <ShieldCheck size={48} />
        <h1>ReservaYa Administración</h1>
        <p>
          El panel de administración no está disponible en
          dispositivos móviles. Ingresá desde una computadora.
        </p>
        <a href="/">Volver al inicio</a>
      </main>
    );
  }

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${menuOpen ? "admin-sidebar-open" : ""}`}>
        <a className="admin-brand" href="/">
          <span className="admin-brand-logo">R</span>
          <span>
            <strong>ReservaYa</strong>
            <small>Administración</small>
          </span>
        </a>

        <div className="admin-menu-label">MENÚ PRINCIPAL</div>

        <nav className="admin-nav">
          <a className="admin-nav-link admin-nav-active" href="/administracion">
            <LayoutDashboard size={19} />
            <span>Panel principal</span>
          </a>

          <a className="admin-nav-link" href="/administracion/productos">
            <Package size={19} />
            <span>Lista de productos</span>
          </a>

          <a className="admin-nav-link" href="/administracion/productos/nuevo">
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
            <span className="admin-topbar-label">RESERVAYA / ADMINISTRACIÓN</span>
            <h1>Panel de administración</h1>
          </div>

          <span className="admin-status">
            <span className="admin-status-dot" />
            Modo demostración
          </span>
        </header>

        <section className="admin-welcome">
          <span className="admin-eyebrow">CENTRO DE GESTIÓN</span>
          <h2>¡Bienvenido a ReservaYa!</h2>
          <p>
            Desde acá vas a poder administrar los productos que se
            muestran en el catálogo de tu aplicación.
          </p>
        </section>

        <section className="admin-section">
          <div className="admin-section-heading">
            <div>
              <h2>Gestión de productos</h2>
              <p>Seleccioná una opción para continuar.</p>
            </div>
          </div>

          <div className="admin-actions-grid">
            <a className="admin-action-card" href="/administracion/productos">
              <span className="admin-action-icon">
                <Package size={25} />
              </span>
              <h3>Lista de productos</h3>
              <p>Consultá los productos disponibles en el catálogo.</p>
              <span className="admin-action-link">Ver productos →</span>
            </a>

            <a
              className="admin-action-card"
              href="/administracion/productos/nuevo"
            >
              <span className="admin-action-icon">
                <PlusCircle size={25} />
              </span>
              <h3>Agregar producto</h3>
              <p>Prepará el alta de nuevos productos para ReservaYa.</p>
              <span className="admin-action-link">Crear producto →</span>
            </a>
          </div>
        </section>

        <footer className="admin-footer">
          ReservaYa · Panel de administración
        </footer>
      </main>
    </div>
  );
}