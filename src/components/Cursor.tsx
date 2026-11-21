import { useEffect, useRef, useState } from "react";
import "./styles/Cursor.css";

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

const Cursor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Touch devices fallback (native touch gestures)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    const star = starRef.current;
    if (!canvas || !star) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    const mouse = { x: -100, y: -100 };
    const prevMouse = { x: -100, y: -100 };
    const trail: TrailPoint[] = [];
    const sparks: Spark[] = [];
    let currentAngle = 0;

    const colors = ["#c2a4ff", "#a855f7", "#e9d5ff", "#ffffff", "#38bdf8"];

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setIsVisible(true);

      const dx = mouse.x - prevMouse.x;
      const dy = mouse.y - prevMouse.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Angle orientation in direction of movement like a rocket/shooting star
      if (speed > 1.5) {
        const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 45;
        // Smooth angle rotation
        let diff = targetAngle - currentAngle;
        while (diff < -180) diff += 360;
        while (diff > 180) diff -= 360;
        currentAngle += diff * 0.35;
      }

      // Add trail point
      trail.push({ x: mouse.x, y: mouse.y, time: performance.now() });

      // Spawn stardust sparks when moving fast
      if (speed > 3 && Math.random() < 0.6) {
        sparks.push({
          x: mouse.x + (Math.random() - 0.5) * 8,
          y: mouse.y + (Math.random() - 0.5) * 8,
          vx: -dx * 0.15 + (Math.random() - 0.5) * 1.5,
          vy: -dy * 0.15 + (Math.random() - 0.5) * 1.5,
          size: Math.random() * 3 + 1.5,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.03,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;

      // Update star head position & rotation instantly
      star.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) rotate(${currentAngle}deg)`;
    };

    const onMouseDown = () => {
      setIsClicked(true);
      // Burst star sparks on click
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12 + (Math.random() - 0.5);
        const speed = Math.random() * 3.5 + 2;
        sparks.push({
          x: mouse.x,
          y: mouse.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3.5 + 2,
          alpha: 1,
          decay: 0.035,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [data-cursor], input, textarea, select, .work-image-in, .carousel-btn, .carousel-dot-btn, .work-btn, .social-icons a, .resume-button"
      );
      setIsHovered(!!interactive);
    };
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    // Main 60FPS render loop for neon trail line & sparks
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = performance.now();
      const maxAge = 260; // Trail duration in ms

      // Filter old trail points
      while (trail.length > 0 && now - trail[0].time > maxAge) {
        trail.shift();
      }

      // Draw Glowing Rocket / Shooting Star Neon Trail
      if (trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          const p1 = trail[i - 1];
          const p2 = trail[i];
          const ageRatio = (now - p2.time) / maxAge;
          const progress = 1 - Math.min(Math.max(ageRatio, 0), 1); // 1 at cursor, 0 at tail

          if (progress <= 0) continue;

          // Outer glowing aura beam
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = progress * 6;
          ctx.strokeStyle = `rgba(168, 85, 247, ${progress * 0.45})`;
          ctx.shadowColor = "#c2a4ff";
          ctx.shadowBlur = 12;
          ctx.stroke();

          // Inner bright core streak
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineWidth = progress * 2.2;
          ctx.strokeStyle = `rgba(255, 255, 255, ${progress * 0.95})`;
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 6;
          ctx.stroke();
        }
      }

      // Update & render stardust sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.94;
        s.vy *= 0.94;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(s.alpha, 0);

        // Draw 4-point micro star spark
        const r = s.size;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - r);
        ctx.quadraticCurveTo(s.x, s.y, s.x + r, s.y);
        ctx.quadraticCurveTo(s.x, s.y, s.x, s.y + r);
        ctx.quadraticCurveTo(s.x, s.y, s.x - r, s.y);
        ctx.quadraticCurveTo(s.x, s.y, s.x, s.y - r);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="cursor-canvas" />
      <div
        ref={starRef}
        className={`cursor-star ${isHovered ? "star-hovered" : ""} ${
          isClicked ? "star-clicked" : ""
        } ${isVisible ? "cursor-visible" : ""}`}
      >
        <svg
          viewBox="0 0 32 32"
          className="star-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#c2a4ff" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Outer Star Aura */}
          <path
            d="M16 2 C16 10, 10 16, 2 16 C10 16, 16 22, 16 30 C16 22, 22 16, 30 16 C22 16, 16 10, 16 2 Z"
            fill="url(#starGradient)"
            filter="url(#starGlow)"
          />
          {/* Inner Bright Spark Core */}
          <path
            d="M16 7 C16 12, 12 16, 7 16 C12 16, 16 20, 16 25 C16 20, 20 16, 25 16 C20 16, 16 12, 16 7 Z"
            fill="#ffffff"
          />
          <circle cx="16" cy="16" r="2.5" fill="#ffffff" />
        </svg>
      </div>
    </>
  );
};

export default Cursor;
