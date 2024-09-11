export enum authEndpoints {
  API_BASE = '/api/auth',
  LOGIN = `${API_BASE}/login`,
  PASSWORD_RESET = `${API_BASE}/new-password`,
  PASSWORD_RECOVER = `${API_BASE}/password-recover`,
  REGISTER = `${API_BASE}/register`,
  OTP = `${API_BASE}/verify`,
  LOGOUT = `${API_BASE}/logout`,
}
