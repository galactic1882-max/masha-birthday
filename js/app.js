(() => {
  const root = document.documentElement;
  const cover = document.querySelector('#cover');
  const reader = document.querySelector('#book');
  const pages = [...document.querySelectorAll('.book-page')];
  const pageStatus = document.querySelector('#page-status');
  const previousButton = document.querySelector('#previous-page');
  const nextButton = document.querySelector('#next-page');
  const themeButton = document.querySelector('#theme-toggle');
  const themeLabel = themeButton.querySelector('.theme-label');
  const dialog = document.querySelector('#contents-dialog');
  let language = window.bookI18n?.getLanguage() || document.documentElement.lang || 'en';
  const locales = {
    en: {
      readingMode: 'Reading mode', nightReading: 'Night reading',
      cat: [
        'Bon Bon’s verdict: needs more shelf space.',
        'Bon Bon’s verdict: coffee may remain on the page.',
        'Bon Bon’s verdict: 563 songs is a sensible beginning.',
        'Bon Bon’s verdict: this entire book now belongs to the cat.',
      ],
    },
    es: {
      readingMode: 'Modo lectura', nightReading: 'Lectura nocturna',
      cat: [
        'Veredicto de Bon Bon: hacen falta más estantes.',
        'Veredicto de Bon Bon: el café puede quedarse en la página.',
        'Veredicto de Bon Bon: 563 canciones son un comienzo sensato.',
        'Veredicto de Bon Bon: ahora todo este libro pertenece al gato.',
      ],
    },
    ru: {
      readingMode: 'Режим чтения', nightReading: 'Ночное чтение',
      cat: [
        'Вердикт Бон Бона: нужно больше книжных полок.',
        'Вердикт Бон Бона: кофе может остаться на странице.',
        'Вердикт Бон Бона: 563 песни — вполне разумное начало.',
        'Вердикт Бон Бона: теперь вся эта книга принадлежит коту.',
      ],
    },
  };
  const getUI = () => locales[language] || locales.en;
  let pageIndex = 0;
  let touchStartX = null;

  const isSinglePage = () => window.matchMedia('(max-width: 899px)').matches;

  const renderPages = () => {
    const single = isSinglePage();
    const start = single ? pageIndex : Math.floor(pageIndex / 2) * 2;
    const end = single ? start : Math.min(start + 1, pages.length - 1);

    pages.forEach((page, index) => {
      const visible = index >= start && index <= end;
      page.dataset.visible = String(visible);
      page.dataset.side = single ? 'single' : index === start ? 'left' : 'right';
      page.setAttribute('aria-hidden', String(!visible));
    });

    pageStatus.textContent = single || start === end ? `${start + 1} / ${pages.length}` : `${start + 1}–${end + 1} / ${pages.length}`;
    previousButton.disabled = start === 0;
    nextButton.disabled = end === pages.length - 1;
  };

  const setTheme = (theme) => {
    const night = theme === 'night';
    root.dataset.theme = night ? 'night' : 'day';
    themeButton.setAttribute('aria-pressed', String(night));
    themeButton.querySelector('[aria-hidden]').textContent = night ? '☀' : '☾';
    themeLabel.textContent = night ? getUI().readingMode : getUI().nightReading;
    try { sessionStorage.setItem('masha-book-theme', root.dataset.theme); } catch { /* local files may restrict storage */ }
  };

  document.querySelector('#open-book').addEventListener('click', () => {
    cover.hidden = true;
    reader.hidden = false;
    renderPages();
    document.querySelector('#contents-button').focus();
  });

  previousButton.addEventListener('click', () => {
    pageIndex = Math.max(0, pageIndex - (isSinglePage() ? 1 : 2));
    renderPages();
  });

  nextButton.addEventListener('click', () => {
    pageIndex = Math.min(pages.length - 1, pageIndex + (isSinglePage() ? 1 : 2));
    renderPages();
  });

  themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'night' ? 'day' : 'night'));
  document.querySelector('#contents-button').addEventListener('click', () => { dialog.hidden = false; document.querySelector('#close-contents').focus(); });
  document.querySelector('#close-contents').addEventListener('click', () => { dialog.hidden = true; document.querySelector('#contents-button').focus(); });

  document.querySelectorAll('[data-jump]').forEach((button) => {
    button.addEventListener('click', () => {
      pageIndex = Number(button.dataset.jump);
      dialog.hidden = true;
      renderPages();
      document.querySelector('#book').focus({ preventScroll: true });
    });
  });

  document.querySelector('#bookmark').addEventListener('click', () => {
    const note = document.querySelector('#bookmark-note');
    note.hidden = !note.hidden;
  });

  let catReactionIndex = 0;
  document.querySelector('#cat-easter-egg').addEventListener('click', () => {
    const catReactions = getUI().cat;
    document.querySelector('#cat-reaction').textContent = catReactions[catReactionIndex % catReactions.length];
    catReactionIndex += 1;
  });

  document.querySelector('#final-surprise').addEventListener('click', (event) => {
    const message = document.querySelector('#surprise-message');
    message.hidden = false;
    event.currentTarget.hidden = true;
    document.querySelector('.page-final').classList.add('celebrating');
  });

  document.querySelector('.book-shell').addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0]?.clientX ?? null;
  }, { passive: true });

  document.querySelector('.book-shell').addEventListener('touchend', (event) => {
    if (touchStartX === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) < 48) return;
    if (distance < 0) nextButton.click();
    if (distance > 0) previousButton.click();
  }, { passive: true });

  window.addEventListener('resize', renderPages);
  window.addEventListener('booklanguagechange', (event) => {
    language = event.detail.language;
    catReactionIndex = 0;
    setTheme(root.dataset.theme);
  });
  document.addEventListener('keydown', (event) => {
    if (reader.hidden) return;
    if (event.key === 'ArrowRight') nextButton.click();
    if (event.key === 'ArrowLeft') previousButton.click();
    if (event.key === 'Escape' && !dialog.hidden) document.querySelector('#close-contents').click();
  });

  let savedTheme = 'day';
  try { savedTheme = sessionStorage.getItem('masha-book-theme') || 'day'; } catch { /* use the day theme */ }
  setTheme(savedTheme);
  renderPages();
})();
