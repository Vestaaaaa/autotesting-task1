const MAX_EMAIL_LENGTH = 254;
const MAX_LOCAL_LENGTH = 64;
const MAX_DOMAIN_LENGTH = 255;
const MAX_LABEL_LENGTH = 63;
const LOCAL_ALLOWED = /^[A-Za-z0-9._%+-]+$/;
const LABEL_ALLOWED = /^[A-Za-z0-9-]+$/;
const TLD_ALLOWED = /^[A-Za-z]{2,}$/;

function isValidEmail(email) {
    if (typeof email !== 'string') {
        throw new TypeError('email mush be a string');
    }
    if (email.length === 0 || email.length > MAX_EMAIL_LENGTH) return false;
    if (/\s/.test(email)) return false;

    const parts = email.split('@');
    if (parts.length !== 2) return false;

    const [local, domain] = parts;
    if (local.length === 0 || local.length > MAX_LOCAL_LENGTH) return false;
    if (!LOCAL_ALLOWED.test(local)) return false;
    if (local.startsWith('.') || local.endsWith('.')) return false;
    if (local.includes('..')) return false;

    if (domain.length === 0 || domain.length > MAX_DOMAIN_LENGTH) return false;
    const labels = domain.split('.');
    if (labels.length < 2) return false;

    for (const label of labels) {
        if (label.length === 0 || label.length > MAX_LABEL_LENGTH) return false;
        if (!LABEL_ALLOWED.test(label)) return false;
        if (label.startsWith('-') || label.endsWith('-')) return false;
    }

    if (!TLD_ALLOWED.test(labels[labels.length - 1])) return false;

    return true;
}

module.exports = { isValidEmail };
