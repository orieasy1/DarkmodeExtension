export type ThemeMode = 'dark' | 'light';

export interface Theme {
  mode: ThemeMode;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  accentColor: string;
}

export const DarkTheme: Theme = {
  mode: 'dark',
  backgroundColor: '#121212',
  textColor: '#e0e0e0',
  borderColor: '#333',
  accentColor: '#1e88e5'  // 선택사항: 버튼, 강조용
};

export const LightTheme: Theme = {
  mode: 'light',
  backgroundColor: '#ffffff',
  textColor: '#1c1c1c',
  borderColor: '#ccc',
  accentColor: '#1976d2'
};

/**
 * 현재 적용할 테마를 반환
 * 향후 확장 가능하도록 추상화
 */
export function getActiveTheme(mode: ThemeMode = 'dark'): Theme {
  return mode === 'light' ? LightTheme : DarkTheme;
}
