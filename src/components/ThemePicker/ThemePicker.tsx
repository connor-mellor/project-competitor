// src/components/ThemePicker.tsx
import { useTheme } from '@/themes/useTheme';
import { themes, type ThemeId } from '@/themes/themes';

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();
  return (
    <select
      aria-label="Theme"
      value={theme.id}
      onChange={(e) => setTheme(e.target.value as ThemeId)}
    >
      {Object.values(themes).map((t) => (
        <option key={t.id} value={t.id}>
          {t.label}
        </option>
      ))}
    </select>
  );
}
