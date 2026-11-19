const { expect } = require('chai');
const { isValidEmail } = require('../src/emailValidator.js');

describe('isValidEmail', () => {
    //--smoke tests--
    describe('Smoke test', () => {
        it('returns a boolean', () => {
            expect(isValidEmail('user@example.com')).to.be.a('boolean');
        });
    });

    //--positive tests
    describe('positive tests', () => {
        it('accepts a simple email', () => {
            expect(isValidEmail('user@example.com')).to.be.true;
        });
        it('accepts multi subdomain', () => {
            expect(isValidEmail('user@example.mail.lt.com')).to.be.true;
        });
        it('accepts . in local part', () => {
            expect(isValidEmail('username.surname@example.com')).to.be.true;
        });
        it('accepts + in local part', () => {
            expect(isValidEmail('user+smth@example.com')).to.be.true;
        });
        it('accepts - in domain', () => {
            expect(isValidEmail('user@my-domain.com')).to.be.true;
        });
    });

    //--negative tests
    describe('negative tests', () => {
        it('rejects email without @', () => {
            expect(isValidEmail('userexample.com')).to.be.false;
        });
        it('rejects email with two @', () => {
            expect(isValidEmail('user@@example.com')).to.be.false;
        });
        it('rejects email without domain', () => {
            expect(isValidEmail('user@')).to.be.false;
        });
        it('rejects email without local part', () => {
            expect(isValidEmail('@example.com')).to.be.false;
        });
        it('rejects email without a dot', () => {
            expect(isValidEmail('user@com')).to.be.false;
        });
        it('rejects email with local part starting with a dot', () => {
            expect(isValidEmail('.user@example.com')).to.be.false;
        });
        it('rejects email with local part ending with a dot', () => {
            expect(isValidEmail('user.@example.com')).to.be.false;
        });
        it('rejects consecutive dots in local part', () => {
            expect(isValidEmail('user..surname@example.com')).to.be.false;
        });
        it('rejects spaces', () => {
            expect(isValidEmail('user @example.com')).to.be.false;
        });
        it('rejects invalid caracters', () => {
            expect(isValidEmail('user!surname@example.com')).to.be.false;
        });
    });

    //--boundary tests--
    describe('boundary tests', () => {
        it('rejects empty string', () => {
            expect(isValidEmail('')).to.be.false;
        });
        it('accepts local part of exactly 64 chars', () => {
            const email = 'a'.repeat(64) + '@example.com';
            expect(email.split('@')[0].length).to.equal(64);
            expect(isValidEmail(email)).to.be.true;
        });
        it('rejects local part of 65 chars', () => {
            expect(isValidEmail('a'.repeat(65) + '@example.com')).to.be.false;
        });
        it('accepts TLD of exactly 2 chars', () => {
            expect(isValidEmail('user@example.co')).to.be.true;
        });
        it('rejects TLD of 1 char', () => {
            expect(isValidEmail('user@example.c')).to.be.false;
        });
    });

    //--robustness tests
    describe('robustness tests', () => {
        it('throws TypeError on null', () => {
            expect(() => isValidEmail(null)).to.throw(TypeError);
        });
        it('throws TypeError on undefined', () => {
            expect(() => isValidEmail(undefined)).to.throw(TypeError);
        });
        it('throws TypeError on number', () => {
            expect(() => isValidEmail(1307)).to.throw(TypeError);
        });
        it('throws TypeError on array', () => {
            expect(() => isValidEmail(['user@example.com'])).to.throw(
                TypeError,
            );
        });
        it('throws TypeError on object', () => {
            expect(() => isValidEmail({ email: 'user@example.com' })).to.throw(
                TypeError,
            );
        });
    });

    //--lifecycle hooks
    describe('with shared fixtures', () => {
        let validEmails;
        let invalidEmails;

        beforeEach(() => {
            validEmails = [
                'user@example.com',
                'first.last@example.com',
                'user+tag@example.com',
            ];
            invalidEmails = [
                'user@@example.com',
                'user@example',
                '.user@example.com',
            ];
        });

        afterEach(() => {
            validEmails = null;
            invalidEmails = null;
        });

        it('accepts every email from the valid fixtures', () => {
            validEmails.forEach((email) => {
                expect(isValidEmail(email), `expected "${email}" to be valid`)
                    .to.be.true;
            });
        });

        it('rejects every email from the invalid fixtures', () => {
            invalidEmails.forEach((email) => {
                expect(isValidEmail(email), `expected "${email}" to be invalid`)
                    .to.be.false;
            });
        });
    });
});
