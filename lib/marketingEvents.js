const GOOGLE_ADS_ID = "AW-17972132760";

function safeWindow() {
  return typeof window !== "undefined" ? window : null;
}

function pushDataLayer(event, payload = {}) {
  const w = safeWindow();
  if (!w) return;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...payload });
}

function trackGoogleAdsConversion(label, payload = {}) {
  const w = safeWindow();
  if (!w || typeof w.gtag !== "function" || !label) return;
  w.gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${label}`, ...payload });
}

function trackMeta(eventName, payload = {}) {
  const w = safeWindow();
  if (!w || typeof w.fbq !== "function") return;
  w.fbq("track", eventName, payload);
}

export function trackTrialSignup({ source = "unknown", lang = "es" } = {}) {
  const label =
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_TRIAL ||
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ||
    "";
  pushDataLayer("trial_signup", { source, lang });
  trackGoogleAdsConversion(label, { value: 1, currency: "CHF" });
  trackMeta("StartTrial", { content_name: "MediControl Trial", content_category: "health_app", source });
}

export function trackLeadSignup({ source = "unknown", lang = "es" } = {}) {
  pushDataLayer("lead_signup", { source, lang });
  trackMeta("Lead", { content_name: "MediControl Lead", content_category: "health_app", source, lang });
}

export function trackSubscribeSuccess({ plan = "unknown", lang = "es" } = {}) {
  const label =
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_SUBSCRIBE ||
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ||
    "";
  pushDataLayer("subscribe_success", { plan, lang });
  trackGoogleAdsConversion(label, { value: 1, currency: "CHF" });
  trackMeta("Subscribe", { content_name: "MediControl Subscription", plan, lang });
}
