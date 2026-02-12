self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Recordatorio";
  const options = {
    body: data.body || "Tienes una toma pendiente.",
    icon: "/pill-placeholder.svg",
    badge: "/pill-placeholder.svg",
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
