"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
    interface Window {
        UnicornStudio?: {
            init: () => void;
            isInitialized?: boolean;
        };
    }
}

interface UnicornBackgroundProps {
    className?: string; // Allow external styling for opacity/blur
}

const DATA_US_PROJECT = process.env.NEXT_PUBLIC_DATA_US_PROJECT;

export function UnicornBackground({ className = "" }: UnicornBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        // Re-init if component mounts and window.UnicornStudio is already available
        if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
            window.UnicornStudio.init();
            window.UnicornStudio.isInitialized = true;
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: -1
            }}
        >
            {/* Unicorn Studio animated background */}
            <div
                data-us-project={DATA_US_PROJECT}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0
                }}
            />

            {/* Overlay for signal intensity control */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    transition: 'all 1s ease-in-out',
                    background: "var(--bg-overlay, rgba(0,0,0,0.15))",
                    backdropFilter: "var(--bg-blur, none)",
                    zIndex: 1
                }}
            />

            {/* Top vignette for atmospheric depth */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '30%',
                    background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, transparent 100%)',
                    zIndex: 2,
                    pointerEvents: 'none'
                }}
            />

            {/* Watermark blocker - covers the bottom badge area */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '180px',
                    background: 'linear-gradient(to top, #0a0a0a 0%, #0a0a0a 40%, rgba(10,10,10,0.85) 60%, rgba(10,10,10,0.4) 80%, transparent 100%)',
                    zIndex: 2,
                    pointerEvents: 'none'
                }}
            />

            <Script
                src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
                strategy="afterInteractive"
                onLoad={() => {
                    if (window.UnicornStudio) {
                        window.UnicornStudio.init();
                        window.UnicornStudio.isInitialized = true;
                    }
                }}
            />
        </div>
    );
}
