export const logSecurityEvent = async (event: {
  type: 'login_attempt' | 'suspicious_activity' | 'blocked_ip',
  details: any
}) => {
  await supabase.from('security_logs').insert([
    {
      event_type: event.type,
      details: event.details,
      ip_address: window.clientInformation?.ip,
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString()
    }
  ]);
}; 