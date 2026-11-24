/* OnlyOwl — Interactive Static App Logic */

(function () {
  "use strict";

  const STORAGE_KEY = "onlyowl_state_v2";

  // =========================================================
  // INITIAL DATA (preserving all original posts & comments!)
  // =========================================================

  const INITIAL_POSTS = [
    {
      id: "post-5",
      pinned: true,
      timeLabel: "Il y a 12 min",
      timestamp: 90,
      text: "Petite séance photo improvisée au crépuscule... J'ai entendu dire que mes plumes sous cette lumière étaient particulièrement... envoûtantes. Qu'en pensez-vous, mes petits oisillons ? 😉🦉 #ChouetteCharmeuse #GoldenHourFeathers #OnlyOwl",
      mediaType: "photo",
      mediaSrc: "assets/5.jpeg",
      mediaAlt: "Chouette déployant ses ailes au crépuscule",
      likes: 283,
      likedByDefault: false,
      lockType: null, // free
      comments: [
        {
          handle: "@HibouCoquinou",
          initials: "HC",
          color: "#7C3AED",
          text: "Hooo la la, Chouette ! Tu nous fais tourner la tête ! 🔥",
          time: "Il y a 2 min",
        },
        {
          handle: "@PivertTaquin",
          initials: "PT",
          color: "#F43F5E",
          text: "Je taperais bien sur cette branche... pour voir si elle est solide, bien sûr ! 😏",
          time: "Il y a 1 min",
        },
      ],
    },
    {
      id: "post-sub-exclusive",
      pinned: false,
      timeLabel: "Il y a 38 min",
      timestamp: 85,
      text: "Exclusif abonnés 🔒 J'ai sorti mon plus beau maillot rose fluo pour la séance « Coup de Vent sur le Perchoir »... Abonnez-vous gratuitement pour lever le flou ! 😉🦩 #Exclusif #ChouetteVIP #OnlyOwl",
      mediaType: "photo",
      mediaSrc: "assets/banner.jpeg",
      mediaAlt: "Photo exclusive de Chouette en bikini rose",
      likes: 412,
      likedByDefault: false,
      lockType: "subscriber", // Unlocked when subscribed (free!)
      lockBadge: "1 photo • Réservé aux abonnés",
      comments: [
        {
          handle: "@GrandDucArthur",
          initials: "GD",
          color: "#6366F1",
          text: "Le rose te va divinement bien au plumage ! 😍",
          time: "Il y a 18 min",
        },
      ],
    },
    {
      id: "post-4",
      pinned: false,
      timeLabel: "Il y a 1 heure",
      timestamp: 80,
      text: "Un petit bain pour se rafraîchir après une longue nuit de vol. Attention aux éclaboussures, c'est ma spécialité ! 💦 Qui veut me rejoindre pour un plongeon ? #BainDeMinuit #ChouetteAquatique",
      mediaType: "photo",
      mediaSrc: "assets/4.jpeg",
      mediaAlt: "Chouette prenant un bain de minuit",
      likes: 251,
      likedByDefault: false,
      lockType: null,
      comments: [
        {
          handle: "@EffraieBella",
          initials: "EB",
          color: "#F59E0B",
          text: "Toujours aussi pétillante, Chouette ! J'adore ton énergie ! 💖",
          time: "Il y a 30 min",
        },
        {
          handle: "@CanardColvertFan",
          initials: "CC",
          color: "#10B981",
          text: "Si seulement mon bain était aussi glamour ! Canardement vôtre.",
          time: "Il y a 25 min",
        },
        {
          handle: "@Sereinesse",
          avatar: "assets/sereinesse.webp",
          initials: "S",
          color: "#8B5CF6",
          text: "Bain de minuit de mes rêves , ton plumage crée le firmament au creux de mes yeux ✨",
          time: "Il y a 20 min",
        },
      ],
    },
    {
      id: "post-poll",
      pinned: false,
      timeLabel: "Il y a 2 heures",
      timestamp: 75,
      text: "Petit sondage pour mes petits oisillons 🗳️ Quelle thématique voulez-vous pour le shooting de pleine lune de vendredi ? Votez ci-dessous ! #Sondage #NuitMagique",
      mediaType: "poll",
      poll: {
        id: "poll-fullmoon",
        endsLabel: "Se termine dans 2 jours",
        options: [
          { id: "opt-1", label: "Séance « Plumes mouillées sous la pluie » 🌧️", baseVotes: 148 },
          { id: "opt-2", label: "ASMR chuchotements & claquements de bec 🎙️", baseVotes: 204 },
          { id: "opt-3", label: "Chasse au mulot en GoPro embarquée 🎥", baseVotes: 91 },
          { id: "opt-4", label: "Visite VIP de ma vieille grange 🏚️", baseVotes: 67 },
        ],
      },
      likes: 164,
      likedByDefault: false,
      lockType: null,
      comments: [
        {
          handle: "@HulotteSophie",
          initials: "HS",
          color: "#EAB308",
          text: "L'ASMR claquements de bec, j'en rêve chaque nuit ! 🎧",
          time: "Il y a 1h",
        },
      ],
    },
    {
      id: "post-ppv-video",
      pinned: false,
      timeLabel: "Il y a 2 heures",
      timestamp: 70,
      text: "Vidéo PPV ultra-privée 🔥 Ma routine étirement d'ailes à 3h du matin — attention, rotation de tête à 270° non censurée 👀🦉 #PPV #Rotation270 #NuitMagique",
      mediaType: "video",
      mediaSrc: "assets/3.jpeg",
      mediaAlt: "Vidéo privée de Chouette sous la pleine lune",
      duration: "01:42",
      likes: 539,
      likedByDefault: false,
      lockType: "ppv",
      ppvPrice: "4,99 €",
      ppvMulots: "3 Mulots",
      lockBadge: "1 vidéo HD (01:42) • Contenu PPV",
      comments: [
        {
          handle: "@HibouCoquinou",
          initials: "HC",
          color: "#7C3AED",
          text: "J'ai dépensé mes 3 derniers mulots sans aucun regret... cette rotation à 270° est légendaire 😱🔥",
          time: "Il y a 1h 20min",
        },
      ],
    },
    {
      id: "post-asmr-audio",
      pinned: false,
      timeLabel: "Il y a 3 heures",
      timestamp: 65,
      text: "Vous n'arrivez pas à dormir ? Je vous ai enregistré une note vocale ASMR « Hooo-hooo » depuis ma poutre préférée. Mettez vos écouteurs... 🎧🌙 #ASMRChouette #ChouetteVie",
      mediaType: "audio",
      duration: "0:14",
      audioTitle: "ASMR Nocturne — Hululement Doux (Brocéliande).mp3",
      likes: 318,
      likedByDefault: false,
      lockType: null,
      comments: [
        {
          handle: "@EffraieBella",
          initials: "EB",
          color: "#F59E0B",
          text: "J'ai lancé l'audio et je me suis endormie sur ma branche en 10 secondes 😴✨",
          time: "Il y a 2h 30min",
        },
      ],
    },
    {
      id: "post-3",
      pinned: false,
      timeLabel: "Il y a 3 heures",
      timestamp: 60,
      text: "Lever de lune spectaculaire ce soir depuis mon perchoir préféré. La forêt est si paisible sous cette lumière argentée. 🌕🌲 #MoonlightOwl #PaixNocturne",
      mediaType: "photo",
      mediaSrc: "assets/3.jpeg",
      mediaAlt: "Chouette perchée devant la pleine lune",
      likes: 237,
      likedByDefault: false,
      lockType: null,
      comments: [
        {
          handle: "@GrandDucArthur",
          initials: "GD",
          color: "#6366F1",
          text: "Superbe cliché, Chouette ! Tu as l'œil.",
          time: "Il y a 2h 15min",
        },
        {
          handle: "@EffraieBella",
          initials: "EB",
          color: "#F59E0B",
          text: "J'aimerais tellement voir ça ! C'est magique. ✨",
          time: "Il y a 2h 10min",
        },
      ],
    },
    {
      id: "post-2",
      pinned: false,
      timeLabel: "Il y a 6 heures",
      timestamp: 50,
      text: "Petite pause café (enfin, nectar de fleur pour moi !) après une matinée de chasse aux idées pour mes prochains clichés. 🌸☕ #ChouetteCréative #PauseNectar",
      mediaType: "photo",
      mediaSrc: "assets/2.jpeg",
      mediaAlt: "Chouette faisant une pause nectar en forêt",
      likes: 189,
      likedByDefault: true,
      lockType: null,
      comments: [
        {
          handle: "@PigeonVoyageur77",
          initials: "PV",
          color: "#3B82F6",
          text: "Tu as toujours de bonnes idées Chouette !",
          time: "Il y a 2h",
        },
        {
          handle: "@HulotteSophie",
          initials: "HS",
          color: "#EAB308",
          text: "Le nectar de fleur, un délice ! Bonne inspiration !",
          time: "Il y a 1h 45min",
        },
      ],
    },
    {
      id: "post-1",
      pinned: false,
      timeLabel: "Il y a 1 jour",
      timestamp: 40,
      text: "Retour d'un petit voyage d'exploration dans la vieille grange abandonnée. Plein de recoins secrets et d'histoires à imaginer ! 🏚️🦉 #AventureChouette #LieuxMystérieux",
      mediaType: "photo",
      mediaSrc: "assets/1.jpeg",
      mediaAlt: "Chouette explorant une vieille grange baignée de lumière",
      likes: 305,
      likedByDefault: false,
      lockType: null,
      comments: [
        {
          handle: "@FauconRapido",
          initials: "FR",
          color: "#64748B",
          text: "Prudente dans tes explorations, Chouette ! Mais ça a l'air passionnant.",
          time: "Il y a 23h",
        },
        {
          handle: "@MerleMoqueurJoe",
          initials: "MM",
          color: "#475569",
          text: "Tu devrais écrire un livre sur tes aventures !",
          time: "Il y a 22h 30min",
        },
        {
          handle: "@ChouetteAcademique",
          initials: "CA",
          color: "#334155",
          text: "Les structures anciennes offrent souvent des habitats riches pour notre espèce. Bonne trouvaille !",
          time: "Il y a 22h",
        },
      ],
    },
  ];

  const SUGGESTIONS = [
    {
      id: "sug-arthur",
      name: "GrandDucArthur",
      handle: "@GrandDucArthur",
      tag: "Gratuit",
      initials: "GD",
      color: "#6366F1",
      bannerBg: "linear-gradient(135deg, #1e1b4b 0%, #3730a3 55%, #00aff0 100%)",
      bio: "Hululements graves & perchoirs de prestige",
    },
    {
      id: "sug-bella",
      name: "EffraieBella",
      handle: "@EffraieBella",
      tag: "Gratuit",
      initials: "EB",
      color: "#F59E0B",
      bannerBg: "linear-gradient(135deg, #78350f 0%, #d97706 60%, #fde68a 100%)",
      bio: "Plumage soyeux • Vols silencieux",
    },
    {
      id: "sug-sereinesse",
      name: "Sereinesse",
      handle: "@Sereinesse",
      tag: "VIP",
      avatar: "assets/sereinesse.webp",
      initials: "S",
      color: "#EC4899",
      bannerBg: "linear-gradient(135deg, #0e7490 0%, #06b6d4 50%, #ec4899 100%)",
      bio: "Poésie marine & firmament ✨",
    },
    {
      id: "sug-sophie",
      name: "HulotteSophie",
      handle: "@HulotteSophie",
      tag: "Gratuit",
      initials: "HS",
      color: "#10B981",
      bannerBg: "linear-gradient(135deg, #064e3b 0%, #059669 60%, #6ee7b7 100%)",
      bio: "Nectar artisanal & branches cosy",
    },
    {
      id: "sug-coquinou",
      name: "HibouCoquinou",
      handle: "@HibouCoquinou",
      tag: "Gratuit",
      initials: "HC",
      color: "#7C3AED",
      bannerBg: "linear-gradient(135deg, #3b0764 0%, #7c3aed 65%, #c4b5fd 100%)",
      bio: "Aigrettes toujours au garde-à-vous 🔥",
    },
    {
      id: "sug-pivert",
      name: "PivertTaquin",
      handle: "@PivertTaquin",
      tag: "Gratuit",
      initials: "PT",
      color: "#F43F5E",
      bannerBg: "linear-gradient(135deg, #881337 0%, #e11d48 60%, #fda4af 100%)",
      bio: "Testeur officiel de branches solides 🪵",
    },
  ];

  const OWL_DM_REPLIES = [
    "Hooo-hooo ! 🦉 Merci pour ton message, je viens juste de rentrer d'une virée au-dessus du clocher !",
    "Tu sais que je peux tourner la tête à 270° juste pour mieux lire tes messages ? 😉✨",
    "Si tu m'offres un mulot bio, je te fais une dédicace spéciale dans ma prochaine note ASMR ! 🐭🎙️",
    "Chut... ne réveille pas @GrandDucArthur, il dort encore sur le chêne d'à côté 🌙🌲",
    "Mes plumes rougissent sous la pleine lune ! Tu as vu ma photo dans la vieille grange ? 🏚️💖",
    "Hooo ! Attends deux secondes, j'attrape une luciole pour avoir un meilleur éclairage ring-light ✨🦉",
  ];

  // =========================================================
  // STATE MANAGEMENT (localStorage)
  // =========================================================

  function getDefaultState() {
    return {
      subscribed: false,
      vipTier: null,
      favoriteCreator: false,
      visitorHandle: "@VisiteurNocturne",
      likedPosts: ["post-2"],
      bookmarkedPosts: [],
      unlockedPosts: [],
      unlockedDmMedia: false,
      followedSuggestions: [],
      pollVotes: {},
      userComments: {},
      postTips: {},
      totalTipsEuro: 0,
      notifications: [
        {
          id: "notif-welcome-1",
          text: "<strong>Chouette</strong> a publié un nouveau cliché au crépuscule 🦉✨",
          time: "Il y a 12 min",
          unread: true,
        },
        {
          id: "notif-welcome-2",
          text: "<strong>Chouette</strong> vous a envoyé un message privé 💬",
          time: "Il y a 5 min",
          unread: true,
        },
      ],
      dmMessages: [
        {
          id: "dm-init-1",
          sender: "owl",
          text: "Hooo-hooo ! Bienvenue sur mon OnlyOwl privé 🦉✨ Je suis ravie de te voir par ici ! N'hésite pas à m'écrire ou à débloquer ma photo interdite ci-dessous...",
          time: "À l'instant",
        },
        {
          id: "dm-init-ppv",
          sender: "owl",
          type: "ppv-photo",
          price: "2 Mulots",
          caption: "Photo ultra-rare de mes serres après manucure 💅🦉",
          mediaSrc: "assets/5.jpeg",
          time: "À l'instant",
        },
      ],
      dmUnreadCount: 1,
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return getDefaultState();
      const parsed = JSON.parse(raw);
      return { ...getDefaultState(), ...parsed };
    } catch {
      return getDefaultState();
    }
  }

  let state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore quota errors in private browsing
    }
  }

  // Ephemeral UI state
  const ui = {
    activeTab: "posts", // "posts" | "media"
    postFilter: "all", // "all" | "popular" | "free" | "exclusive"
    mediaFilter: "all", // "all" | "photo" | "video" | "audio"
    searchQuery: "",
    activeHashtag: null,
    suggestionsPage: 0,
    openCommentForms: new Set(),
    tipTargetPostId: null,
    checkoutAction: null,
    lightboxItems: [],
    lightboxIndex: 0,
    audioPlayingPostId: null,
    videoPlayingPostId: null,
  };

  // =========================================================
  // HELPERS
  // =========================================================

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatPostText(text) {
    const regex = /(^|[\s(«])#([\p{L}\p{N}_]+)/gu;
    let result = "";
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const prefix = match[1];
      const tag = match[2];
      const hashStart = match.index + prefix.length;

      result += escapeHtml(text.slice(lastIndex, hashStart));
      result += `<button type="button" class="of-hashtag" data-hashtag="${escapeHtml(tag)}">#${escapeHtml(tag)}</button>`;
      lastIndex = regex.lastIndex;
    }

    result += escapeHtml(text.slice(lastIndex));
    return result;
  }

  function getVisitorInitials() {
    const clean = (state.visitorHandle || "@VN").replace(/^@/, "").trim();
    if (!clean) return "VN";
    const caps = clean.match(/[A-Z]/g);
    if (caps && caps.length >= 2) return (caps[0] + caps[1]).slice(0, 2);
    return clean.slice(0, 2).toUpperCase();
  }

  function isPostUnlocked(post) {
    if (!post.lockType) return true;
    if (post.lockType === "subscriber") return state.subscribed;
    if (post.lockType === "ppv") return state.unlockedPosts.includes(post.id);
    return true;
  }

  function getPostLikeCount(post) {
    const isLiked = state.likedPosts.includes(post.id);
    let delta = 0;
    if (isLiked && !post.likedByDefault) delta = 1;
    if (!isLiked && post.likedByDefault) delta = -1;
    return post.likes + delta;
  }

  function getAllComments(post) {
    const extras = state.userComments[post.id] || [];
    return [...post.comments, ...extras];
  }

  function showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "of-toast";
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      toast.style.transition = "opacity 0.2s ease, transform 0.2s ease";
      setTimeout(() => toast.remove(), 220);
    }, 2800);
  }

  function addNotification(htmlText) {
    state.notifications.unshift({
      id: "notif-" + Date.now() + "-" + Math.random().toString(16).slice(2),
      text: htmlText,
      time: "À l'instant",
      unread: true,
    });
    if (state.notifications.length > 25) state.notifications.pop();
    saveState();
    updateBadges();
  }

  // =========================================================
  // WEB AUDIO API: SYNTHESIZED OWL HOOT ASMR (Zero external files!)
  // =========================================================

  let audioCtx = null;
  let audioTimer = null;
  let audioInterval = null;
  let audioProgress = 0;

  function playOwlHootPattern() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtx) audioCtx = new AudioContextClass();
      if (audioCtx.state === "suspended") audioCtx.resume();

      const now = audioCtx.currentTime;

      const scheduleHoot = (startOffset, duration, startFreq, endFreq, peakGain) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(startFreq, now + startOffset);
        osc.frequency.exponentialRampToValueAtTime(endFreq, now + startOffset + duration);

        gain.gain.setValueAtTime(0.001, now + startOffset);
        gain.gain.linearRampToValueAtTime(peakGain, now + startOffset + duration * 0.25);
        gain.gain.exponentialRampToValueAtTime(0.001, now + startOffset + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + startOffset);
        osc.stop(now + startOffset + duration + 0.04);
      };

      // Classic soft barn/tawny owl "Hooo... ho-ho-hooo!"
      scheduleHoot(0.05, 0.55, 440, 370, 0.14);
      scheduleHoot(0.85, 0.22, 410, 390, 0.1);
      scheduleHoot(1.18, 0.22, 420, 395, 0.1);
      scheduleHoot(1.52, 0.72, 450, 345, 0.15);
    } catch {
      // Ignore if browser blocks audio
    }
  }

  function stopAsmrAudio() {
    if (audioTimer) clearTimeout(audioTimer);
    if (audioInterval) clearInterval(audioInterval);
    audioTimer = null;
    audioInterval = null;
    ui.audioPlayingPostId = null;
    audioProgress = 0;
  }

  function toggleAsmrAudio(postId) {
    if (ui.audioPlayingPostId === postId) {
      stopAsmrAudio();
      renderPosts();
      return;
    }
    stopAsmrAudio();
    ui.audioPlayingPostId = postId;
    audioProgress = 0;
    playOwlHootPattern();
    renderPosts();

    const durationSec = 14;
    let elapsed = 0;
    audioInterval = setInterval(() => {
      elapsed += 0.25;
      audioProgress = Math.min(100, (elapsed / durationSec) * 100);
      if (Math.abs(elapsed - 4.5) < 0.15 || Math.abs(elapsed - 9.5) < 0.15) {
        playOwlHootPattern();
      }
      const fillEl = document.getElementById(`audio-progress-${postId}`);
      const timerEl = document.getElementById(`audio-timer-${postId}`);
      if (fillEl) fillEl.style.width = `${audioProgress}%`;
      if (timerEl) {
        const s = Math.floor(elapsed);
        timerEl.textContent = `0:${s < 10 ? "0" + s : s} / 0:14`;
      }
      if (elapsed >= durationSec) {
        stopAsmrAudio();
        renderPosts();
      }
    }, 250);
  }

  // =========================================================
  // RENDERING: SUBSCRIPTION UI, BADGES, SUGGESTIONS
  // =========================================================

  function updateBadges() {
    const unreadNotifs = state.notifications.filter((n) => n.unread).length;
    ["notif-badge-desktop", "notif-badge-mobile"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (unreadNotifs > 0) {
        el.textContent = unreadNotifs > 9 ? "9+" : String(unreadNotifs);
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    });

    ["dm-badge-desktop", "dm-badge-mobile"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (state.dmUnreadCount > 0) {
        el.textContent = state.dmUnreadCount > 9 ? "9+" : String(state.dmUnreadCount);
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    });

    const initialsEl = document.getElementById("sidebar-visitor-initials");
    if (initialsEl) initialsEl.textContent = getVisitorInitials();
  }

  function updateSubscriptionUI() {
    const mainBtn = document.getElementById("main-subscribe-btn");
    const mainLabel = document.getElementById("main-subscribe-label");
    const mainPrice = document.getElementById("main-subscribe-price");
    const subNote = document.getElementById("sub-status-note");
    const promoBadge = document.getElementById("promo-badge");

    const sideBtn = document.getElementById("sidebar-subscribe-btn");
    const sideLabel = document.getElementById("sidebar-sub-label");
    const sidePrice = document.getElementById("sidebar-sub-price");
    const sidePill = document.getElementById("sidebar-sub-pill");

    const stickyBtn = document.querySelector(".sticky-sub-btn");
    const favBtn = document.getElementById("favorite-creator-btn");

    if (state.subscribed) {
      if (mainBtn) {
        mainBtn.classList.remove("of-btn-primary");
        mainBtn.classList.add("of-btn-outline");
      }
      if (mainLabel) mainLabel.textContent = state.vipTier ? `Abonné • ${state.vipTier}` : "Abonné";
      if (mainPrice) mainPrice.textContent = "Actif ✓";
      if (promoBadge) promoBadge.textContent = state.vipTier ? "Membre VIP 🦉" : "Abonné actif ✓";
      if (subNote) {
        subNote.textContent =
          "Vous êtes abonné à Chouette ! Tous les clichés réservés aux abonnés sont débloqués.";
      }

      if (sideBtn) {
        sideBtn.classList.remove("of-btn-primary");
        sideBtn.classList.add("of-btn-outline");
      }
      if (sideLabel) sideLabel.textContent = "Abonné";
      if (sidePrice) sidePrice.textContent = "Actif ✓";
      if (sidePill) sidePill.textContent = state.vipTier ? "VIP 🦉" : "Actif ✓";

      if (stickyBtn) {
        stickyBtn.classList.remove("of-btn-primary");
        stickyBtn.classList.add("of-btn-outline");
        stickyBtn.textContent = "Abonné ✓";
      }
    } else {
      if (mainBtn) {
        mainBtn.classList.add("of-btn-primary");
        mainBtn.classList.remove("of-btn-outline");
      }
      if (mainLabel) mainLabel.textContent = "S'abonner";
      if (mainPrice) mainPrice.textContent = "Gratuit";
      if (promoBadge) promoBadge.textContent = "Offre limitée • 100% Gratuit";
      if (subNote) {
        subNote.textContent =
          "Offre de bienvenue — Abonnez-vous gratuitement pour débloquer les clichés exclusifs de Chouette et recevoir un message privé.";
      }

      if (sideBtn) {
        sideBtn.classList.add("of-btn-primary");
        sideBtn.classList.remove("of-btn-outline");
      }
      if (sideLabel) sideLabel.textContent = "S'abonner";
      if (sidePrice) sidePrice.textContent = "Gratuit";
      if (sidePill) sidePill.textContent = "Gratuit";

      if (stickyBtn) {
        stickyBtn.classList.add("of-btn-primary");
        stickyBtn.classList.remove("of-btn-outline");
        stickyBtn.textContent = "S'abonner";
      }
    }

    if (favBtn) {
      favBtn.classList.toggle("is-active", !!state.favoriteCreator);
      favBtn.title = state.favoriteCreator ? "Retirer des favoris" : "Ajouter aux favoris";
    }

    // Tips summary in sidebar
    const tipsSummary = document.getElementById("sidebar-tips-summary");
    const tipsAmount = document.getElementById("sidebar-tips-amount");
    if (tipsSummary && tipsAmount) {
      if (state.totalTipsEuro > 0) {
        tipsSummary.classList.remove("hidden");
        tipsAmount.textContent = `${state.totalTipsEuro} € (fictifs)`;
      } else {
        tipsSummary.classList.add("hidden");
      }
    }
  }

  function renderSuggestions() {
    const container = document.getElementById("suggestions-list");
    if (!container) return;

    const perPage = 3;
    const totalPages = Math.ceil(SUGGESTIONS.length / perPage);
    ui.suggestionsPage = ((ui.suggestionsPage % totalPages) + totalPages) % totalPages;
    const slice = SUGGESTIONS.slice(ui.suggestionsPage * perPage, ui.suggestionsPage * perPage + perPage);

    container.innerHTML = slice
      .map((s) => {
        const isFollowing = state.followedSuggestions.includes(s.id);
        const avatarHtml = s.avatar
          ? `<img src="${s.avatar}" alt="${escapeHtml(s.name)}" class="w-14 h-14 rounded-full object-cover border-2 border-[var(--card)]" />`
          : `<div class="w-14 h-14 rounded-full border-2 border-[var(--card)] flex items-center justify-center text-white font-bold text-sm" style="background:${s.color}">${escapeHtml(s.initials)}</div>`;

        return `
          <div class="of-suggestion-card">
            <div class="relative h-16 px-3 pt-2 flex items-start justify-between" style="background:${s.bannerBg}">
              <span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-black/45 text-white backdrop-blur-sm">
                ${escapeHtml(s.tag)}
              </span>
              <button
                type="button"
                data-action="toggle-follow-suggestion"
                data-sug-id="${s.id}"
                class="${
                  isFollowing
                    ? "bg-white/95 text-[#242529]"
                    : "bg-[#00AFF0] hover:bg-[#0091EA] text-white"
                } text-[11px] font-semibold px-3 py-1 rounded-full transition shadow-sm"
              >
                ${isFollowing ? "Suivi ✓" : "Suivre"}
              </button>
            </div>
            <div class="px-3 pb-3 pt-1 flex items-center gap-3">
              <div class="-mt-8 relative shrink-0">
                ${avatarHtml}
                <span class="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-[#35C759] border-2 border-[var(--card)]"></span>
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-1">
                  <span class="font-bold text-sm text-[var(--text)] truncate">${escapeHtml(s.name)}</span>
                  <svg class="w-3.5 h-3.5 text-[#00AFF0] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.25 14.5-3.75-3.75 1.41-1.41 2.34 2.34 5.34-5.34 1.41 1.41-6.75 6.75z" />
                  </svg>
                </div>
                <p class="text-xs text-[var(--muted)] truncate">${escapeHtml(s.handle)}</p>
                <p class="text-[11px] text-[var(--text-secondary)] truncate mt-0.5">${escapeHtml(s.bio)}</p>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // =========================================================
  // RENDERING: POSTS FEED
  // =========================================================

  function getFilteredPosts() {
    let list = [...INITIAL_POSTS];

    if (ui.postFilter === "free") {
      list = list.filter((p) => !p.lockType);
    } else if (ui.postFilter === "exclusive") {
      list = list.filter((p) => !!p.lockType);
    }

    if (ui.activeHashtag) {
      const needle = "#" + ui.activeHashtag.toLowerCase();
      list = list.filter((p) => p.text.toLowerCase().includes(needle));
    }

    if (ui.searchQuery.trim()) {
      const q = ui.searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.text.toLowerCase().includes(q) ||
          getAllComments(p).some(
            (c) => c.text.toLowerCase().includes(q) || c.handle.toLowerCase().includes(q)
          )
      );
    }

    if (ui.postFilter === "popular") {
      list.sort((a, b) => getPostLikeCount(b) - getPostLikeCount(a));
    } else {
      // Keep pinned first, then chronological
      list.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return b.timestamp - a.timestamp;
      });
    }

    return list;
  }

  function renderPostMedia(post) {
    const unlocked = isPostUnlocked(post);

    // 1. POLL POST
    if (post.mediaType === "poll" && post.poll) {
      const chosenId = state.pollVotes[post.poll.id] || null;
      const totalVotes = post.poll.options.reduce(
        (acc, opt) => acc + opt.baseVotes + (chosenId === opt.id ? 1 : 0),
        0
      );

      return `
        <div class="px-4 pb-3 space-y-2">
          ${post.poll.options
            .map((opt) => {
              const votes = opt.baseVotes + (chosenId === opt.id ? 1 : 0);
              const pct = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
              const isChosen = chosenId === opt.id;
              return `
                <button
                  type="button"
                  data-action="vote-poll"
                  data-poll-id="${post.poll.id}"
                  data-option-id="${opt.id}"
                  class="poll-option-btn ${isChosen ? "is-chosen" : ""} w-full text-left px-3.5 py-2.5 bg-[var(--bg)] flex items-center justify-between gap-3"
                >
                  <div class="poll-bar-fill" style="width: ${chosenId ? pct : 0}%"></div>
                  <span class="relative z-10 text-sm font-medium text-[var(--text)] flex items-center gap-2">
                    ${isChosen ? '<span class="text-[#00AFF0] font-bold">✓</span>' : ""}
                    ${escapeHtml(opt.label)}
                  </span>
                  ${
                    chosenId
                      ? `<span class="relative z-10 text-xs font-bold text-[#00AFF0] shrink-0">${pct}%</span>`
                      : ""
                  }
                </button>
              `;
            })
            .join("")}
          <div class="flex items-center justify-between text-xs text-[var(--muted)] pt-1">
            <span>${totalVotes} votes${chosenId ? " • Merci pour votre vote !" : " • Cliquez pour voter"}</span>
            <span>${escapeHtml(post.poll.endsLabel)}</span>
          </div>
        </div>
      `;
    }

    // 2. AUDIO ASMR POST
    if (post.mediaType === "audio") {
      const isPlaying = ui.audioPlayingPostId === post.id;
      const bars = [14, 24, 18, 32, 20, 28, 12, 26, 34, 16, 22, 30, 18, 26, 14, 28, 22, 16, 24, 14];
      return `
        <div class="px-4 pb-3">
          <div class="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4 flex items-center gap-3.5">
            <button
              type="button"
              data-action="toggle-audio"
              data-post-id="${post.id}"
              class="w-12 h-12 rounded-full bg-[#00AFF0] hover:bg-[#0091EA] text-white flex items-center justify-center shrink-0 shadow-sm transition"
              aria-label="${isPlaying ? "Mettre en pause" : "Écouter l'audio"}"
            >
              ${
                isPlaying
                  ? `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>`
                  : `<svg class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`
              }
            </button>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2 mb-1.5">
                <span class="text-xs font-semibold text-[var(--text)] truncate">${escapeHtml(post.audioTitle)}</span>
                <span id="audio-timer-${post.id}" class="text-[11px] font-mono text-[var(--muted)] shrink-0">
                  ${isPlaying ? "Lecture..." : "0:00 / " + escapeHtml(post.duration)}
                </span>
              </div>
              <div class="flex items-center gap-1 h-8 ${isPlaying ? "wave-playing" : ""}">
                ${bars
                  .map(
                    (h, i) =>
                      `<span class="wave-bar" style="height:${h}px; animation-delay:${(i * 0.07).toFixed(2)}s; opacity:${isPlaying ? 1 : 0.45}"></span>`
                  )
                  .join("")}
              </div>
              <div class="mt-2 h-1 w-full rounded-full bg-[var(--border)] overflow-hidden">
                <div id="audio-progress-${post.id}" class="h-full bg-[#00AFF0] transition-all duration-200" style="width:${isPlaying ? audioProgress : 0}%"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // 3. LOCKED MEDIA OVERLAY (Subscriber-only or PPV)
    if (!unlocked) {
      const isPpv = post.lockType === "ppv";
      const ctaText = isPpv
        ? `Débloquer pour ${post.ppvPrice} (${post.ppvMulots})`
        : "S'abonner gratuitement pour voir";
      const actionAttr = isPpv
        ? `data-action="unlock-ppv" data-post-id="${post.id}"`
        : `data-action="open-subscribe"`;

      return `
        <div class="relative w-full aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-slate-900 select-none">
          <img
            src="${post.mediaSrc}"
            alt="Contenu verrouillé"
            class="w-full h-full object-cover of-locked-blur"
            loading="lazy"
          />
          <div class="absolute inset-0 flex flex-col items-center justify-center p-5 text-center text-white">
            <div class="of-locked-card rounded-2xl p-5 max-w-[340px] w-full shadow-xl">
              <div class="w-12 h-12 rounded-full bg-white/15 mx-auto mb-3 flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <p class="text-xs font-medium text-white/85 mb-3">${escapeHtml(post.lockBadge)}</p>
              <button type="button" ${actionAttr} class="of-btn-primary w-full py-2.5 px-4 text-xs uppercase">
                ${escapeHtml(ctaText)}
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // 4. UNLOCKED SIMULATED VIDEO PLAYER (PPV Video Reveal!)
    if (post.mediaType === "video") {
      const isPlaying = ui.videoPlayingPostId === post.id;
      return `
        <div class="relative w-full aspect-[16/10] overflow-hidden bg-black group">
          <img
            src="${post.mediaSrc}"
            alt="${escapeHtml(post.mediaAlt)}"
            class="w-full h-full object-cover ${isPlaying ? "owl-video-playing" : ""}"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25"></div>

          <!-- Top badges -->
          <div class="absolute top-3 left-3 flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-black/65 text-white text-[11px] font-bold tracking-wide">HD 4K</span>
            <span class="px-2 py-0.5 rounded bg-[#00AFF0] text-white text-[11px] font-bold">Débloqué ✓</span>
          </div>

          <!-- Center Play/Pause trigger -->
          <button
            type="button"
            data-action="toggle-video"
            data-post-id="${post.id}"
            class="absolute inset-0 flex items-center justify-center focus:outline-none"
            aria-label="${isPlaying ? "Pause" : "Lire la vidéo"}"
          >
            <span class="w-16 h-16 rounded-full bg-[#00AFF0]/90 hover:bg-[#00AFF0] text-white flex items-center justify-center shadow-lg transition transform group-hover:scale-105 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}">
              ${
                isPlaying
                  ? `<svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>`
                  : `<svg class="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`
              }
            </span>
          </button>

          <!-- Bottom Fake Controls -->
          <div class="absolute inset-x-3 bottom-3 flex items-center justify-between text-white text-xs">
            <span class="bg-black/60 px-2 py-0.5 rounded font-mono">
              ${isPlaying ? "▶ Rotation 270° en cours... 🦉" : "00:00 / " + escapeHtml(post.duration)}
            </span>
            <span class="text-white/75 font-semibold text-[11px]">onlyowl.com/chouette.cc</span>
          </div>
        </div>
      `;
    }

    // 5. UNLOCKED PHOTO (Edge-to-edge OnlyFans style + watermark + click to lightbox)
    return `
      <div class="relative w-full overflow-hidden bg-black/5 dark:bg-black/30 cursor-pointer group" data-action="open-lightbox-post" data-post-id="${post.id}">
        <img
          src="${post.mediaSrc}"
          alt="${escapeHtml(post.mediaAlt)}"
          class="w-full max-h-[560px] object-cover transition-transform duration-300 group-hover:scale-[1.008]"
          loading="lazy"
        />
        <span class="of-watermark">onlyowl.com/chouette.cc</span>
        ${
          post.lockType === "subscriber"
            ? `<span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-semibold backdrop-blur-sm">🔓 Débloqué (Abonné)</span>`
            : ""
        }
      </div>
    `;
  }

  function renderPosts() {
    const feed = document.getElementById("posts-feed");
    if (!feed) return;

    const posts = getFilteredPosts();

    // Update active filter banner
    const banner = document.getElementById("active-filter-banner");
    const bannerLabel = document.getElementById("active-filter-label");
    if (banner && bannerLabel) {
      const parts = [];
      if (ui.activeHashtag) parts.push(`Hashtag : #${ui.activeHashtag}`);
      if (ui.searchQuery.trim()) parts.push(`Recherche : « ${ui.searchQuery.trim()} »`);
      if (parts.length > 0) {
        banner.classList.remove("hidden");
        bannerLabel.textContent = `${parts.join(" • ")} (${posts.length} résultat${posts.length > 1 ? "s" : ""})`;
      } else {
        banner.classList.add("hidden");
      }
    }

    if (posts.length === 0) {
      feed.innerHTML = `
        <div class="py-16 px-6 text-center text-[var(--muted)]">
          <div class="text-4xl mb-3">🦉</div>
          <p class="font-semibold text-[var(--text)] mb-1">Aucune publication trouvée</p>
          <p class="text-sm mb-4">Chouette n'a encore rien hululé qui corresponde à ce filtre.</p>
          <button type="button" data-action="clear-filters" class="of-btn-primary px-5 py-2 text-xs uppercase">
            Voir toutes les publications
          </button>
        </div>
      `;
      return;
    }

    feed.innerHTML = posts
      .map((post) => {
        const liked = state.likedPosts.includes(post.id);
        const bookmarked = state.bookmarkedPosts.includes(post.id);
        const likeCount = getPostLikeCount(post);
        const comments = getAllComments(post);
        const postTipTotal = state.postTips[post.id] || 0;
        const showCommentInput = ui.openCommentForms.has(post.id);

        const commentsHtml = comments
          .map((c) => {
            const avatar = c.avatar
              ? `<img src="${c.avatar}" alt="${escapeHtml(c.handle)}" class="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5" />`
              : `<div class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5" style="background:${c.color || "#00AFF0"}">${escapeHtml(c.initials || "OO")}</div>`;
            return `
              <div class="flex items-start gap-2.5 text-[13px]">
                ${avatar}
                <div class="min-w-0 flex-1 leading-snug">
                  <span class="font-semibold text-[var(--text)] mr-1">${escapeHtml(c.handle)}</span>
                  <span class="text-[var(--text-secondary)] break-words">${escapeHtml(c.text)}</span>
                  <span class="text-[11px] text-[var(--muted)] ml-1.5 whitespace-nowrap">${escapeHtml(c.time)}</span>
                </div>
              </div>
            `;
          })
          .join("");

        return `
          <article id="article-${post.id}" class="border-b border-[var(--border)] bg-[var(--bg)]">
            ${
              post.pinned
                ? `<div class="px-4 pt-3 pb-0 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                    <svg class="w-3.5 h-3.5 text-[#00AFF0]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 3a1 1 0 0 1 .707.293l4 4a1 1 0 0 1-1.414 1.414L18 7.414V13a1 1 0 0 1-.293.707L15 16.414V21a1 1 0 0 1-1.707.707l-3-3L5.707 23.293a1 1 0 0 1-1.414-1.414L8.879 17.293l-3-3A1 1 0 0 1 6.586 12.586l4.586-4.586H11V4a1 1 0 0 1 1-1h4Z" />
                    </svg>
                    <span>Publication épinglée</span>
                  </div>`
                : ""
            }

            <!-- Post Header -->
            <div class="px-4 pt-3.5 pb-2.5 flex items-center justify-between">
              <div class="flex items-center gap-3 min-w-0">
                <div class="relative shrink-0">
                  <img
                    src="assets/avatar.jpg"
                    alt="Chouette"
                    class="w-11 h-11 rounded-full object-cover"
                    onerror="this.onerror=null;this.src='https://placehold.co/44x44/00AFF0/FFFFFF?text=C';"
                  />
                  <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#35C759] border-2 border-[var(--bg)]"></span>
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-1">
                    <span class="font-bold text-[15px] text-[var(--text)] truncate">Chouette</span>
                    <svg class="w-4 h-4 text-[#00AFF0] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.25 14.5-3.75-3.75 1.41-1.41 2.34 2.34 5.34-5.34 1.41 1.41-6.75 6.75z" />
                    </svg>
                  </div>
                  <p class="text-xs text-[var(--muted)]">@chouette.cc</p>
                </div>
              </div>

              <div class="flex items-center gap-2 shrink-0 text-[var(--muted)]">
                <span class="text-xs">${escapeHtml(post.timeLabel)}</span>
                <button
                  type="button"
                  data-action="copy-post-link"
                  data-post-id="${post.id}"
                  class="p-1.5 rounded-full hover:bg-[var(--bg-subtle)] hover:text-[#00AFF0] transition"
                  title="Copier le lien de la publication"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Post Copy -->
            <p class="px-4 pb-3 text-[15px] leading-relaxed text-[var(--text)]">
              ${formatPostText(post.text)}
            </p>

            <!-- Post Media -->
            ${renderPostMedia(post)}

            <!-- Post Actions Bar (Authentic OnlyFans icon row) -->
            <div class="px-4 pt-3 pb-3.5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-5">
                  <button
                    type="button"
                    data-action="toggle-like"
                    data-post-id="${post.id}"
                    class="flex items-center gap-1.5 transition ${
                      liked ? "text-[#00AFF0]" : "text-[var(--muted)] hover:text-[#00AFF0]"
                    }"
                    aria-label="Aimer"
                  >
                    <svg class="w-[22px] h-[22px] ${liked ? "heart-pop" : ""}" fill="${liked ? "currentColor" : "none"}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    data-action="toggle-comment-form"
                    data-post-id="${post.id}"
                    class="flex items-center gap-1.5 text-[var(--muted)] hover:text-[#00AFF0] transition"
                    aria-label="Commenter"
                  >
                    <svg class="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    data-action="open-tip"
                    data-post-id="${post.id}"
                    class="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[var(--muted)] hover:text-[#00AFF0] transition"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 11.219 12.768 11 12 11c-.768 0-1.536.219-2.121.659-.922.689-.428 2.013.182 2.598Z" />
                    </svg>
                    <span>Envoyer un pourboire</span>
                  </button>
                </div>

                <button
                  type="button"
                  data-action="toggle-bookmark"
                  data-post-id="${post.id}"
                  class="transition ${
                    bookmarked ? "text-[#00AFF0]" : "text-[var(--muted)] hover:text-[#00AFF0]"
                  }"
                  aria-label="Enregistrer dans Collections"
                  title="${bookmarked ? "Retirer des Collections" : "Enregistrer dans Collections"}"
                >
                  <svg class="w-[22px] h-[22px]" fill="${bookmarked ? "currentColor" : "none"}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                </button>
              </div>

              <!-- Counts Row -->
              <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[13px] font-semibold text-[var(--text)]">
                <span>${likeCount} j'aime</span>
                <span class="text-[var(--muted)] font-normal">•</span>
                <button type="button" data-action="toggle-comment-form" data-post-id="${post.id}" class="text-[var(--muted)] font-medium hover:text-[#00AFF0]">
                  ${comments.length} commentaire${comments.length > 1 ? "s" : ""}
                </button>
                ${
                  postTipTotal > 0
                    ? `<span class="text-xs font-semibold text-[#00AFF0] bg-[#00AFF0]/10 px-2 py-0.5 rounded-full">🎁 ${postTipTotal} € de pourboire envoyé</span>`
                    : ""
                }
              </div>

              <!-- Comments List -->
              ${
                comments.length > 0
                  ? `<div class="mt-3 pt-3 border-t border-[var(--border)] space-y-2.5">${commentsHtml}</div>`
                  : ""
              }

              <!-- Add Comment Form -->
              ${
                showCommentInput
                  ? `<form class="comment-form mt-3 flex items-center gap-2" data-post-id="${post.id}">
                      <input
                        type="text"
                        name="comment"
                        placeholder="Commenter en tant que ${escapeHtml(state.visitorHandle)}..."
                        maxlength="220"
                        required
                        class="flex-1 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] px-3.5 py-1.5 text-xs text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[#00AFF0]"
                      />
                      <button type="submit" class="of-btn-primary px-3.5 py-1.5 text-[11px] uppercase shrink-0">Publier</button>
                    </form>`
                  : ""
              }
            </div>
          </article>
        `;
      })
      .join("");
  }

  // =========================================================
  // RENDERING: MÉDIAS 3-COLUMN GRID
  // =========================================================

  function renderMediaGrid() {
    const grid = document.getElementById("media-grid");
    if (!grid) return;

    const mediaPosts = INITIAL_POSTS.filter((p) => p.mediaType !== "poll");
    const filtered =
      ui.mediaFilter === "all"
        ? mediaPosts
        : mediaPosts.filter((p) => p.mediaType === ui.mediaFilter);

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="col-span-3 py-12 text-center text-sm text-[var(--muted)]">Aucun média dans cette catégorie.</div>`;
      return;
    }

    grid.innerHTML = filtered
      .map((post) => {
        const unlocked = isPostUnlocked(post);

        if (post.mediaType === "audio") {
          return `
            <button
              type="button"
              data-action="jump-to-post"
              data-post-id="${post.id}"
              class="relative aspect-square bg-gradient-to-br from-[#00AFF0]/20 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-center p-3 text-center group overflow-hidden"
            >
              <svg class="w-9 h-9 text-[#00AFF0] mb-1.5 group-hover:scale-110 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
              </svg>
              <span class="text-[11px] font-semibold leading-tight">ASMR Chouette</span>
              <span class="absolute bottom-1.5 right-1.5 text-[10px] font-mono bg-black/60 px-1.5 py-0.5 rounded">${escapeHtml(post.duration)}</span>
            </button>
          `;
        }

        const clickAction = !unlocked
          ? post.lockType === "ppv"
            ? `data-action="unlock-ppv" data-post-id="${post.id}"`
            : `data-action="open-subscribe"`
          : post.mediaType === "video"
          ? `data-action="jump-to-post" data-post-id="${post.id}"`
          : `data-action="open-lightbox-post" data-post-id="${post.id}"`;

        return `
          <button
            type="button"
            ${clickAction}
            class="relative aspect-square overflow-hidden bg-slate-900 group focus:outline-none"
          >
            <img
              src="${post.mediaSrc}"
              alt="${escapeHtml(post.mediaAlt)}"
              class="w-full h-full object-cover transition-transform duration-300 ${
                unlocked ? "group-hover:scale-105" : "of-locked-blur"
              }"
              loading="lazy"
            />
            ${
              !unlocked
                ? `<div class="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-white p-2">
                    <svg class="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <span class="text-[10px] font-bold uppercase tracking-wide">${
                      post.lockType === "ppv" ? escapeHtml(post.ppvPrice) : "Gratuit"
                    }</span>
                  </div>`
                : ""
            }
            ${
              post.mediaType === "video"
                ? `<span class="absolute bottom-1.5 right-1.5 text-[10px] font-mono bg-black/70 text-white px-1.5 py-0.5 rounded flex items-center gap-1">▶ ${escapeHtml(post.duration)}</span>`
                : ""
            }
          </button>
        `;
      })
      .join("");
  }

  // =========================================================
  // MODALS: OPEN / CLOSE / RENDER
  // =========================================================

  function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add("hidden");
    const anyOpen = document.querySelectorAll('[role="dialog"]:not(.hidden)').length > 0;
    if (!anyOpen) document.body.style.overflow = "";
  }

  function closeAllModals() {
    document.querySelectorAll('[role="dialog"]').forEach((m) => m.classList.add("hidden"));
    document.body.style.overflow = "";
  }

  // --- Checkout / Subscribe / PPV Modal ---
  function openCheckoutModal({ title, subtitle, priceLabel, confirmLabel, onConfirm }) {
    document.getElementById("checkout-title").textContent = title;
    document.getElementById("checkout-subtitle").textContent = subtitle;
    document.getElementById("checkout-price-pill").textContent = priceLabel;
    document.getElementById("checkout-confirm-btn").textContent = confirmLabel;
    ui.checkoutAction = onConfirm;
    openModal("checkout-modal");
  }

  function openSubscribeFlow() {
    if (state.subscribed) {
      openCheckoutModal({
        title: "Gérer votre abonnement",
        subtitle: "Vous êtes actuellement abonné gratuitement à Chouette. Souhaitez-vous vous désabonner ?",
        priceLabel: "ACTIF ✓",
        confirmLabel: "Se désabonner",
        onConfirm: () => {
          state.subscribed = false;
          state.vipTier = null;
          saveState();
          updateSubscriptionUI();
          renderPosts();
          renderMediaGrid();
          showToast("Abonnement annulé — Chouette est triste 😢🦉");
        },
      });
    } else {
      openCheckoutModal({
        title: "S'abonner à Chouette",
        subtitle: "Gratuit pendant 30 jours, puis toujours 0,00 €/mois (payable uniquement en bonne humeur).",
        priceLabel: "GRATUIT",
        confirmLabel: "S'abonner gratuitement",
        onConfirm: () => {
          state.subscribed = true;
          saveState();
          updateSubscriptionUI();
          renderPosts();
          renderMediaGrid();
          addNotification("🎉 Vous êtes maintenant abonné à <strong>Chouette</strong> ! Ses clichés exclusifs sont débloqués.");
          state.dmMessages.push({
            id: "dm-sub-" + Date.now(),
            sender: "owl",
            text: `Merci infiniment pour ton abonnement ${state.visitorHandle} ! 🦉💖 Tu viens de débloquer ma photo en bikini rose dans le fil !`,
            time: "À l'instant",
          });
          state.dmUnreadCount += 1;
          saveState();
          updateBadges();
          showToast("Abonné à Chouette ! Contenu exclusif débloqué 🦉✨");
        },
      });
    }
  }

  function openBundleFlow(title, price, note) {
    openCheckoutModal({
      title,
      subtitle: `${note}. Facturation parodique sur votre Carte Plumier Gold.`,
      priceLabel: price,
      confirmLabel: `Activer (${price})`,
      onConfirm: () => {
        state.subscribed = true;
        state.vipTier = title.split("(")[0].trim();
        saveState();
        updateSubscriptionUI();
        renderPosts();
        renderMediaGrid();
        addNotification(`👑 Forfait <strong>${escapeHtml(title)}</strong> activé ! Chouette vous remercie en hululant.`);
        showToast(`Forfait ${state.vipTier} activé ! 🦉👑`);
      },
    });
  }

  function openPpvUnlockFlow(postId) {
    const post = INITIAL_POSTS.find((p) => p.id === postId);
    if (!post) return;
    openCheckoutModal({
      title: "Débloquer cette publication PPV",
      subtitle: `Accédez immédiatement à « ${post.mediaAlt} » (aucun vrai euro ne sera débité).`,
      priceLabel: `${post.ppvPrice} • ${post.ppvMulots}`,
      confirmLabel: `Débloquer (${post.ppvMulots})`,
      onConfirm: () => {
        if (!state.unlockedPosts.includes(postId)) {
          state.unlockedPosts.push(postId);
          saveState();
        }
        renderPosts();
        renderMediaGrid();
        addNotification("🔓 Vous avez débloqué la vidéo PPV <strong>Rotation 270°</strong> de Chouette !");
        showToast("Publication PPV débloquée ! Bon visionnage 🦉🔥");
      },
    });
  }

  // --- Tip Modal ---
  function openTipModal(postId = null) {
    ui.tipTargetPostId = postId;
    const label = document.getElementById("tip-context-label");
    if (label) {
      label.textContent = postId
        ? "@chouette.cc • Pourboire sur cette publication"
        : "@chouette.cc • Soutien au nichoir";
    }
    const input = document.getElementById("tip-custom-input");
    const msg = document.getElementById("tip-message-input");
    if (input) input.value = "5";
    if (msg) msg.value = "";
    syncTipButtonLabel();
    document.querySelectorAll(".tip-preset-btn").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.tipAmount === "5");
    });
    openModal("tip-modal");
  }

  function syncTipButtonLabel() {
    const input = document.getElementById("tip-custom-input");
    const btn = document.getElementById("tip-confirm-btn");
    const val = Math.max(1, parseInt(input?.value || "5", 10) || 5);
    if (btn) btn.textContent = `Envoyer ${val} €`;
  }

  function submitTip() {
    const input = document.getElementById("tip-custom-input");
    const msg = document.getElementById("tip-message-input");
    const amount = Math.max(1, Math.min(999, parseInt(input?.value || "5", 10) || 5));
    const note = (msg?.value || "").trim();

    state.totalTipsEuro += amount;
    if (ui.tipTargetPostId) {
      state.postTips[ui.tipTargetPostId] = (state.postTips[ui.tipTargetPostId] || 0) + amount;
    }

    state.dmMessages.push({
      id: "dm-tip-sent-" + Date.now(),
      sender: "user",
      text: `🎁 Pourboire envoyé : ${amount} €${note ? ` — « ${note} »` : ""}`,
      time: "À l'instant",
    });
    state.dmMessages.push({
      id: "dm-tip-reply-" + Date.now(),
      sender: "owl",
      text: `OH ! Merci infiniment pour ces ${amount} € (en équivalent mulots bio) !! 🦉💛 Tu es le meilleur oisillon de toute la forêt !`,
      time: "À l'instant",
    });
    state.dmUnreadCount += 1;

    saveState();
    updateSubscriptionUI();
    updateBadges();
    renderPosts();
    addNotification(`🎁 Pourboire fictif de <strong>${amount} €</strong> envoyé à Chouette !`);
    closeModal("tip-modal");
    showToast(`Pourboire de ${amount} € envoyé ! Hooo-hooo merci ! 🦉💖`);
  }

  // --- Direct Messages Modal ---
  function renderDmMessages() {
    const container = document.getElementById("dm-messages");
    if (!container) return;

    container.innerHTML = state.dmMessages
      .map((m) => {
        const isOwl = m.sender === "owl";

        if (m.type === "ppv-photo") {
          const unlocked = state.unlockedDmMedia;
          return `
            <div class="flex items-end gap-2">
              <img src="assets/avatar.jpg" alt="Chouette" class="w-7 h-7 rounded-full object-cover shrink-0" />
              <div class="max-w-[82%] rounded-2xl rounded-bl-sm overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-sm">
                <div class="relative w-60 h-44 bg-slate-900 overflow-hidden">
                  <img
                    src="${m.mediaSrc}"
                    alt="Photo DM"
                    class="w-full h-full object-cover ${unlocked ? "cursor-pointer" : "of-locked-blur"}"
                    ${unlocked ? `data-action="open-lightbox-single" data-src="${m.mediaSrc}" data-caption="${escapeHtml(m.caption)}"` : ""}
                  />
                  ${
                    !unlocked
                      ? `<div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-3 text-center text-white">
                          <span class="text-lg mb-1">🔒</span>
                          <p class="text-[11px] font-medium mb-2">${escapeHtml(m.caption)}</p>
                          <button type="button" data-action="unlock-dm-ppv" class="of-btn-primary px-3.5 py-1.5 text-[11px] uppercase">
                            Débloquer (${escapeHtml(m.price)})
                          </button>
                        </div>`
                      : `<span class="of-watermark text-[10px]">onlyowl.com/chouette.cc</span>`
                  }
                </div>
                <div class="px-3 py-2 text-xs text-[var(--text-secondary)]">
                  ${unlocked ? escapeHtml(m.caption) + " ✨" : "Contenu privé verrouillé"}
                </div>
              </div>
            </div>
          `;
        }

        if (isOwl) {
          return `
            <div class="flex items-end gap-2">
              <img src="assets/avatar.jpg" alt="Chouette" class="w-7 h-7 rounded-full object-cover shrink-0" />
              <div class="max-w-[80%] rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm bg-[var(--card)] border border-[var(--border)] text-[var(--text)] shadow-sm">
                <p class="leading-snug">${escapeHtml(m.text)}</p>
                <span class="block text-[10px] text-[var(--muted)] mt-1">${escapeHtml(m.time)}</span>
              </div>
            </div>
          `;
        }

        return `
          <div class="flex justify-end">
            <div class="max-w-[80%] rounded-2xl rounded-br-sm px-3.5 py-2.5 text-sm bg-[#00AFF0] text-white shadow-sm">
              <p class="leading-snug">${escapeHtml(m.text)}</p>
              <span class="block text-[10px] text-white/80 text-right mt-1">${escapeHtml(m.time)}</span>
            </div>
          </div>
        `;
      })
      .join("");

    container.scrollTop = container.scrollHeight;
  }

  function openDmModal() {
    state.dmUnreadCount = 0;
    saveState();
    updateBadges();
    renderDmMessages();
    openModal("dm-modal");
  }

  function sendDmMessage(text) {
    const clean = text.trim();
    if (!clean) return;

    state.dmMessages.push({
      id: "dm-user-" + Date.now(),
      sender: "user",
      text: clean,
      time: "À l'instant",
    });
    saveState();
    renderDmMessages();

    // Show typing indicator
    const container = document.getElementById("dm-messages");
    if (container) {
      const typing = document.createElement("div");
      typing.id = "dm-typing-indicator";
      typing.className = "flex items-end gap-2";
      typing.innerHTML = `
        <img src="assets/avatar.jpg" alt="Chouette" class="w-7 h-7 rounded-full object-cover shrink-0" />
        <div class="rounded-2xl rounded-bl-sm px-3.5 py-2.5 bg-[var(--card)] border border-[var(--border)] flex items-center gap-1">
          <span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>
        </div>
      `;
      container.appendChild(typing);
      container.scrollTop = container.scrollHeight;
    }

    setTimeout(() => {
      const reply = OWL_DM_REPLIES[Math.floor(Math.random() * OWL_DM_REPLIES.length)];
      state.dmMessages.push({
        id: "dm-owl-" + Date.now(),
        sender: "owl",
        text: reply,
        time: "À l'instant",
      });
      saveState();
      renderDmMessages();
    }, 950);
  }

  // --- Notifications Modal ---
  function openNotificationsModal() {
    const list = document.getElementById("notifications-list");
    if (list) {
      if (state.notifications.length === 0) {
        list.innerHTML = `<p class="p-6 text-center text-sm text-[var(--muted)]">Aucune notification pour le moment.</p>`;
      } else {
        list.innerHTML = state.notifications
          .map(
            (n) => `
              <div class="px-5 py-3.5 flex items-start gap-3 ${n.unread ? "bg-[#00AFF0]/5" : ""}">
                <img src="assets/avatar.jpg" alt="" class="w-9 h-9 rounded-full object-cover shrink-0" />
                <div class="text-sm leading-snug">
                  <p class="text-[var(--text)]">${n.text}</p>
                  <span class="text-xs text-[var(--muted)]">${escapeHtml(n.time)}</span>
                </div>
              </div>
            `
          )
          .join("");
      }
    }
    state.notifications.forEach((n) => (n.unread = false));
    saveState();
    updateBadges();
    openModal("notifications-modal");
  }

  // --- Multi-Purpose Info Modal (Collections, Subscriptions, Profile, OwlCard, About) ---
  function openInfoModal(title, htmlContent) {
    document.getElementById("info-modal-title").textContent = title;
    document.getElementById("info-modal-body").innerHTML = htmlContent;
    openModal("info-modal");
  }

  function openCollectionsModal() {
    const savedPosts = INITIAL_POSTS.filter((p) => state.bookmarkedPosts.includes(p.id));
    const followed = SUGGESTIONS.filter((s) => state.followedSuggestions.includes(s.id));

    const postsHtml =
      savedPosts.length > 0
        ? savedPosts
            .map(
              (p) => `
              <div class="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-[var(--text)] truncate">${escapeHtml(p.text)}</p>
                  <p class="text-[11px] text-[var(--muted)]">${escapeHtml(p.timeLabel)}</p>
                </div>
                <button type="button" data-action="jump-to-post" data-post-id="${p.id}" class="of-btn-outline px-3 py-1 text-[11px] shrink-0">Voir</button>
              </div>
            `
            )
            .join("")
        : `<p class="text-xs text-[var(--muted)]">Aucune publication enregistrée. Cliquez sur l'icône signet d'un post pour l'ajouter ici.</p>`;

    const followedHtml =
      followed.length > 0
        ? followed
            .map(
              (s) => `
              <span class="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-[#00AFF0]/12 text-[#00AFF0]">
                ${escapeHtml(s.handle)}
              </span>
            `
            )
            .join("")
        : `<p class="text-xs text-[var(--muted)]">Aucun créateur suivi dans les suggestions.</p>`;

    openInfoModal(
      "Collections & Favoris",
      `
        <div class="space-y-5">
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2.5">Publications enregistrées (${savedPosts.length})</h4>
            <div class="space-y-2">${postsHtml}</div>
          </div>
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2.5">Créateurs suivis (${followed.length})</h4>
            <div class="flex flex-wrap gap-2">${followedHtml}</div>
          </div>
        </div>
      `
    );
  }

  function openSubscriptionsModal() {
    openInfoModal(
      "Mes Abonnements",
      `
        <div class="space-y-4">
          <div class="rounded-xl border border-[var(--border)] p-4 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <img src="assets/avatar.jpg" alt="Chouette" class="w-12 h-12 rounded-full object-cover" />
              <div>
                <p class="font-bold text-sm">Chouette <span class="text-[#00AFF0]">✓</span></p>
                <p class="text-xs text-[var(--muted)]">@chouette.cc</p>
                <p class="text-xs font-medium mt-0.5 ${state.subscribed ? "text-[#35C759]" : "text-[var(--muted)]"}">
                  ${state.subscribed ? (state.vipTier ? `Abonné • ${escapeHtml(state.vipTier)}` : "Abonné (Gratuit)") : "Non abonné"}
                </p>
              </div>
            </div>
            <button type="button" data-action="open-subscribe-from-info" class="${state.subscribed ? "of-btn-outline" : "of-btn-primary"} px-4 py-1.5 text-xs uppercase">
              ${state.subscribed ? "Gérer" : "S'abonner"}
            </button>
          </div>
          <p class="text-xs text-[var(--muted)]">Total de vos pourboires fictifs envoyés : <strong class="text-[var(--text)]">${state.totalTipsEuro} €</strong></p>
        </div>
      `
    );
  }

  function openProfileSettingsModal() {
    openInfoModal(
      "Mon Profil Visiteur",
      `
        <form id="visitor-profile-form" class="space-y-4">
          <p class="text-xs text-[var(--text-secondary)]">
            Personnalisez votre pseudo d'oiseau nocturne : il apparaîtra lorsque vous commentez les publications de Chouette.
          </p>
          <div>
            <label for="visitor-handle-input" class="block text-xs font-semibold text-[var(--muted)] mb-1">Votre pseudo OnlyOwl</label>
            <input
              type="text"
              id="visitor-handle-input"
              value="${escapeHtml(state.visitorHandle)}"
              maxlength="24"
              required
              class="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] px-3.5 py-2.5 text-sm font-semibold text-[var(--text)] focus:outline-none focus:border-[#00AFF0]"
            />
          </div>
          <div class="flex flex-wrap gap-1.5">
            <button type="button" class="of-chip text-xs" data-preset-handle="@HibouCurieux">@HibouCurieux</button>
            <button type="button" class="of-chip text-xs" data-preset-handle="@AigleRoyal99">@AigleRoyal99</button>
            <button type="button" class="of-chip text-xs" data-preset-handle="@MoineauFan">@MoineauFan</button>
            <button type="button" class="of-chip text-xs" data-preset-handle="@ChouetteAddict">@ChouetteAddict</button>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-[var(--border)]">
            <button type="button" data-action="reset-demo-state" class="text-xs text-red-500 hover:underline">
              Réinitialiser la démo
            </button>
            <button type="submit" class="of-btn-primary px-5 py-2 text-xs uppercase">Enregistrer</button>
          </div>
        </form>
      `
    );
  }

  function openCardModal() {
    openInfoModal(
      "Carte Plumier (Factice)",
      `
        <div class="space-y-4">
          <div class="rounded-2xl p-5 text-white shadow-lg" style="background: linear-gradient(135deg, #0077b6 0%, #00aff0 60%, #48cae4 100%);">
            <div class="flex items-center justify-between mb-6">
              <span class="text-xs font-bold uppercase tracking-widest opacity-90">OnlyOwl Gold</span>
              <span class="text-xl">🦉</span>
            </div>
            <p class="font-mono text-lg tracking-widest mb-4">4242 •••• •••• 0270</p>
            <div class="flex items-center justify-between text-xs opacity-90">
              <div>
                <span class="block text-[9px] uppercase opacity-75">Titulaire</span>
                <span class="font-semibold">${escapeHtml(state.visitorHandle)}</span>
              </div>
              <div>
                <span class="block text-[9px] uppercase opacity-75">Solde Mulots</span>
                <span class="font-semibold">∞ Illimité</span>
              </div>
            </div>
          </div>
          <p class="text-xs text-[var(--text-secondary)] leading-relaxed">
            Votre <strong>Carte Plumier Gold</strong> est déjà pré-chargée avec un solde illimité de mulots factices. Vous pouvez débloquer les posts PPV et envoyer des pourboires sans jamais rien payer !
          </p>
        </div>
      `
    );
  }

  function openAboutModal() {
    openInfoModal(
      "À propos d'OnlyOwl",
      `
        <div class="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
          <p>
            <strong class="text-[var(--text)]">OnlyOwl</strong> est un site parodique 100% statique hébergé sur GitHub Pages, dédié à notre créatrice nocturne préférée : <strong class="text-[var(--text)]">Chouette (@chouette.cc)</strong> 🦉.
          </p>
          <p>
            Toutes les interactions (abonnements, pourboires, déblocages PPV, commentaires, sondage, ASMR et messages privés) fonctionnent localement dans votre navigateur via <code>localStorage</code> et Web Audio API — aucun serveur, aucune base de données et aucun paiement réel.
          </p>
          <p class="text-xs text-[var(--muted)] pt-2 border-t border-[var(--border)]">
            Domaine : chouette.cc • 100% garanti sans souris blessée.
          </p>
        </div>
      `
    );
  }

  // --- Lightbox Gallery ---
  function openLightbox(items, startIndex = 0) {
    if (!items || items.length === 0) return;
    ui.lightboxItems = items;
    ui.lightboxIndex = startIndex;
    renderLightbox();
    openModal("lightbox-modal");
  }

  function renderLightbox() {
    const item = ui.lightboxItems[ui.lightboxIndex];
    if (!item) return;
    const img = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-caption");
    const counter = document.getElementById("lightbox-counter");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    if (img) {
      img.src = item.src;
      img.alt = item.caption || "";
    }
    if (caption) caption.textContent = item.caption || "";
    if (counter) {
      counter.textContent =
        ui.lightboxItems.length > 1
          ? `${ui.lightboxIndex + 1} / ${ui.lightboxItems.length}`
          : "Photo";
    }
    if (prevBtn) prevBtn.classList.toggle("hidden", ui.lightboxItems.length <= 1);
    if (nextBtn) nextBtn.classList.toggle("hidden", ui.lightboxItems.length <= 1);
  }

  function openLightboxForPost(postId) {
    const unlockedPhotos = INITIAL_POSTS.filter(
      (p) => p.mediaType === "photo" && isPostUnlocked(p)
    ).map((p) => ({
      id: p.id,
      src: p.mediaSrc,
      caption: p.text,
    }));
    const idx = unlockedPhotos.findIndex((item) => item.id === postId);
    if (idx === -1) return;
    openLightbox(unlockedPhotos, idx);
  }

  // =========================================================
  // TAB SWITCHING & STICKY HEADER
  // =========================================================

  function switchTab(tab) {
    ui.activeTab = tab;
    const postsTab = document.getElementById("tab-posts");
    const mediaTab = document.getElementById("tab-media");
    const postsToolbar = document.getElementById("posts-toolbar");
    const mediaToolbar = document.getElementById("media-toolbar");
    const feed = document.getElementById("posts-feed");
    const grid = document.getElementById("media-grid");

    const isPosts = tab === "posts";
    postsTab.classList.toggle("is-active", isPosts);
    postsTab.setAttribute("aria-selected", String(isPosts));
    mediaTab.classList.toggle("is-active", !isPosts);
    mediaTab.setAttribute("aria-selected", String(!isPosts));

    postsToolbar.classList.toggle("hidden", !isPosts);
    feed.classList.toggle("hidden", !isPosts);
    mediaToolbar.classList.toggle("hidden", isPosts);
    grid.classList.toggle("hidden", isPosts);

    if (!isPosts) renderMediaGrid();
  }

  function syncStickyHeader() {
    const centerCol = document.getElementById("center-column");
    const stickyBar = document.getElementById("sticky-profile-bar");
    const header = document.getElementById("profile-header");
    if (!centerCol || !stickyBar || !header) return;

    const rect = centerCol.getBoundingClientRect();
    stickyBar.style.left = `${rect.left}px`;
    stickyBar.style.width = `${rect.width}px`;

    const showSticky = window.scrollY > 195;
    stickyBar.classList.toggle("opacity-100", showSticky);
    stickyBar.classList.toggle("pointer-events-auto", showSticky);
    stickyBar.classList.toggle("translate-y-0", showSticky);
    stickyBar.classList.toggle("opacity-0", !showSticky);
    stickyBar.classList.toggle("pointer-events-none", !showSticky);
    stickyBar.classList.toggle("-translate-y-2", !showSticky);
  }

  // =========================================================
  // THEME TOGGLE
  // =========================================================

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("onlyowl_theme", isDark ? "dark" : "light");
    const label = document.querySelector("#theme-toggle-desktop span");
    if (label) label.textContent = isDark ? "Mode clair" : "Mode sombre";
    showToast(isDark ? "Mode nocturne activé 🌙" : "Mode clair activé ☀️");
  }

  // =========================================================
  // EVENT DELEGATION & LISTENERS
  // =========================================================

  document.addEventListener("click", (e) => {
    // 1. Close modal via backdrop or close button
    const closeBtn = e.target.closest("[data-close-modal]");
    if (closeBtn) {
      closeModal(closeBtn.dataset.closeModal);
      return;
    }
    if (e.target.matches('[role="dialog"]')) {
      closeModal(e.target.id);
      return;
    }

    // 2. Preset visitor handles inside Profile modal
    const presetHandle = e.target.closest("[data-preset-handle]");
    if (presetHandle) {
      const inp = document.getElementById("visitor-handle-input");
      if (inp) inp.value = presetHandle.dataset.presetHandle;
      return;
    }

    // 3. Tip presets
    const tipPreset = e.target.closest(".tip-preset-btn");
    if (tipPreset) {
      document.querySelectorAll(".tip-preset-btn").forEach((b) => b.classList.remove("is-active"));
      tipPreset.classList.add("is-active");
      const inp = document.getElementById("tip-custom-input");
      if (inp) inp.value = tipPreset.dataset.tipAmount;
      syncTipButtonLabel();
      return;
    }

    // 4. Quick DM reply chips
    const dmQuick = e.target.closest("[data-dm-quick]");
    if (dmQuick) {
      sendDmMessage(dmQuick.dataset.dmQuick);
      return;
    }

    // 5. Hashtag filtering
    const hashtagEl = e.target.closest("[data-hashtag]");
    if (hashtagEl) {
      ui.activeHashtag = hashtagEl.dataset.hashtag;
      switchTab("posts");
      renderPosts();
      document.getElementById("posts-toolbar")?.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast(`Filtre actif : #${ui.activeHashtag}`);
      return;
    }

    // 6. Post filter chips
    const postChip = e.target.closest("[data-post-filter]");
    if (postChip) {
      ui.postFilter = postChip.dataset.postFilter;
      document.querySelectorAll("[data-post-filter]").forEach((c) => c.classList.remove("is-active"));
      postChip.classList.add("is-active");
      renderPosts();
      return;
    }

    // 7. Media filter chips
    const mediaChip = e.target.closest("[data-media-filter]");
    if (mediaChip) {
      ui.mediaFilter = mediaChip.dataset.mediaFilter;
      document.querySelectorAll("[data-media-filter]").forEach((c) => c.classList.remove("is-active"));
      mediaChip.classList.add("is-active");
      renderMediaGrid();
      return;
    }

    // 8. Generic data-action dispatcher
    const actionEl = e.target.closest("[data-action]");
    if (!actionEl) return;
    const action = actionEl.dataset.action;

    switch (action) {
      case "go-home":
        ui.activeHashtag = null;
        ui.searchQuery = "";
        ui.postFilter = "all";
        const dSearch = document.getElementById("desktop-search-input");
        const mSearch = document.getElementById("mobile-search-input");
        if (dSearch) dSearch.value = "";
        if (mSearch) mSearch.value = "";
        document.querySelectorAll("[data-post-filter]").forEach((c) => {
          c.classList.toggle("is-active", c.dataset.postFilter === "all");
        });
        switchTab("posts");
        renderPosts();
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;

      case "toggle-theme":
        toggleTheme();
        break;

      case "toggle-bio": {
        const extra = document.getElementById("bio-extra-info");
        const btn = document.getElementById("toggle-bio-btn");
        if (extra && btn) {
          const isHidden = extra.classList.toggle("hidden");
          btn.textContent = isHidden ? "Plus d'infos" : "Moins d'infos";
        }
        break;
      }

      case "toggle-bundles": {
        const list = document.getElementById("bundles-list");
        const chev = document.getElementById("bundles-chevron");
        if (list && chev) {
          const hidden = list.classList.toggle("hidden");
          chev.style.transform = hidden ? "" : "rotate(180deg)";
        }
        break;
      }

      case "open-subscribe":
        openSubscribeFlow();
        break;

      case "open-subscribe-from-info":
        closeModal("info-modal");
        openSubscribeFlow();
        break;

      case "open-bundle":
        openBundleFlow(
          actionEl.dataset.bundleTitle,
          actionEl.dataset.bundlePrice,
          actionEl.dataset.bundleNote
        );
        break;

      case "unlock-ppv":
        openPpvUnlockFlow(actionEl.dataset.postId);
        break;

      case "unlock-dm-ppv":
        closeModal("dm-modal");
        openCheckoutModal({
          title: "Débloquer la photo privée",
          subtitle: "Photo ultra-rare des serres de Chouette après manucure (0,00 € réel).",
          priceLabel: "2 Mulots",
          confirmLabel: "Débloquer (2 Mulots)",
          onConfirm: () => {
            state.unlockedDmMedia = true;
            saveState();
            openDmModal();
            showToast("Photo privée débloquée dans vos DM ! 💅🦉");
          },
        });
        break;

      case "open-tip":
        openTipModal(actionEl.dataset.postId || null);
        break;

      case "open-tip-from-dm":
        closeModal("dm-modal");
        openTipModal(null);
        break;

      case "open-dm":
        openDmModal();
        break;

      case "open-notifications":
        openNotificationsModal();
        break;

      case "open-collections":
        openCollectionsModal();
        break;

      case "open-subscriptions":
        openSubscriptionsModal();
        break;

      case "open-profile-settings":
        openProfileSettingsModal();
        break;

      case "open-card-modal":
        openCardModal();
        break;

      case "show-about":
        openAboutModal();
        break;

      case "toggle-favorite-creator":
        state.favoriteCreator = !state.favoriteCreator;
        saveState();
        updateSubscriptionUI();
        showToast(
          state.favoriteCreator
            ? "Chouette ajoutée à vos créatrices favorites ⭐"
            : "Chouette retirée de vos favoris"
        );
        break;

      case "share-profile": {
        const url = window.location.href;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).catch(() => {});
        }
        showToast("Lien du profil copié : chouette.cc 🔗");
        break;
      }

      case "copy-post-link": {
        const postUrl = `${window.location.origin}${window.location.pathname}#${actionEl.dataset.postId}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(postUrl).catch(() => {});
        }
        showToast("Lien de la publication copié ! 🔗");
        break;
      }

      case "new-post-easter-egg":
        showToast("Seules les chouettes certifiées peuvent publier 🦉 Envoyez-lui un DM !");
        break;

      case "switch-tab":
        switchTab(actionEl.dataset.tab);
        break;

      case "toggle-mobile-search": {
        const box = document.getElementById("mobile-search-box");
        const inp = document.getElementById("mobile-search-input");
        if (box) {
          box.classList.toggle("hidden");
          if (!box.classList.contains("hidden") && inp) inp.focus();
        }
        break;
      }

      case "clear-filters":
        ui.activeHashtag = null;
        ui.searchQuery = "";
        ui.postFilter = "all";
        const desktopInput = document.getElementById("desktop-search-input");
        const mobileInput = document.getElementById("mobile-search-input");
        if (desktopInput) desktopInput.value = "";
        if (mobileInput) mobileInput.value = "";
        document.querySelectorAll("[data-post-filter]").forEach((c) => {
          c.classList.toggle("is-active", c.dataset.postFilter === "all");
        });
        renderPosts();
        break;

      case "toggle-like": {
        const pid = actionEl.dataset.postId;
        const idx = state.likedPosts.indexOf(pid);
        if (idx >= 0) {
          state.likedPosts.splice(idx, 1);
        } else {
          state.likedPosts.push(pid);
        }
        saveState();
        renderPosts();
        break;
      }

      case "toggle-bookmark": {
        const pid = actionEl.dataset.postId;
        const idx = state.bookmarkedPosts.indexOf(pid);
        if (idx >= 0) {
          state.bookmarkedPosts.splice(idx, 1);
          showToast("Retiré de vos Collections");
        } else {
          state.bookmarkedPosts.push(pid);
          showToast("Enregistré dans vos Collections 🔖");
        }
        saveState();
        renderPosts();
        break;
      }

      case "toggle-comment-form": {
        const pid = actionEl.dataset.postId;
        if (ui.openCommentForms.has(pid)) {
          ui.openCommentForms.delete(pid);
        } else {
          ui.openCommentForms.add(pid);
        }
        renderPosts();
        if (ui.openCommentForms.has(pid)) {
          const inp = document.querySelector(`#article-${pid} input[name="comment"]`);
          if (inp) inp.focus();
        }
        break;
      }

      case "vote-poll": {
        const pollId = actionEl.dataset.pollId;
        const optId = actionEl.dataset.optionId;
        state.pollVotes[pollId] = optId;
        saveState();
        renderPosts();
        showToast("Vote enregistré ! Merci oisillon 🗳️🦉");
        break;
      }

      case "toggle-audio":
        toggleAsmrAudio(actionEl.dataset.postId);
        break;

      case "toggle-video": {
        const pid = actionEl.dataset.postId;
        if (ui.videoPlayingPostId === pid) {
          ui.videoPlayingPostId = null;
        } else {
          ui.videoPlayingPostId = pid;
          playOwlHootPattern();
          showToast("Lecture HD 4K — Rotation de tête à 270° 🦉🎥");
        }
        renderPosts();
        break;
      }

      case "open-lightbox-post":
        openLightboxForPost(actionEl.dataset.postId);
        break;

      case "open-lightbox-single":
        openLightbox([{ src: actionEl.dataset.src, caption: actionEl.dataset.caption || "" }], 0);
        break;

      case "jump-to-post": {
        const pid = actionEl.dataset.postId;
        closeAllModals();
        switchTab("posts");
        renderPosts();
        setTimeout(() => {
          document.getElementById(`article-${pid}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 60);
        break;
      }

      case "suggestions-prev":
        ui.suggestionsPage -= 1;
        renderSuggestions();
        break;

      case "suggestions-next":
        ui.suggestionsPage += 1;
        renderSuggestions();
        break;

      case "toggle-follow-suggestion": {
        const sid = actionEl.dataset.sugId;
        const creator = SUGGESTIONS.find((s) => s.id === sid);
        const idx = state.followedSuggestions.indexOf(sid);
        if (idx >= 0) {
          state.followedSuggestions.splice(idx, 1);
          showToast(`Vous ne suivez plus ${creator ? creator.handle : ""}`);
        } else {
          state.followedSuggestions.push(sid);
          showToast(`Vous suivez maintenant ${creator ? creator.handle : ""} ✓`);
        }
        saveState();
        renderSuggestions();
        break;
      }

      case "reset-demo-state":
        localStorage.removeItem(STORAGE_KEY);
        state = getDefaultState();
        closeAllModals();
        updateSubscriptionUI();
        updateBadges();
        renderSuggestions();
        renderPosts();
        renderMediaGrid();
        showToast("Démo réinitialisée ! 🦉");
        break;
    }
  });

  // Form submissions (comments, DM, visitor profile)
  document.addEventListener("submit", (e) => {
    if (e.target.matches(".comment-form")) {
      e.preventDefault();
      const postId = e.target.dataset.postId;
      const input = e.target.querySelector('input[name="comment"]');
      const text = (input?.value || "").trim();
      if (!text) return;

      if (!state.userComments[postId]) state.userComments[postId] = [];
      state.userComments[postId].push({
        handle: state.visitorHandle,
        initials: getVisitorInitials(),
        color: "#00AFF0",
        text,
        time: "À l'instant",
      });
      saveState();
      renderPosts();
      showToast("Commentaire publié ! 💬");
      return;
    }

    if (e.target.id === "dm-form") {
      e.preventDefault();
      const input = document.getElementById("dm-input");
      if (!input) return;
      const val = input.value;
      input.value = "";
      sendDmMessage(val);
      return;
    }

    if (e.target.id === "visitor-profile-form") {
      e.preventDefault();
      const input = document.getElementById("visitor-handle-input");
      let val = (input?.value || "").trim();
      if (!val) return;
      if (!val.startsWith("@")) val = "@" + val;
      state.visitorHandle = val.replace(/\s+/g, "");
      saveState();
      updateBadges();
      renderPosts();
      closeModal("info-modal");
      showToast(`Pseudo mis à jour : ${state.visitorHandle} 🦉`);
    }
  });

  // Checkout confirm button
  document.getElementById("checkout-confirm-btn")?.addEventListener("click", () => {
    const fn = ui.checkoutAction;
    ui.checkoutAction = null;
    closeModal("checkout-modal");
    if (typeof fn === "function") fn();
  });

  // Tip confirm & input sync
  document.getElementById("tip-custom-input")?.addEventListener("input", syncTipButtonLabel);
  document.getElementById("tip-confirm-btn")?.addEventListener("click", submitTip);

  // Live search inputs
  function handleSearchInput(val) {
    ui.searchQuery = val;
    if (ui.activeTab !== "posts") switchTab("posts");
    renderPosts();
  }
  document.getElementById("desktop-search-input")?.addEventListener("input", (e) => {
    const m = document.getElementById("mobile-search-input");
    if (m) m.value = e.target.value;
    handleSearchInput(e.target.value);
  });
  document.getElementById("mobile-search-input")?.addEventListener("input", (e) => {
    const d = document.getElementById("desktop-search-input");
    if (d) d.value = e.target.value;
    handleSearchInput(e.target.value);
  });

  // Lightbox navigation
  document.getElementById("lightbox-prev")?.addEventListener("click", () => {
    ui.lightboxIndex = (ui.lightboxIndex - 1 + ui.lightboxItems.length) % ui.lightboxItems.length;
    renderLightbox();
  });
  document.getElementById("lightbox-next")?.addEventListener("click", () => {
    ui.lightboxIndex = (ui.lightboxIndex + 1) % ui.lightboxItems.length;
    renderLightbox();
  });

  // Keyboard shortcuts (Escape closes modals, arrows navigate lightbox)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllModals();
    } else if (!document.getElementById("lightbox-modal")?.classList.contains("hidden")) {
      if (e.key === "ArrowLeft" && ui.lightboxItems.length > 1) {
        ui.lightboxIndex = (ui.lightboxIndex - 1 + ui.lightboxItems.length) % ui.lightboxItems.length;
        renderLightbox();
      } else if (e.key === "ArrowRight" && ui.lightboxItems.length > 1) {
        ui.lightboxIndex = (ui.lightboxIndex + 1) % ui.lightboxItems.length;
        renderLightbox();
      }
    }
  });

  // Scroll & resize listeners for sticky bar alignment
  window.addEventListener("scroll", syncStickyHeader, { passive: true });
  window.addEventListener("resize", syncStickyHeader);

  // =========================================================
  // INITIALIZE APP
  // =========================================================

  function init() {
    const isDark = document.documentElement.classList.contains("dark");
    const themeLabel = document.querySelector("#theme-toggle-desktop span");
    if (themeLabel) themeLabel.textContent = isDark ? "Mode clair" : "Mode sombre";

    const postsCountEl = document.getElementById("posts-tab-count");
    const mediaCountEl = document.getElementById("media-tab-count");
    if (postsCountEl) postsCountEl.textContent = String(INITIAL_POSTS.length);
    if (mediaCountEl) {
      mediaCountEl.textContent = String(INITIAL_POSTS.filter((p) => p.mediaType !== "poll").length);
    }

    updateSubscriptionUI();
    updateBadges();
    renderSuggestions();
    renderPosts();
    syncStickyHeader();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
