"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TechIcon } from "@/components/ui/TechIcon";

const rulesCategories = [
  {
    id: "basics",
    icon: "football",
    title: "Game Basics",
    color: "#F5A623",
    rules: [
      { title: "Team Size", text: "Each team fields 5 players. Min 4 to start a game. No blocking allowed." },
      { title: "Field Dimensions", text: "70 yards long × 30 yards wide, with two 10-yard end zones. First-down markers at 20-yard intervals." },
      { title: "Game Clock", text: "Two 20-minute halves with a running clock. Clock stops on incomplete passes, out of bounds, and penalties in last 2 minutes." },
      { title: "Scoring", text: "Touchdown = 6 pts. Extra point (5 yards) = 1 pt. Extra point (12 yards) = 2 pts. Safety = 2 pts." },
      { title: "First Downs", text: "Teams have 4 downs to cross the next zone line (every 20 yards) for a first down." },
      { title: "No Contact", text: "No blocking, tackling, or diving. All contact results in a penalty. The game is about speed and agility." },
    ],
  },
  {
    id: "flags",
    icon: "flag",
    title: "Flag Pulling",
    color: "#E63946",
    rules: [
      { title: "Legal Flag Pull", text: "A flag pull anywhere on the field stops the play. The ball is spotted where the flag was pulled." },
      { title: "Flag Guarding", text: "Runners cannot guard their flags with hands, arms, or the ball. Penalty: 10-yard loss from spot of foul." },
      { title: "Flag Equipment", text: "Each player wears a belt with two flags. Flags must hang freely and be visible at all times." },
      { title: "Downed Player", text: "If a flag falls off naturally, the player is down when touched with one hand by a defender." },
      { title: "No Diving", text: "Ball carriers cannot dive to advance the ball. The play is dead at the spot of the dive." },
    ],
  },
  {
    id: "passing",
    icon: "wind",
    title: "Passing & Receiving",
    color: "#00E5FF",
    rules: [
      { title: "Forward Pass", text: "Only one forward pass per down, must be thrown from behind the line of scrimmage." },
      { title: "Laterals", text: "Unlimited lateral passes allowed behind or at the line of scrimmage." },
      { title: "Eligible Receivers", text: "All players are eligible receivers, including the quarterback after a handoff." },
      { title: "Interceptions", text: "Interceptions can be returned. In the end zone, the defender can return or take a touchback at the 5-yard line." },
      { title: "Incomplete Pass", text: "Clock stops on incomplete passes. Ball returns to the previous line of scrimmage." },
    ],
  },
  {
    id: "rushing",
    icon: "runner",
    title: "Rushing & Blitzing",
    color: "#7B2FBE",
    rules: [
      { title: "Rush Line", text: "Defensive rushers must start 7 yards from the line of scrimmage (marked by a designated rush line)." },
      { title: "Blitz Rules", text: "Any number of players may rush once the ball is snapped, but must start behind the rush line." },
      { title: "Direct Runs", text: "The quarterback cannot run directly. A handoff or lateral must occur first before any player can rush." },
      { title: "No Run Zones", text: "Within 5 yards of each end zone and midfield, no running plays allowed — must pass." },
      { title: "Sack", text: "If the QB is de-flagged behind the scrimmage line, it's a sack. Loss of down, ball spotted at flag pull." },
    ],
  },
  {
    id: "penalties",
    icon: "warning",
    title: "Penalties",
    color: "#FF6B35",
    rules: [
      { title: "Offsides", text: "5-yard penalty. Occurs when any player crosses the line of scrimmage before the snap." },
      { title: "Pass Interference", text: "10-yard penalty from line of scrimmage (defense). Ball at spot of foul (offense)." },
      { title: "Illegal Contact", text: "10-yard penalty. Any holding, pushing, or bumping of receivers or defenders." },
      { title: "Delay of Game", text: "5-yard penalty. Offense has 25 seconds from the ref's whistle to snap the ball." },
      { title: "Unsportsmanlike Conduct", text: "15-yard penalty. Fighting, taunting, or abusive language. Two UCPs = ejection." },
      { title: "Flag Guarding", text: "10-yard penalty from the spot of the foul. Runner cannot protect flags in any way." },
    ],
  },
];

const quizQuestions = [
  { q: "How many players per team on the field?", options: ["4", "5", "6", "7"], answer: 1 },
  { q: "What happens if a flag falls off naturally?", options: ["Play continues normally", "Player is out", "One-hand touch rule applies", "Automatic first down"], answer: 2 },
  { q: "How far is the rush line from scrimmage?", options: ["5 yards", "7 yards", "10 yards", "3 yards"], answer: 1 },
  { q: "Can the QB run directly with the ball?", options: ["Yes, anytime", "Only on 4th down", "No, must hand off first", "Only in the red zone"], answer: 2 },
  { q: "What is the penalty for flag guarding?", options: ["5 yards", "10 yards from spot", "15 yards", "Loss of down only"], answer: 1 },
  { q: "How many points is a safety worth?", options: ["1 point", "2 points", "3 points", "6 points"], answer: 1 },
  { q: "What are No Run Zones?", options: ["Areas near sidelines", "5 yards from end zones & midfield", "The entire field", "Behind the rush line"], answer: 1 },
  { q: "How long is the play clock?", options: ["15 seconds", "20 seconds", "25 seconds", "30 seconds"], answer: 2 },
  { q: "What is the penalty for unsportsmanlike conduct?", options: ["5 yards", "10 yards", "15 yards", "Automatic ejection"], answer: 2 },
  { q: "Can interceptions be returned?", options: ["No, dead ball", "Yes, they can be returned", "Only in the 4th quarter", "Only by the QB"], answer: 1 },
];

function RulesExplorer() {
  const [activeCategory, setActiveCategory] = useState("basics");
  const cat = rulesCategories.find((c) => c.id === activeCategory)!;

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {rulesCategories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className="of-glass px-4 py-3 flex items-center gap-2 transition-all cursor-pointer"
            style={{
              borderColor: activeCategory === c.id ? c.color : undefined,
              boxShadow: activeCategory === c.id ? `0 0 20px ${c.color}30` : undefined,
            }}
          >
            <TechIcon name={c.icon} size={16} color={activeCategory === c.id ? c.color : "#8B949E"} />
            <span className="text-sm font-semibold" style={{ color: activeCategory === c.id ? c.color : "#8B949E" }}>
              {c.title}
            </span>
          </button>
        ))}
      </div>

      {/* Rules Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-4"
        >
          {cat.rules.map((rule, i) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="of-glass p-5"
              style={{ borderLeft: `3px solid ${cat.color}` }}
            >
              <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ color: cat.color, background: `${cat.color}15` }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {rule.title}
              </h4>
              <p className="text-sm text-[var(--of-text-muted)] leading-relaxed">{rule.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Quiz() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === quizQuestions[current].answer;
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      setAnswers((a) => [...a, idx]);
      if (current < quizQuestions.length - 1) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  const resetQuiz = () => {
    setStarted(false);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (!started) {
    return (
      <div className="of-glass p-8 text-center">
        <div className="mb-4 flex justify-center"><TechIcon name="clipboard" size={44} color="var(--of-gold)" container="hex" /></div>
        <h3 className="of-heading-md text-white mb-2">Rules Mastery Quiz</h3>
        <p className="of-body-lg mb-6 max-w-md mx-auto">
          Test your flag football knowledge! Score 80%+ to earn the <span className="text-[var(--of-gold)] font-bold">Rules Expert NFT</span>.
        </p>
        <div className="flex items-center justify-center gap-4 mb-6 text-sm text-[var(--of-text-dim)]">
          <span className="inline-flex items-center gap-1"><TechIcon name="clipboard" size={12} color="var(--of-text-dim)" /> 10 Questions</span>
          <span className="inline-flex items-center gap-1"><TechIcon name="timer" size={12} color="var(--of-text-dim)" /> No Time Limit</span>
          <span className="inline-flex items-center gap-1"><TechIcon name="trophy" size={12} color="var(--of-text-dim)" /> NFT Reward</span>
        </div>
        <button onClick={() => setStarted(true)} className="of-btn-shimmer px-8 py-3 text-sm font-bold uppercase tracking-wider">
          Start Quiz
        </button>
      </div>
    );
  }

  if (showResult) {
    const pct = Math.round((score / quizQuestions.length) * 100);
    const passed = pct >= 80;
    return (
      <div className="of-glass p-8 text-center">
        <div className="mb-4 flex justify-center">
          <TechIcon name={passed ? "trophy" : "book"} size={44} color={passed ? "#2EC4B6" : "#F5A623"} container="hex" />
        </div>
        <h3 className="of-heading-md text-white mb-2">{passed ? "Rules Expert!" : "Keep Studying!"}</h3>
        <div className="text-5xl font-black mb-2" style={{ color: passed ? "#2EC4B6" : "#E63946" }}>
          {score}/{quizQuestions.length}
        </div>
        <p className="of-body-lg mb-6">
          {passed
            ? "You earned the Rules Expert NFT! Check your collection."
            : `You scored ${pct}%. Study the rules above and try again for the NFT!`}
        </p>
        {passed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block of-glass p-4 mb-6"
            style={{ borderColor: "#F5A623", boxShadow: "0 0 30px rgba(245,166,35,0.3)" }}
          >
            <div className="flex justify-center"><TechIcon name="book" size={24} color="var(--of-gold)" /></div>
            <div className="text-xs font-bold text-[var(--of-gold)] mt-1">RULES EXPERT NFT</div>
            <div className="text-[10px] text-[var(--of-text-dim)]">RARE</div>
          </motion.div>
        )}
        <div>
          <button onClick={resetQuiz} className="of-btn-shimmer px-6 py-3 text-sm font-bold uppercase tracking-wider">
            {passed ? "Play Again" : "Try Again"}
          </button>
        </div>
      </div>
    );
  }

  const q = quizQuestions[current];

  return (
    <div className="of-glass p-8">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-[var(--of-text-muted)]">
          Question {current + 1} of {quizQuestions.length}
        </span>
        <span className="text-sm font-bold text-[var(--of-gold)]">Score: {score}</span>
      </div>
      <div className="h-1 rounded-full bg-[var(--of-bg-elevated)] mb-8">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--of-gradient-gold)" }}
          animate={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }}
        />
      </div>

      <h3 className="text-lg font-bold text-white mb-6">{q.q}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === q.answer;
          const showFeedback = selected !== null;

          let bg = "var(--of-bg-elevated)";
          let border = "transparent";
          if (showFeedback && isCorrect) { bg = "rgba(46,196,182,0.15)"; border = "#2EC4B6"; }
          if (showFeedback && isSelected && !isCorrect) { bg = "rgba(230,57,70,0.15)"; border = "#E63946"; }

          return (
            <motion.button
              key={i}
              whileHover={!showFeedback ? { scale: 1.02 } : {}}
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(i)}
              className="p-4 rounded-xl text-left text-sm font-medium transition-all cursor-pointer"
              style={{
                background: bg,
                border: `1px solid ${border}`,
                color: showFeedback && isCorrect ? "#2EC4B6" : showFeedback && isSelected ? "#E63946" : "#E6EDF3",
              }}
            >
              <span className="mr-2 text-[var(--of-text-dim)]">{String.fromCharCode(65 + i)}.</span>
              {opt}
              {showFeedback && isCorrect && <span className="float-right">Correct</span>}
              {showFeedback && isSelected && !isCorrect && <span className="float-right">Wrong</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default function RulesPage() {
  const [tab, setTab] = useState<"rules" | "quiz">("rules");

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="of-container">
          <div className="mb-8">
            <h1 className="of-heading-md text-white mb-2 inline-flex items-center gap-2">
              <TechIcon name="football" size={22} color="var(--of-gold)" />
              Flag Football Rules
            </h1>
            <p className="of-body-lg">Master the rules, pass the quiz, earn the Rules Expert NFT.</p>
          </div>

          {/* Tab Switch */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setTab("rules")}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
              style={{
                background: tab === "rules" ? "var(--of-gradient-gold)" : "var(--of-bg-elevated)",
                color: tab === "rules" ? "#0A0A0F" : "#8B949E",
              }}
            >
              Rules
            </button>
            <button
              onClick={() => setTab("quiz")}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
              style={{
                background: tab === "quiz" ? "var(--of-gradient-gold)" : "var(--of-bg-elevated)",
                color: tab === "quiz" ? "#0A0A0F" : "#8B949E",
              }}
            >
              Quiz
            </button>
          </div>

          {tab === "rules" ? <RulesExplorer /> : <Quiz />}
        </div>
      </main>
      <Footer />
    </>
  );
}
