const projects = [
  {
    period: "PROJECT 01 · 2026.03.30",
    repo: "Sound-learn",
    initials: "SL",
    category: "AI · VOCAL LEARNING",
    path: "skek99110199-bit / Sound-learn",
    description: "노래와 음성 녹음을 분석해 피치와 리듬 차이를 시각화하고 연습 방향을 제시하는 보컬 학습 서비스입니다.",
    tags: ["PITCH", "DTW", "AI FEEDBACK"],
    accent: "#ff6a1a",
    github: "https://github.com/skek99110199-bit/Sound-learn"
  },
  {
    period: "PROJECT 02 · 2026.05.20",
    repo: "SafeLink",
    initials: "SL",
    category: "ANDROID · DIGITAL SAFETY",
    path: "sunhan2002-cyber / safelink",
    description: "대화 속 사기와 관계 통제의 위험 신호를 탐지하고 판단 근거와 대응 방법을 연결하는 Android 안전 지원 앱입니다.",
    tags: ["KOTLIN", "ML KIT OCR", "SAFETY"],
    accent: "#d8ff3e",
    github: "https://github.com/sunhan2002-cyber/safelink"
  },
  {
    period: "PROJECT 03 · 2026.09.19",
    repo: "SafeRoad",
    initials: "SR",
    category: "WEB · SAFE ROUTE",
    path: "hansung-SafeRoad / saferoad",
    description: "유동인구 데이터와 위험 정보를 활용해 보행자가 더 안전한 이동 경로를 선택하도록 돕는 경로 추천 서비스입니다.",
    tags: ["SAFETY", "ROUTE", "RISK DATA"],
    accent: "#5fe1c2",
    github: "https://github.com/hansung-SafeRoad/saferoad"
  },
  {
    period: "PROJECT 04 · 2026.09.19",
    repo: "FITWISE",
    initials: "FW",
    category: "AI · FASHION DECISION",
    path: "kimwooyoung-wq / fitwise",
    description: "사용자의 상황·체형·예산을 반영해 의류 탐색, 적합도 판단과 코디 추천을 연결하는 AI 패션 서비스입니다.",
    tags: ["REACT NATIVE", "FASTAPI", "POSTGRESQL"],
    accent: "#56aef4",
    github: "https://github.com/kimwooyoung-wq/fitwise"
  },
  {
    period: "PROJECT 05 · 2026.09.20",
    repo: "인생게임",
    initials: "LG",
    category: "ANDROID · LIFE GAME",
    path: "sunhan2002-cyber / hansung-lifegame",
    description: "목표와 습관을 게임의 성장 구조로 전환해 일상의 실천을 꾸준히 기록하도록 돕는 Android 텍스트 게임입니다.",
    tags: ["KOTLIN", "GROWTH", "GAMIFICATION"],
    accent: "#b897ff",
    github: "https://github.com/sunhan2002-cyber/hansung-lifegame"
  }
];

const positionFor = index => 6 + (index * 90) / (projects.length - 1);
const introLayer = document.querySelector("#intro-milestones");
const projectGrid = document.querySelector("#project-grid");

projects.forEach((project, index) => {
  const position = positionFor(index);
  const arrival = .35 + (position / 100) * 3.55;
  const button = document.createElement("button");
  button.className = `intro-milestone${index === projects.length - 1 ? " intro-milestone-now" : ""}`;
  button.style.cssText = `--position:${position}%;--arrival:${arrival.toFixed(2)}s`;
  button.dataset.project = String(index);
  button.setAttribute("aria-label", `${project.repo} 미리보기 및 GitHub 저장소 열기`);
  button.title = `${project.repo} GitHub 열기`;
  button.innerHTML = `<span class="intro-dot"></span><span class="intro-ring"></span><span class="intro-label">${String(index + 1).padStart(2, "0")}</span>`;
  introLayer.append(button);

  const card = document.createElement("a");
  card.className = "project-tile";
  card.id = `project-${index + 1}`;
  card.href = project.github;
  card.target = "_blank";
  card.rel = "noreferrer";
  card.style.setProperty("--accent", project.accent);
  card.setAttribute("aria-label", `${project.repo} GitHub 저장소 열기`);
  card.innerHTML = `
    <span class="tile-mark">${project.initials}</span>
    <span class="tile-copy">
      <small>${project.category}</small>
      <strong>${project.repo}</strong>
      <span>${project.path}</span>
    </span>
    <span class="tile-arrow" aria-hidden="true">↗</span>
  `;
  projectGrid.append(card);
});

const preview = document.querySelector("#intro-preview");
const previewVisual = document.querySelector("#preview-visual");
const previewNumber = document.querySelector("#preview-visual-number");
const previewInitials = document.querySelector("#preview-initials");
const previewIndex = document.querySelector("#intro-preview-index");
const previewTitle = document.querySelector("#intro-preview-title");
const previewDescription = document.querySelector("#intro-preview-description");
const previewTags = document.querySelector("#intro-preview-tags");
const previewGithub = document.querySelector("#intro-preview-github");
const introMilestones = [...document.querySelectorAll(".intro-milestone")];
let hideTimer;

function showPreview(index) {
  window.clearTimeout(hideTimer);
  const project = projects[index];
  const position = positionFor(index);
  const isCompact = window.matchMedia("(max-width: 800px)").matches;
  preview.style.left = isCompact ? "50%" : `${Math.min(84, Math.max(16, position))}%`;
  preview.style.setProperty("--accent", project.accent);
  previewVisual.style.setProperty("--accent", project.accent);
  previewNumber.textContent = String(index + 1).padStart(2, "0");
  previewInitials.textContent = project.initials;
  previewIndex.textContent = project.period;
  previewTitle.textContent = project.repo;
  previewDescription.textContent = project.description;
  previewTags.replaceChildren(...project.tags.map(tag => {
    const span = document.createElement("span");
    span.textContent = tag;
    return span;
  }));
  previewGithub.href = project.github;
  previewGithub.setAttribute("aria-label", `${project.repo} GitHub 저장소 열기`);
  preview.classList.add("is-visible");
}

function scheduleHide() {
  hideTimer = window.setTimeout(() => preview.classList.remove("is-visible"), 110);
}

introMilestones.forEach((button, index) => {
  button.addEventListener("mouseenter", () => showPreview(index));
  button.addEventListener("focus", () => showPreview(index));
  button.addEventListener("mouseleave", scheduleHide);
  button.addEventListener("blur", scheduleHide);
  button.addEventListener("click", () => {
    window.open(projects[index].github, "_blank", "noopener,noreferrer");
  });
  button.addEventListener("keydown", event => {
    if (event.key === "ArrowRight") { event.preventDefault(); introMilestones[(index + 1) % projects.length].focus(); }
    if (event.key === "ArrowLeft") { event.preventDefault(); introMilestones[(index - 1 + projects.length) % projects.length].focus(); }
  });
});

preview.addEventListener("mouseenter", () => window.clearTimeout(hideTimer));
preview.addEventListener("mouseleave", scheduleHide);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.target.classList.toggle("is-visible", entry.isIntersecting));
}, { threshold: .12 });
document.querySelectorAll(".intro-copy, .section-heading, .project-grid, .about-grid").forEach(element => observer.observe(element));
