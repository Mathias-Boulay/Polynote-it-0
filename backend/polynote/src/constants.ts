export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

export const COOKIE_SECRET = process.env.COOKIE_SECRET || 'LOCAL_HOST_SECRET';

// You know, the default values should be used for local dev only
const MONGO_USERNAME = process.env.MONGO_USERNAME || 'ADMIN_USERNAME';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'R43etx50qCDqJpnpzWPs';
const MONGO_HOST = process.env.MONGO_HOST || 'db';
export const MONGO_CONNECTION_STRING = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:27017`;

/** Email related constants */
export const MAIL_SENDER = process.env.MAIL_SENDER || 'Polynotes services';
export const MAIL_HOST = process.env.MAIL_HOST || 'smtp.umontpellier.fr';
export const MAIL_USERNAME =
  process.env.MAIL_USERNAME || 'mathias.boulay@etu.umontpellier.fr';
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD || 'VARIABLE_MISSING';
export const MAIL_VERIFICATION_LINK_ROOT =
  process.env.MAIL_VERIFICATION_LINK_ROOT || 'http://localhost/user/verify/';
