import { useEffect, useRef } from 'react';

/**
 * KH Studio スプラッシュスクリーン
 * 星空アニメーション + 軌道ロゴ + ワードマーク
 * @param {{ onComplete: () => void }} props
 */
export default function SplashScreen({ onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      o: Math.random() * 0.5 + 0.1,
      s: Math.random() * 0.0003 + 0.0001,
      p: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;
      stars.forEach((s) => {
        const opacity = s.o * (0.6 + 0.4 * Math.sin(t * s.s * 100 + s.p));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    draw();

    const timer = setTimeout(onComplete, 5000);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="splash-container">
      <canvas ref={canvasRef} className="stars-canvas" />
      <div className="stage">
        <div className="ambient" />

        {/* Orbital Logo */}
        <div className="logo-wrap">
          <svg viewBox="0 0 220 220" fill="none">
            <defs>
              <radialGradient id="cg" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#00e5ff" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={110} cy={110} r={90} fill="url(#cg)" />

            <g className="r1">
              <ellipse cx={110} cy={110} rx={98} ry={38}
                stroke="#00e5ff" strokeWidth="0.9" strokeOpacity="0.5" strokeDasharray="5 4" />
            </g>
            <g className="r2" style={{ transform: 'rotate(-40deg)', transformOrigin: '110px 110px' }}>
              <ellipse cx={110} cy={110} rx={86} ry={30}
                stroke="#80f4ff" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="3 6" />
            </g>
            <g className="r3" style={{ transform: 'rotate(70deg)', transformOrigin: '110px 110px' }}>
              <ellipse cx={110} cy={110} rx={74} ry={26}
                stroke="#00e5ff" strokeWidth="0.6" strokeOpacity="0.2" strokeDasharray="2 7" />
            </g>

            <circle cx={110} cy={110} r={38} fill="#000" stroke="#00e5ff" strokeWidth="1.5" />
            <text
              x={110} y={120}
              fontFamily="Orbitron" fontSize="24" fontWeight="900"
              fill="white" textAnchor="middle" letterSpacing="3"
            >
              KH
            </text>
          </svg>
        </div>

        {/* Wordmark */}
        <div className="wordmark">
          <div className="name">KH <span>Studio</span></div>
          <div className="rule" />
          <div className="sub">AI &amp; App Engineering</div>
        </div>
      </div>
    </div>
  );
}
