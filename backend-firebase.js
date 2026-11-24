/*
 * Ponte entre o jogo e o Firebase (Auth anônimo + Cloud Firestore).
 * Expõe window.mpBackend = { db, user } com a mesma interface que o multijogador.js usa.
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, collection, getDoc, getDocs, setDoc, updateDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

function publish(backend, error) {
  window.mpBackend = backend;
  if (error) window.mpBackendError = error;
  window.dispatchEvent(new Event("mp-backend"));
}

const cfg = window.FIREBASE_CONFIG;
if (!cfg || !cfg.apiKey || /COLE_/.test(cfg.apiKey)) {
  publish(null, "js/firebase-config.js ainda não foi preenchido.");
} else {
  start().catch(e => publish(null, (e && e.code) || String(e)));
}

async function start() {
  const app = initializeApp(cfg);
  const auth = getAuth(app);
  const fs = getFirestore(app);

  // Login anônimo: cada navegador recebe um id estável, sem pedir e-mail ou senha.
  const uid = await new Promise((resolve, reject) => {
    const stop = onAuthStateChanged(auth, u => { if (u) { stop(); resolve(u.uid); } }, reject);
    signInAnonymously(auth).catch(reject);
  });

  const wrapDoc = d => ({ id: d.id, exists: d.exists(), data: () => (d.exists() ? d.data() : undefined) });
  const wrapQuery = q => ({ docs: q.docs.map(wrapDoc), size: q.size, empty: q.empty });

  const db = {
    doc(path) {
      const ref = doc(fs, path);
      return {
        id: ref.id, path,
        get: async () => wrapDoc(await getDoc(ref)),
        set: data => setDoc(ref, data),
        update: data => updateDoc(ref, data),
        delete: () => deleteDoc(ref),
        onSnapshot: (next, error) => onSnapshot(ref, s => next(wrapDoc(s)), error)
      };
    },
    collection(path) {
      const ref = collection(fs, path);
      return {
        path,
        get: async () => wrapQuery(await getDocs(ref)),
        onSnapshot: (next, error) => onSnapshot(ref, s => next(wrapQuery(s)), error)
      };
    }
  };
  const user = { id: async () => uid, can: async () => true };
  publish({ db, user });
}
