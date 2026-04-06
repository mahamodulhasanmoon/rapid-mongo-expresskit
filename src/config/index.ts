import 'dotenv/config';

export const NODE_ENV = process.env.NODE_ENV;
export const baseUrl = process.env.BASE_URL?.trim();
export const frontendUrl = process.env.FRONTEND_URL?.trim();
export const port = process.env.PORT;

/** Public URL of this API (no trailing slash). Used for OAuth callbacks and links. */
export const apiPublicBase = (): string => {
  const fromEnv = baseUrl?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  const p = port || '5000';
  return `http://localhost:${p}`;
};

/**
 * Value for `cors({ origin })`.
 * - `ORIGIN=*` or unset → `true` (reflect request Origin; works with `credentials: true`).
 *   Note: `origin: '*'` cannot be used with credentials, so we use reflection instead.
 * - Otherwise: comma/newline-separated allowlist.
 */
export const corsOrigin:
  | boolean
  | string
  | string[]
  | undefined = (() => {
  const raw = process.env.ORIGIN?.trim();
  if (!raw || raw === '*') return true;
  const parts = raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length === 0) return true;
  return parts.length === 1 ? (parts[0] as string) : parts;
})();
// for Database Connection
export const mongoUrl: string = process.env.mongoDB_URI || '';
export const redisUrl: string = process.env.REDIS_URI || '';

//  for Authencticaion and Security

export const access_token: string = process.env.ACCESS_TOKEN || '';
export const refresh_token: string = process.env.REFRESH_TOKEN || '';
export const defaultPass = process.env.DEFAULT_PASS;
export const saltRound = process.env.SALT_ROUND;
export const access_token_expiry: string =
  process.env.ACCESS_TOKEN_EXPIRE || '';
export const refresh_token_expiry: string =
  process.env.REFRESH_TOKEN_EXPIRE || '';

  export const googleClient = process.env.GOOGLE_CLIENT
  export const googleSecrete = process.env.GOOGLE_SECRET

  // For Cloud Storage

  export const cloudName= process.env.CLOUD_NAME
  export const cloudApiKey= process.env.CLOUD_API_KEY
  export const cloudSecret= process.env.CLOUD_SECRET

//  For Email Server

export const mailHost: string = process.env.MAIL_HOST || 'smtp.gmail.com';
export const mailPort = 465;
export const mailUser: string = process.env.MAIL_USER || '';
export const mailPass: string = process.env.MAIL_PASS || '';
export const mailService: string = process.env.MAIL_SERVICE || '';
