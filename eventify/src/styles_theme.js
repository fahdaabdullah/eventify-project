export const colors = {
  primary: '#1d4ed8',
  primaryDark: '#1e40af',
  primarySoft: '#dbeafe',
  background: '#f3f6fb',
  surface: '#ffffff',
  text: '#1f2937',
  muted: '#4b5563',
  border: '#dbe3f0',
  success: '#166534',
  danger: '#b91c1c',
  dangerSoft: '#fee2e2',
  warning: '#92400e',
  warningSoft: '#fef3c7',
};

export const pageShell = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '32px 20px 48px',
};

export const card = {
  backgroundColor: colors.surface,
  borderRadius: '18px',
  padding: '24px',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
  border: `1px solid ${colors.border}`,
};

export const sectionTitle = {
  color: colors.primary,
  marginBottom: '8px',
};

export const sectionSubtitle = {
  color: colors.muted,
  marginBottom: '24px',
  lineHeight: '1.6',
};

export const formGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '14px',
};

export const inputBase = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '12px',
  border: `1px solid ${colors.border}`,
  backgroundColor: '#fff',
  outline: 'none',
};

export const textareaBase = {
  ...inputBase,
  minHeight: '110px',
  resize: 'vertical',
  gridColumn: '1 / -1',
};

export const buttonRow = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
  marginTop: '18px',
};

export const primaryButton = {
  backgroundColor: colors.primary,
  color: '#fff',
  border: 'none',
  borderRadius: '12px',
  padding: '12px 18px',
  fontWeight: '700',
  cursor: 'pointer',
};

export const secondaryButton = {
  backgroundColor: colors.primarySoft,
  color: colors.primaryDark,
  border: 'none',
  borderRadius: '12px',
  padding: '12px 18px',
  fontWeight: '700',
  cursor: 'pointer',
};

export const editButton = {
  backgroundColor: '#e0ecff',
  color: colors.primaryDark,
  border: 'none',
  borderRadius: '10px',
  padding: '10px 14px',
  fontWeight: '700',
  cursor: 'pointer',
};

export const deleteButton = {
  backgroundColor: colors.dangerSoft,
  color: colors.danger,
  border: 'none',
  borderRadius: '10px',
  padding: '10px 14px',
  fontWeight: '700',
  cursor: 'pointer',
};

export const helperText = {
  marginTop: '10px',
  color: colors.muted,
  fontSize: '0.95rem',
  lineHeight: '1.5',
};

export const errorBox = {
  marginBottom: '14px',
  padding: '12px 14px',
  borderRadius: '12px',
  backgroundColor: colors.dangerSoft,
  color: colors.danger,
  border: `1px solid #fecaca`,
};

export const emptyState = {
  ...card,
  textAlign: 'center',
  color: colors.muted,
};
