class CosmicAuthentication {
  constructor() {
    this.user = null;
    this.authElement = null;
    this.init();
  }

  async init() {
    if (!window.supabase) {
      setTimeout(() => this.init(), 100);
      return;
    }
    this.authElement = document.getElementById("cosmic-auth-portal");
    if (!this.authElement) {
      console.error("Cosmic auth portal element not found.");
      return;
    }

    // Get current user if logged in
    const { data } = await window.supabase.auth.getUser();
    this.user = data.user || null;
    this.updateUI();

    // Listen for auth changes
    window.supabase.auth.onAuthStateChange((event, session) => {
      this.user = session?.user || null;
      this.updateUI();
    });
  }

  updateUI() {
    if (!this.authElement) return;

    if (this.user) {
      const displayName =
        this.user.user_metadata?.full_name ||
        this.user.email.split("@")[0] ||
        "Cosmic Traveler";
      const avatar = this.user.user_metadata?.avatar_url;

      this.authElement.innerHTML = `
        <div class="cosmic-auth-row">
          ${
            avatar
              ? `<img src="${avatar}" alt="User Avatar" class="cosmic-auth-avatar" />`
              : `<div class="cosmic-auth-avatar-placeholder">👤</div>`
          }
          <span class="cosmic-auth-greeting">${displayName}</span>
          <button class="cosmic-authentication-btn" onclick="cosmicAuth.signOut()">Sign Out</button>
        </div>`;
    } else {
      this.authElement.innerHTML = `
        <button class="cosmic-authentication-btn" onclick="cosmicAuth.signIn()">
          <span class="cosmic-btn-icon">✨</span> Log in with Google
        </button>`;
    }
  }

  async signIn() {
    const { error } = await window.supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) console.error("Sign in error:", error.message);
  }

  async signOut() {
    const { error } = await window.supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error.message);
    } else {
      window.location.reload();
    }
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.cosmicAuth = new CosmicAuthentication();
});
