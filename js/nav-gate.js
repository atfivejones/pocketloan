/* nav-gate.js — single include for dual nav + gating */
(function(){
  function renderHeader() {
    const el = document.getElementById('siteNav');
    if (!el) return;
    const isAuthed = !!localStorage.getItem('userToken');
    const signedOut = `
      <nav id="nav-signed-out" class="hidden md:flex items-center gap-4">
        <a href="index.html#features" class="text-gray-600 hover:text-gray-900">Features</a>
        <a href="index.html#legal" class="text-gray-600 hover:text-gray-900">Legal</a>
        <a href="index.html#pricing" class="text-gray-600 hover:text-gray-900">Pricing</a>
        <a href="signin.html" class="text-gray-600 hover:text-gray-900">Sign in</a>
        <a href="create-note.html" id="cta-create-note"
           class="bg-blue-600 text-white px-4 py-2 rounded-lg">Create a Note</a>
      </nav>`;
    const signedIn = `
      <nav id="nav-signed-in" class="hidden md:flex items-center gap-4">
        <a href="dashboard.html" class="text-gray-600 hover:text-gray-900">Dashboard</a>
        <a href="contracts.html" class="text-gray-600 hover:text-gray-900">My Contracts</a>
        <a href="create-note.html" class="bg-blue-600 text-white px-4 py-2 rounded-lg">Create a Note</a>
        <a href="profile.html" class="text-gray-600 hover:text-gray-900">Profile</a>
        <button id="signOutBtn" class="text-gray-600 hover:text-gray-900">Sign out</button>
      </nav>`;
    el.innerHTML = `
      <header class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="index.html" class="font-bold text-gray-900">TrustLend</a>
          ${signedOut}
          ${signedIn}
        </div>
      </header>`;
    const so = document.getElementById('nav-signed-out');
    const si = document.getElementById('nav-signed-in');
    if (so && si) (isAuthed ? si : so).classList.remove('hidden');
    const cta = document.getElementById('cta-create-note');
    if (cta && !isAuthed) {
      cta.addEventListener('click', function(e){
        e.preventDefault();
        const params = new URLSearchParams({ redirect:'create-note.html', msg:'Please sign in to create a promissory note.' });
        location.href = `signin.html?${params.toString()}`;
      });
    }
    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', function(){
        localStorage.removeItem('userToken');
        localStorage.removeItem('userProfile');
        location.href = 'index.html';
      });
    }
  }
  function guardAuthPages(){
    const isAuthed = !!localStorage.getItem('userToken');
    const authPages = ['dashboard.html','contracts.html','profile.html','create-note.html'];
    const path = location.pathname.split('/').pop();
    if (authPages.includes(path) && !isAuthed) {
      const params = new URLSearchParams({ redirect:path, msg:'Please sign in to access this page.' });
      location.href = `signin.html?${params.toString()}`;
    }
  }
  function hydrateSignInMsg(){
    const params = new URLSearchParams(location.search);
    const msg = params.get('msg');
    const t = document.getElementById('signinMessage');
    if (t && msg) t.textContent = msg;
  }
  renderHeader(); guardAuthPages(); hydrateSignInMsg();
})();