'use client';

import { useEffect } from "react";

export default function GlobalCursor() {
  useEffect(() => {
    const canUseCustomCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!canUseCustomCursor) return;

    let cursor: HTMLDivElement | null = null;
    let cursorVisible = false;

    const initCursor = () => {
      if (cursor) return;

      cursor = document.createElement('div');
      cursor.id = 'global-cursor';
      cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 1.5px solid #fff;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        mix-blend-mode: difference;
        transition: transform 0.15s ease-out, width 0.2s ease-out, height 0.2s ease-out, background 0.2s ease-out;
        transform: translate(-50%, -50%);
        display: none;
      `;
      document.body.appendChild(cursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      initCursor();
      if (!cursor) return;

      cursor.style.display = 'block';
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursorVisible = true;
    };

    const handleMouseLeave = () => {
      if (cursor) {
        cursor.style.display = 'none';
        cursorVisible = false;
      }
    };

    const handleMouseEnter = () => {
      if (cursor && cursorVisible) {
        cursor.style.display = 'block';
      }
    };

    const handleMouseDown = () => {
      if (cursor) {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
      }
    };

    const handleMouseUp = () => {
      if (cursor) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    const handleHoverStart = (e: MouseEvent) => {
      if (!cursor) return;
      const target = e.target as Element;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select');

      if (isInteractive) {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.background = 'rgba(255, 255, 255, 0.1)';
        cursor.style.borderColor = '#c9a962';
      } else {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.background = 'transparent';
        cursor.style.borderColor = '#fff';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleHoverStart);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleHoverStart);

      if (cursor) {
        cursor.remove();
        cursor = null;
      }
    };
  }, []);

  return null;
}
