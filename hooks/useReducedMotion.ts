'use client';

import { useState, useEffect } from 'react';

export function useReducedMotion() {
    // The user explicitly requested animations on all devices.
    // We are deliberately ignoring window.matchMedia('(prefers-reduced-motion: reduce)') 
    // to bypass low-power-mode restrictions on mobile devices.
    return false;
}
