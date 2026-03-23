/* main.js
   - Este script se usa en TODAS las páginas.
   - Su trabajo es: revisar si hay sesión y cambiar el botón del navbar.
*/

document.addEventListener("DOMContentLoaded", () => {
  actualizarBotonNavbar();
});

/* Cambia el botón del navbar según haya sesión o no */
function actualizarBotonNavbar() {
  // Intentamos encontrar el link del login por ID (ideal)
  let boton = document.getElementById("navAuth");

  // Si no existe por ID, lo buscamos por clase (por si se te olvida el id)
  if (!boton) {
    boton = document.querySelector("a.btn-login");
  }

  // Si igual no existe, no hacemos nada
  if (!boton) return;

  // Leer la sesión del localStorage
  const sessionRaw = localStorage.getItem("hotel_session");

  // CASO 1: No hay sesión
  if (!sessionRaw) {
    boton.textContent = "Iniciar Sesión";
    boton.href = rutaCorrecta("login");
    boton.onclick = null; // quitamos eventos anteriores por si acaso
    return;
  }

  // CASO 2: Sí hay sesión
  const session = JSON.parse(sessionRaw);

  boton.textContent = `Cerrar sesión (${session.name})`;
  boton.href = "#";

  // Al hacer click: borrar sesión y volver al inicio
  boton.onclick = (e) => {
    e.preventDefault();
    localStorage.removeItem("hotel_session");
    window.location.href = rutaCorrecta("inicio");
  };
}

/* 
  Esta función devuelve la ruta correcta dependiendo
  de si estás en la raíz, /pages/ o /dashboard/
*/
function rutaCorrecta(destino) {
  const path = window.location.pathname;

  // Si estoy dentro de /pages/ o /dashboard/ uso ../
  const estoyEnSubcarpeta = path.includes("/pages/") || path.includes("/dashboard/");

  if (destino === "login") {
    return estoyEnSubcarpeta ? "../login.html" : "login.html";
  }

  // destino === "inicio"
  return estoyEnSubcarpeta ? "../index.html" : "index.html";
}