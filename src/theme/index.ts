export const Colors = {
  bg:      '#FEF8E4',
  card:    '#FFFDF0',
  accent:  '#1B4B8A',
  red:     '#8B1A1A',
  gold:    '#B8870B',
  text:    '#160E05',
  muted:   '#7A6240',
  btn:     '#F5E9C8',
  btnH:    '#EDD99E',
  border:  'rgba(180,140,60,0.15)',
  shadow:  'rgba(180,140,60,0.12)',
};

export const Typography = {
  h1:   { fontSize: 26, fontWeight: '800' as const, color: Colors.text, letterSpacing: -0.5 },
  h2:   { fontSize: 20, fontWeight: '700' as const, color: Colors.text },
  h3:   { fontSize: 16, fontWeight: '700' as const, color: Colors.text },
  body: { fontSize: 14, color: Colors.muted, lineHeight: 22 },
  sm:   { fontSize: 12, color: Colors.muted },
  label:{ fontSize: 10, fontWeight: '700' as const, color: Colors.muted, textTransform: 'uppercase' as const, letterSpacing: 0.8 },
};

export const Spacing = {
  xs: 6, sm: 10, md: 16, lg: 24, xl: 36,
};

export const Radius = {
  sm: 8, md: 14, lg: 20, full: 999,
};

export const Shadow = {
  sm: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
};
