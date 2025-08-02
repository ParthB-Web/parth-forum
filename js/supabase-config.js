// Supabase configuration and connection
const supabaseUrl = 'https://juhunqkuaqzwuihktwqw.supabase.co'; // Replace with your URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1aHVucWt1YXF6d3VpaGt0d3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMjU3MDIsImV4cCI6MjA2OTcwMTcwMn0.NLIayZ_5JTFhAdO6hjIcP7PFjFq7m7EdXAEJLVs3CnM'; // Replace with your key

// Initialize Supabase client
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Authentication functions
const cosmicAuth = {
  async signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    
    if (error) {
      console.error('Error signing in:', error);
      return { error };
    }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      return { error };
    }
    
    window.location.reload();
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Make available globally
window.cosmicAuth = cosmicAuth;
window.supabase = supabase;
