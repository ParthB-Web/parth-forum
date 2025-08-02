// Cosmic Authentication UI Component
class CosmicAuthUI {
  constructor() {
    this.user = null;
    this.authElement = null;
    this.init();
  }

  async init() {
    // Wait for supabase to be ready
    if (typeof window.cosmicAuth === 'undefined') {
      setTimeout(() => this.init(), 100);
      return;
    }

    // Check initial auth state
    await this.checkAuthState();
    
    // Create auth UI element
    this.createAuthElement();
    
    // Listen for auth changes
    window.cosmicAuth.onAuthStateChange((event, session) => {
      this.user = session?.user || null;
      this.updateUI();
    });
    
    // Initial UI update
    this.updateUI();
  }

  async checkAuthState() {
    const { user } = await window.cosmicAuth.getCurrentUser();
    this.user = user;
  }

  createAuthElement() {
    this.authElement = document.createElement('div');
    this.authElement.className = 'cosmic-auth';
    this.authElement.id = 'cosmic-auth-container';
    document.body.appendChild(this.authElement);
  }

  updateUI() {
    if (!this.authElement) return;
    
    if (this.user) {
      // User logged in
      this.authElement.innerHTML = `
        <div class="cosmic-user-info">
          ${this.user.user_metadata?.avatar_url ? 
            `<img src="${this.user.user_metadata.avatar_url}" class="cosmic-user-avatar" alt="Avatar">` : 
            '<span>👤</span>'
          }
          <span>Hello, ${this.user.user_metadata?.full_name || this.user.email?.split('@')[0] || 'User'}</span>
        </div>
        <button class="cosmic-sign-out" onclick="cosmicAuthUI.signOut()">
          Sign Out
        </button>
      `;
    } else {
      // User not logged in
      this.authElement.innerHTML = `
        <button class="cosmic-auth-button" onclick="cosmicAuthUI.signIn()">
          <span>🌟</span>
          <span>Sign in with Google</span>
        </button>
      `;
    }
  }

  async signIn() {
    await window.cosmicAuth.signInWithGoogle();
  }

  async signOut() {
    await window.cosmicAuth.signOut();
  }

  getCurrentUser() {
    return this.user;
  }

  isAuthenticated() {
    return !!this.user;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.cosmicAuthUI = new CosmicAuthUI();
});
