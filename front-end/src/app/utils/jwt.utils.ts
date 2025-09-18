export class JwtUtils {
  static getRoleFromToken(token: string): string | null {
    if (!token) return null;

    const payload = token.split('.')[1];
    if (!payload) return null;

    try {
      const decoded = atob(payload);
      const obj = JSON.parse(decoded);
      return obj.role?.trim() || null;
    } catch (e) {
      console.error('Erreur décodage JWT', e);
      return null;
    }
  }
}