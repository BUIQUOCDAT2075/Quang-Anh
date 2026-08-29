
import { Student, Score, Conduct } from '../types';

const STORAGE_KEYS = {
  STUDENTS: 'school_mgmt_students',
  SCORES: 'school_mgmt_scores',
  CONDUCTS: 'school_mgmt_conducts'
};

const getFromStorage = <T,>(key: string, defaultValue: T[]): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const saveToStorage = <T,>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const storage = {
  getStudents: (): Student[] => getFromStorage(STORAGE_KEYS.STUDENTS, []),
  saveStudent: (student: Student) => {
    const students = storage.getStudents();
    saveToStorage(STORAGE_KEYS.STUDENTS, [...students, student]);
  },
  
  getScores: (): Score[] => getFromStorage(STORAGE_KEYS.SCORES, []),
  saveScore: (score: Score) => {
    const scores = storage.getScores();
    saveToStorage(STORAGE_KEYS.SCORES, [...scores, score]);
  },

  getConducts: (): Conduct[] => getFromStorage(STORAGE_KEYS.CONDUCTS, []),
  saveConduct: (conduct: Conduct) => {
    const conducts = storage.getConducts();
    saveToStorage(STORAGE_KEYS.CONDUCTS, [...conducts, conduct]);
  }
};
