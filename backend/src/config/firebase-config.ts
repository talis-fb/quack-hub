export interface FirebaseConfig {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

export default () => {
  const type: string = process.env.TYPE;
  const project_id: string = process.env.PROJECT_ID;
  const private_key_id: string = process.env.PRIVATE_KEY_ID;
  const private_key: string = process.env.PRIVATE_KEY;
  const client_email: string = process.env.CLIENT_EMAIL;
  const client_id: string = process.env.CLIENT_ID;
  const auth_uri: string = process.env.AUTH_URI;
  const token_uri: string = process.env.TOKEN_URI;
  const auth_provider_x509_cert_url: string = process.env.AUTH_CERT_URL;
  const client_x509_cert_url: string = process.env.CLIENT_CERT_URL;
  const universe_domain: string = process.env.UNIVERSAL_DOMAIN;

  return {
    firebase: {
      type,
      project_id,
      private_key_id,
      private_key,
      client_email,
      client_id,
      auth_uri,
      token_uri,
      auth_provider_x509_cert_url,
      client_x509_cert_url,
      universe_domain,
    } as FirebaseConfig,
  };
};
