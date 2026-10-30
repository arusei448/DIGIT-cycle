// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import './loading-screen.scss';

const RAMP_MS      = 5200;
const FAKE_CEILING = 92;
const FINISH_MS    = 300;

interface LoadingScreenProps {
    ready?: boolean;
    onDone?: () => void;
}

const PHRASES = [
    'Initializing trading engines...',
    'Connecting to live markets...',
    'Loading AI signal scanner...',
    'Syncing real-time data feeds...',
    'Calibrating market algorithms...',
    'Warming up execution systems...',
    'Preparing your trading environment...',
    'Almost ready — stand by...',
];

/* Phase-2 feature cards (6 cards matching the screenshot) */
const P2_LEFT = [
    { icon: '📊', title: 'Market Analysis', sub: 'Real-time data' },
    { icon: '🔒', title: 'Secure Platform', sub: 'Encrypted & safe' },
    { icon: '⚡', title: 'Fast Execution', sub: 'Speed matters' },
];
const P2_RIGHT = [
    { icon: '🎯', title: 'Precise Strategy', sub: 'Accurate signals' },
    { icon: '👥', title: 'Copy Trading', sub: 'Follow experts' },
    { icon: '🏆', title: 'Grow Together', sub: 'Win as a team' },
];

/* ─── Phase 2 loading screen ─── */
const Phase2Screen: React.FC<{ progress: number; phraseIdx: number }> = ({ progress, phraseIdx }) => (
    <div className='ls2-page'>
        {/* Top-right tagline */}
        <div className='ls2-tagline'>
            TRUST THE PLAN<br />TRADE THE FUTURE
        </div>

        {/* Left feature cards */}
        <div className='ls2-left-cards'>
            {P2_LEFT.map((c, i) => (
                <div key={i} className='ls2-feat-card'>
                    <span className='ls2-feat-icon'>{c.icon}</span>
                    <div>
                        <div className='ls2-feat-title'>{c.title}</div>
                        <div className='ls2-feat-sub'>{c.sub}</div>
                    </div>
                </div>
            ))}
        </div>

        {/* Center content */}
        <div className='ls2-center'>
            {/* AT Logo ring */}
            <div className='ls2-logo-ring'>
                <img className='ls2-logo-inner ls2-logo-img' src='/logo.png' alt='Digittrader' />
            </div>

            <h1 className='ls2-brand'>
                DIGIT <span>TRADER</span>
            </h1>
            <p className='ls2-brand-sub'>— SMART TRADING. BETTER FUTURE. —</p>

            <div className='ls2-loading-text'>L O A D I N G  <span>|||</span></div>

            <div className='ls2-bar-wrap'>
                <div className='ls2-bar-track'>
                    <div className='ls2-bar-fill' style={{ width: `${progress}%`, transition: 'width 40ms linear' }} />
                </div>
                <span className='ls2-bar-pct'>{Math.floor(progress)}%</span>
            </div>

            <div className='ls2-phrase'>{PHRASES[phraseIdx]}</div>
        </div>

        {/* Right feature cards */}
        <div className='ls2-right-cards'>
            {P2_RIGHT.map((c, i) => (
                <div key={i} className='ls2-feat-card right'>
                    <div>
                        <div className='ls2-feat-title'>{c.title}</div>
                        <div className='ls2-feat-sub'>{c.sub}</div>
                    </div>
                    <span className='ls2-feat-icon'>{c.icon}</span>
                </div>
            ))}
        </div>

        {/* Bottom bar */}
        <div className='ls2-bottom'>
            <span>📍 RELIABLE | TRANSPARENT | SECURE</span>
            <span>BUILT FOR TRADERS, BY TRADERS</span>
            <span>⊕ DIGITTRADER</span>
        </div>
    </div>
);

const LoadingScreen: React.FC<LoadingScreenProps> = ({ ready = false, onDone }) => {
    const [progress, setProgress]   = useState(0);
    const [phraseIdx, setPhraseIdx] = useState(0);
    const [phase, setPhase]         = useState<1 | 2>(1);

    const startRef   = useRef<number>(performance.now());
    const rafRef     = useRef<number>(0);
    const readyRef   = useRef(ready);
    const readyAtRef = useRef<number | null>(null);
    const doneRef    = useRef(false);
    const onDoneRef  = useRef(onDone);

    useEffect(() => { readyRef.current  = ready;  }, [ready]);
    useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

    useEffect(() => {
        startRef.current = performance.now();

        const tick = (now: number) => {
            if (readyRef.current) {
                if (readyAtRef.current === null) readyAtRef.current = now;
                const fe  = now - readyAtRef.current;
                const pct = FAKE_CEILING + Math.min(fe / FINISH_MS, 1) * (100 - FAKE_CEILING);
                setProgress(pct);
                if (pct < 100) {
                    rafRef.current = requestAnimationFrame(tick);
                } else if (!doneRef.current) {
                    doneRef.current = true;
                    onDoneRef.current?.();
                }
                return;
            }
            const elapsed = now - startRef.current;
            const pct = Math.min((elapsed / RAMP_MS) * FAKE_CEILING, FAKE_CEILING);
            setProgress(pct);
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        const phraseInterval = setInterval(() => {
            setPhraseIdx(p => (p + 1) % PHRASES.length);
        }, 560);

        return () => {
            cancelAnimationFrame(rafRef.current);
            clearInterval(phraseInterval);
        };
    }, []);

    /* Switch to phase 2 at 50% */
    useEffect(() => {
        if (progress >= 50 && phase === 1) {
            setPhase(2);
        }
    }, [progress, phase]);

    const pct = Math.floor(progress);

    /* ── Phase 2 ── */
    if (phase === 2) {
        return <Phase2Screen progress={pct} phraseIdx={phraseIdx} />;
    }

    /* ── Phase 1 (brand splash) ── */
    return (
        <div className='ls1-page'>
            <div className='ls1-center'>
                <div className='ls1-logo-wrap'>
                    <div className='ls1-logo-ring' />
                    <img className='ls1-logo' src='/logo.png' alt='Digittrader' />
                    <div className='ls1-bars'>
                        <span /><span /><span /><span /><span /><span /><span />
                    </div>
                </div>
                <h1 className='ls1-title'>DIGITTRADER</h1>
                <p className='ls1-tagline'>TRADE SMART · TRADE FAST · TRADE DIGITS</p>
                <div className='ls1-bar-track'>
                    <div className='ls1-bar-fill' style={{ width: `${pct}%`, transition: 'width 40ms linear' }} />
                </div>
                <p className='ls1-status'>LOADING DIGITTRADER...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
