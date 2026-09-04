/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Where the exit survey posts, if a teacher wants the results. Absent or blank means the
   * course makes no network requests at all. Must be https (or localhost while testing).
   */
  readonly VITE_SURVEY_ENDPOINT?: string;
  /** An optional label the teacher chooses for a class or period. Never a student identifier. */
  readonly VITE_SURVEY_CLASS_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
