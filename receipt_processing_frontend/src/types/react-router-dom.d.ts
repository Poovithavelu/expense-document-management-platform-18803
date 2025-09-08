// This file ensures TypeScript-aware tooling and bundlers detect the dependency.
// Even though this project is JS-only, having a .d.ts import helps some CI analyzers.
declare module 'react-router-dom';
