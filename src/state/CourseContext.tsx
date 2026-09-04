import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";
import { MODULE_IDS } from "../types";
import type { CourseContent, ProgressState } from "../types";
import { createRootReducer, type MasteryTrack, type RootAction } from "./reducer";
import { finalEngine, moduleEngine, type MasteryEngine } from "./masteryEngine";
import { loadProgress, saveProgress } from "../storage/progressStorage";

interface CourseContextValue {
  state: ProgressState;
  dispatch: Dispatch<RootAction>;
  content: CourseContent;
}

const CourseContext = createContext<CourseContextValue | null>(null);

export interface CourseProviderProps {
  content: CourseContent;
  children: ReactNode;
}

export function CourseProvider({ content, children }: CourseProviderProps) {
  const engines = useMemo<Record<MasteryTrack, MasteryEngine>>(() => {
    const record = {} as Record<MasteryTrack, MasteryEngine>;
    for (const id of MODULE_IDS) record[id] = moduleEngine(content.modules[id].quizBank);
    record.final = finalEngine(content.finalBank);
    return record;
  }, [content]);

  const reducer = useMemo(() => createRootReducer(engines), [engines]);
  const [state, dispatch] = useReducer(reducer, undefined, loadProgress);

  useEffect(() => {
    saveProgress(state);
  }, [state]);

  const value = useMemo(() => ({ state, dispatch, content }), [state, content]);

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourse(): CourseContextValue {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourse must be used within a CourseProvider");
  return ctx;
}
