// ===================================================
// ForYouPure — Site Script
// Handles: Supabase lead capture, channel click tracking
// ===================================================

// STEP 1: Replace these two placeholders with your real Supabase values.
// Find them in Supabase: Project Settings > API
const SUPABASE_URL = "https://gmieeucjavcuyqbkoorh.supabase.co"; // e.g. https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtaWVldWNqYXZjdXlxYmtvb3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5Mzk5NjQsImV4cCI6MjEwMjUxNTk2NH0.OzDEsMA_FKGc82T15XvA-Nx2FmN6WYSs1Nr_zEiPQ7Y";

let supabase = null;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  // Only initialize Supabase once real keys are in place
  if (
    SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL" &&
    SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY" &&
    window.supabase
  ) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  setupLeadForm();
  setupChannelTracking();
});

// ---------------------------------------------------
// Lead capture form
// ---------------------------------------------------
function setupLeadForm() {
  const form = document.getElementById("lead-form");
  const note = document.getElementById("form-note");
  const submitBtn = document.getElementById("lead-submit");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();

    if (!email) return;

    if (!supabase) {
      // Keys not configured yet — friendly fallback so the form doesn't silently fail
      note.textContent = "Signups aren't connected yet — add your Supabase keys in script.js.";
      note.className = "form-note error";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const { error } = await supabase.from("leads").insert([{ email }]);

    submitBtn.disabled = false;
    submitBtn.textContent = "Notify Me";

    if (error) {
      // Friendly message for duplicate emails vs. other errors
      if (error.code === "23505") {
        note.textContent = "You're already on the list — we'll be in touch!";
        note.className = "form-note success";
      } else {
        note.textContent = "Something went wrong. Please try again.";
        note.className = "form-note error";
        console.error("Supabase insert error:", error);
      }
      return;
    }

    note.textContent = "You're on the list! We'll email you the moment we launch.";
    note.className = "form-note success";
    form.reset();
  });
}

// ---------------------------------------------------
// Channel click tracking (WhatsApp / Amazon)
// Currently these links are disabled ("Coming Soon"),
// but click intent is still logged so you know demand
// before the links go live.
// ---------------------------------------------------
function setupChannelTracking() {
  document.querySelectorAll(".channel-link").forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const channel = link.dataset.channel;

      if (supabase) {
        const { error } = await supabase
          .from("channel_clicks")
          .insert([{ channel }]);
        if (error) console.error("Supabase click log error:", error);
      }

      // Since the real links aren't live yet, nudge the visitor to the email form instead
      document.getElementById("email").focus();
    });
  });
}
