import React, { useEffect, useRef } from "react";

/**
 * NAYAAnimatedBiometricBackground.jsx
 * --------------------------------------------------------------
 * Fullscreen animated background that blends your static image
 * (/bg/fingeriris.png) with iris/fingerprint-style rings, particles,
 * and a scanning sweep. No external dependencies.
 *
 * Props:
 *  - imageUrl: string (path to background image in /public)
 *  - primary: string (hex accent color)
 *  - secondary: string (hex accent color 2)
 *  - density: number (0.5..2) amount of particles/rings
 *  - speed: number (0.5..2) animation speed
 *  - overlayOpacity: number (0..1) dark overlay for text contrast
 */
export default function NAYAAnimatedBiometricBackground({
  imageUrl = "/bg/fingeriris.png",
  primary = "#38bdf8",
  secondary = "#a78bfa",
  density = 1,
  speed = 1,
  overlayOpacity = 0.55,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    let w = 0,
      h = 0,
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onResize = () => resize();
    resize();
    window.addEventListener("resize", onResize);

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Pause when tab is hidden (saves battery)
    let paused = document.hidden || prefersReducedMotion;
    const onVisibilityChange = () => {
      paused = document.hidden || prefersReducedMotion;
      if (!paused) {
        // resume loop
        last = performance.now();
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // ---- Assets
    const img = new Image();
    img.src = imageUrl;

    // ---- Scene elements
    const baseCount = Math.floor(70 * density);
    const particles = new Array(baseCount).fill(0).map(() => {
      const r = Math.min(w, h) * (0.15 + 0.6 * Math.random());
      const a = Math.random() * Math.PI * 2;
      const s = (0.12 + Math.random() * 0.55) * speed; // angular speed
      const size = 1 + Math.random() * 2.2;
      const hueMix = Math.random();
      return { r, a, s, size, hueMix };
    });

    const rings = new Array(Math.max(6, Math.floor(12 * density)))
      .fill(0)
      .map((_, i) => ({
        r: 42 + i * (Math.min(w, h) / (17 / density)),
        rotSpeed: ((i % 2 ? -1 : 1) * (0.25 + i * 0.035)) * speed,
        dash: 6 + (i % 3) * 4,
        gap: 12 + (i % 4) * 8,
        alpha: 0.06 + (i % 3) * 0.03,
      }));

    const mix = (c1, c2, t) => {
      const p = (h) => [
        parseInt(h.slice(1, 3), 16),
        parseInt(h.slice(3, 5), 16),
        parseInt(h.slice(5, 7), 16),
      ];
      const [r1, g1, b1] = p(c1),
        [r2, g2, b2] = p(c2);
      const r = Math.round(r1 + (r2 - r1) * t);
      const g = Math.round(g1 + (g2 - g1) * t);
      const b = Math.round(b1 + (b2 - b1) * t);
      return `rgb(${r},${g},${b})`;
    };

    // ---- Draw helpers
    const drawImageLayer = (now) => {
      // Parallax drift
      const driftX = Math.sin((now / 8000) * speed) * 10;
      const driftY = Math.cos((now / 9000) * speed) * 8;

      if (img.complete && img.naturalWidth > 0) {
        // cover
        const ratio = Math.max(w / img.width, h / img.height);
        const iw = img.width * ratio;
        const ih = img.height * ratio;
        const ix = (w - iw) / 2 + driftX;
        const iy = (h - ih) / 2 + driftY;
        ctx.drawImage(img, ix, iy, iw, ih);
      } else {
        // fallback gradient
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, "#07121f");
        grad.addColorStop(1, "#0b1730");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // dark overlay for contrast
      ctx.fillStyle = `rgba(0,0,0,${overlayOpacity})`;
      ctx.fillRect(0, 0, w, h);
    };

    const drawScanSweep = (cx, cy, now) => {
      const radius = Math.min(w, h) * 0.58;
      const angle = ((now / 2800) * speed) % (Math.PI * 2);
      const grad = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.15,
        cx,
        cy,
        radius
      );
      grad.addColorStop(0, "rgba(255,255,255,0.05)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, -0.28, 0.28);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    const drawRings = (cx, cy, now) => {
      rings.forEach((ring, i) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(((now / 1000) * ring.rotSpeed * Math.PI) / 180);
        ctx.lineWidth = 1.2 + (i % 2) * 0.8;
        ctx.strokeStyle = `rgba(255,255,255,${ring.alpha})`;
        ctx.setLineDash([ring.dash, ring.gap]);
        ctx.beginPath();
        ctx.arc(0, 0, ring.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });
    };

    const drawParticles = (cx, cy, dt) => {
      particles.forEach((p) => {
        p.a += (p.s * dt) / 1000;
        const x = cx + Math.cos(p.a) * p.r;
        const y = cy + Math.sin(p.a) * p.r;

        // tail
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
          cx + Math.cos(p.a - 0.16) * (p.r - 8),
          cy + Math.sin(p.a - 0.16) * (p.r - 8)
        );
        ctx.strokeStyle = `rgba(255,255,255,${0.05 + p.hueMix * 0.07})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // node
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = mix(primary, secondary, p.hueMix);
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    };

    const drawCore = (cx, cy, now) => {
      const coreR = Math.min(w, h) * 0.095;
      const pulse = 0.5 + 0.5 * Math.sin((now / 700) * speed);
      const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 1.7);
      rg.addColorStop(0, `${primary}AA`);
      rg.addColorStop(1, `${secondary}00`);
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 1.7, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = mix(primary, secondary, pulse);
      ctx.setLineDash([8, 10]);
      ctx.beginPath();
      ctx.arc(cx, cy, coreR + pulse * 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    let last = performance.now();
    const loop = (now) => {
      if (paused) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      const dt = now - last;
      last = now;

      // clear
      ctx.clearRect(0, 0, w, h);

      // layers
      drawImageLayer(now);
      const cx = w / 2,
        cy = h / 2;
      drawRings(cx, cy, now);
      drawScanSweep(cx, cy, now);
      drawCore(cx, cy, now);
      drawParticles(cx, cy, dt);

      // outer glow ring
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.46, 0, Math.PI * 2);
      ctx.strokeStyle = `${primary}22`;
      ctx.lineWidth = 6;
      ctx.stroke();

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [density, imageUrl, overlayOpacity, primary, secondary, speed]);

  return (
    <div className="fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* top/bottom gradients for readability over content */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
    </div>
  );
}
