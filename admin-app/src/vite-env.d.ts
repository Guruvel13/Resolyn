/// <reference types="vite/client" />

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'leaflet/dist/images/*.png' {
    const content: string;
    export default content;
}
