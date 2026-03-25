/* login.js
   - Valida el login con usuarios simulados.
   - Guarda la sesión en localStorage.
   - Si ya hay sesión, manda directo al dashboard.
*/

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  // Si ya hay sesión guardada, no tiene sentido pedir login otra vez
  if (localStorage.getItem("hotel_session")) {
    window.location.href = "./dashboard/dashboard.html";
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validarLogin();
  });
});

// Usuarios simulados
const USERS = [
  { email: "admin@hotel.com", password: "Admin123", role: "admin", name: "Administrador" },
  { email: "recepcion@hotel.com", password: "Recep123", role: "staff", name: "Recepción" }
];

function validarLogin() {
  const emailInput = document.getElementById("email");
  const passInput = document.getElementById("password");
  const errorBox = document.getElementById("loginError");

  const email = (emailInput.value || "").trim().toLowerCase();
  const password = passInput.value || "";

  // Limpiar error anterior
  errorBox.textContent = "";

  // Validaciones simples
  if (!email || !password) {
    errorBox.textContent = "Por favor completa el correo y la contraseña.";
    return;
  }

  // Buscar usuario
  const user = USERS.find(u => u.email === email && u.password === password);

  if (!user) {
    errorBox.textContent = "Correo o contraseña incorrectos.";
    return;
  }

  // Crear “sesión”
  const session = {
    email: user.email,
    name: user.name,
    role: user.role,
    loginAt: new Date().toISOString()
  };

  // Guardar sesión
  localStorage.setItem("hotel_session", JSON.stringify(session));

  // Ir al dashboard
  window.location.href = "./dashboard/dashboard.html";
}