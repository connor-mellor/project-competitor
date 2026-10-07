// src/themes/themes.ts
export type ThemeId = 'default' | 'runescape';

export type TermKey =
  | 'titleOne'
  | 'titleTwo'
  | 'subtitle'
  | 'daysLogged'
  | 'tabAllTime'
  | 'tabThisWeek'
  | 'level'
  | 'overall';

export type Vocabulary = Record<TermKey, string>;

export interface Theme {
  id: ThemeId;
  label: string;
  vocab: Vocabulary;
}

export const themes: Record<ThemeId, Theme> = {
  default: {
    id: 'default',
    label: 'Default',
    vocab: {
      titleOne: 'MY',
      titleTwo: 'BOARDS',
      subtitle: "Who's actually putting in the work",
      daysLogged: 'days logged collectively this season',
      tabAllTime: 'All Time',
      tabThisWeek: 'This Week',
      level: 'Level',
      overall: 'Total',
    },
  },
  runescape: {
    id: 'runescape',
    label: 'RuneScape',
    vocab: {
      titleOne: 'MY',
      titleTwo: 'HISCORES',
      subtitle: 'Only the dedicated reach 99',
      daysLogged: 'days trained by the clan this season',
      tabAllTime: 'Overall',
      tabThisWeek: 'Weekly',
      level: 'Level',
      overall: 'Overall',
    },
  },
};
