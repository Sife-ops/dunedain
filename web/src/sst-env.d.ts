/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_REGION: string
  readonly VITE_STAGE: string
  readonly VITE_MANDOS_URL: string
  readonly VITE_MANDOS_URL_CLOUDFRONT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}