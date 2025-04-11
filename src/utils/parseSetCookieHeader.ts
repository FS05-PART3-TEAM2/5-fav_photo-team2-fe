export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};

export interface CookieOption {
  maxAge?: number;
  path?: string;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  domain?: string;
}

export interface ParsedCookieWithOptions {
  name: string;
  value: string;
  options: CookieOption;
}

export const parseSetCookieHeader = (
  setCookieHeader: string[] | string
): ParsedCookieWithOptions[] => {
  const cookieArray = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];

  return cookieArray
    .map(cookieStr => {
      const parts = cookieStr.split(";").map(p => p.trim());
      const [nameValue, ...attributes] = parts;

      const [name, ...rest] = nameValue.split("=");
      const value = rest.join("=");

      if (!name || !value) return null;

      const options: CookieOption = {};

      for (const attr of attributes) {
        const [rawKey, ...rawVal] = attr.split("=");
        const key = rawKey.toLowerCase();
        const val = rawVal.length > 0 ? rawVal.join("=") : true;

        switch (key) {
          case "max-age":
            if (isString(val)) options.maxAge = parseInt(val, 10);
            break;
          case "expires":
            if (isString(val)) options.expires = new Date(val);
            break;
          case "path":
            if (isString(val)) options.path = val;
            break;
          case "domain":
            if (isString(val)) options.domain = val;
            break;
          case "httponly":
            options.httpOnly = true;
            break;
          case "secure":
            options.secure = true;
            break;
          case "samesite":
            if (typeof val === "string") {
              options.sameSite = val.toLowerCase() as "strict" | "lax" | "none";
            }
            break;
        }
      }

      return {
        name,
        value,
        options,
      };
    })
    .filter(Boolean) as ParsedCookieWithOptions[];
};
