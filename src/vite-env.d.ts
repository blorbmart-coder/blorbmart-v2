/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional. When set, the footer newsletter form POSTs { email, source } here as JSON. */
  readonly VITE_NEWSLETTER_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
