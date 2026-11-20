(() => {
  const section = document.getElementById('film');
  const video = section.querySelector('video');
  const choices = section.querySelectorAll('[data-film-language]');
  const message = section.querySelector('.film-error');
  const fallback = message.querySelector('a');

  // Corresponding scene starts in the two edits, followed by their end times.
  const marks = {
    en: [0, 10.2, 15, 24, 35.2, 57.6, 73, 88.4, 107, 124, 139.2, 154.4, 166.4, 173.833333],
    zh: [0, 11, 16, 25.2, 35.6, 57.8, 72.8, 88.2, 107.4, 123.2, 137.2, 149.8, 163.2, 171.121]
  };
  let language = 'en';
  let pendingTime = null;

  function correspondingTime(time, from, to) {
    const ends = marks[from];
    const i = ends.findIndex(end => end > time);
    if (i === -1) return marks[to][marks[to].length - 1];
    const progress = (time - ends[i - 1]) / (ends[i] - ends[i - 1]);
    return marks[to][i - 1] + progress * (marks[to][i] - marks[to][i - 1]);
  }

  video.addEventListener('loadedmetadata', () => {
    if (pendingTime === null || video.currentSrc !== video.src || !video.readyState) return;
    if (pendingTime > 0) video.currentTime = Math.min(pendingTime, video.duration);
    pendingTime = null;
  });

  video.addEventListener('error', () => {
    if (video.error) message.hidden = false;
  });

  for (const button of choices) {
    button.addEventListener('click', () => {
      const next = button.dataset.filmLanguage;
      if (next === language) return;
      const resume = !video.paused && !video.ended;
      pendingTime = correspondingTime(pendingTime ?? video.currentTime, language, next);
      language = next;

      for (const choice of choices) choice.setAttribute('aria-pressed', String(choice === button));
      const runtime = Math.round(marks[next][marks[next].length - 1]);
      section.querySelector('.film-duration').textContent =
        Math.floor(runtime / 60) + ' min ' + (runtime % 60) + ' sec';
      message.hidden = true;
      video.setAttribute('aria-label', 'Polytropos project film in ' + button.textContent);
      video.poster = button.dataset.poster;
      // Load progress metadata only after a visitor actually starts watching.
      video.preload = pendingTime > 0 || resume ? 'metadata' : 'none';
      video.defaultPlaybackRate = video.playbackRate;
      video.src = button.dataset.src;
      fallback.href = button.dataset.src;
      video.load();
      // Keep play() inside the user gesture for mobile browsers. A second
      // switch can interrupt this promise. Native controls remain available.
      if (resume) video.play().catch(() => {});
    });
  }
  section.querySelector('.film-languages').hidden = false;
})();
