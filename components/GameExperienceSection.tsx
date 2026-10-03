import type { CSSProperties } from "react";

type GameExperience = {
  title: string;
  genre: string;
  platform: "PC" | "MOBILE" | "CONSOLE";
  period: string;
  hours?: number;
};

const gameExperience: GameExperience[] = [
  { title: "로스트아크", genre: "MMORPG", platform: "PC", period: "2021.01 – 2023.03", hours: 3312 },
  { title: "에픽세븐", genre: "턴제 RPG", platform: "MOBILE", period: "2025.10 – 2026.02", hours: 67.5 },
  { title: "승리의 여신: 니케", genre: "FPS / TPS", platform: "MOBILE", period: "2023.05 – 2023.12" },
  { title: "로드오브다이스", genre: "보드 액션 RPG", platform: "MOBILE", period: "2017.03 – 2019.02" },
  { title: "제우스: 오만의 신", genre: "RPG", platform: "MOBILE", period: "플레이 경험 기록" },
];

const otherExperience = [
  {
    title: "STEAM",
    summary: "스팀 소유 게임 60+ · 100시간 이상 플레이 게임 10종",
    games: [["데이브 더 다이버", "루마섬", "돈스타브 투게더", "팰월드", "스타듀밸리", "호그와트 레거시", "발헤임", "포더킹", "리썰 컴퍼니"]],
  },
  {
    title: "NINTENDO",
    summary: "다양한 Nintendo 타이틀 플레이 경험",
    games: [["모여봐요 동물의 숲", "포켓몬스터 시리즈", "젤다의 전설 시리즈", "마리오 시리즈", "리틀 나이트메어 시리즈", "프린세스 메이커 시리즈"]],
  },
  {
    title: "PC ONLINE",
    summary: "PC 온라인 게임 플레이 경험",
    games: [
      ["바람의나라", "메이플스토리", "마비노기", "귀혼", "라테일", "마비노기 영웅전", "테라", "아키에이지", "메이플스토리2"],
      ["테일즈런너", "엘리샤", "하트비트", "오디션"],
    ],
  },
];

const maxHours = Math.max(...gameExperience.map((game) => game.hours ?? 0));
const summaryStats = [
  { value: "80+", label: "플레이한 게임" },
  { value: `${maxHours.toLocaleString()}h+`, label: "최장 플레이 기록" },
  { value: "10+", label: "100시간 이상 플레이한 게임" },
  { value: "PC · MOBILE · CONSOLE", label: "플랫폼 경험", compact: true },
];

export function GameExperienceSection() {
  return (
    <section id="game-experience" className="game-experience-section" data-scroll-scene aria-labelledby="game-experience-title">
      <div className="game-experience-shell">
        <header className="game-experience-header">
          <p>GAME EXPERIENCE</p>
          <h2 id="game-experience-title">플레이어로 쌓아온 게임 경험</h2>
          <span>다양한 장르와 플랫폼의 게임을 직접 플레이하며 유저의 입장에서 여러 서비스와 콘텐츠를 경험해왔습니다.</span>
        </header>

        <div className="experience-stats" aria-label="게임 경험 요약">
          {summaryStats.map((stat, index) => (
            <article key={stat.label} style={{ "--item-index": index } as CSSProperties}>
              <strong className={stat.compact ? "is-compact" : undefined}>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>

        <div className="experience-block-heading">
          <span>SELECTED PLAY HISTORY</span>
          <h3>대표 플레이 이력</h3>
        </div>
        <div className="experience-game-grid">
          {gameExperience.map((game, index) => (
              <article className="experience-game-card" key={game.title} style={{ "--item-index": index } as CSSProperties}>
                <header>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h4>{game.title}</h4>
                </header>
                <div className="experience-tags"><span>{game.genre}</span><span>{game.platform}</span></div>
                <dl>
                  <div><dt>PLAY PERIOD</dt><dd>{game.period}</dd></div>
                  <div><dt>PLAY TIME</dt><dd>{game.hours ? `${game.hours.toLocaleString()}시간` : "기간 중심 경험"}</dd></div>
                </dl>
              </article>
          ))}
        </div>

        <div className="experience-lower-grid">
          <section className="experience-other" aria-labelledby="other-play-title">
            <div className="experience-block-heading">
              <span>MORE PLAY HISTORY</span>
              <h3 id="other-play-title">그 외 플레이 경험</h3>
            </div>
            <div className="experience-other-list">
              {otherExperience.map((group) => (
                <article key={group.title}>
                  <header><strong>{group.title}</strong><span>{group.summary}</span></header>
                  {group.games.map((games, index) => <p key={`${group.title}-${index}`}>{games.join(" · ")}</p>)}
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
