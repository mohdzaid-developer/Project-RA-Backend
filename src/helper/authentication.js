import jsonwebtoken from 'jsonwebtoken';
import logger from '../logger/index.js';

export function generateJWT(payload, expiresIn, secret) {
    return jsonwebtoken.sign(Object.assign({}, payload), secret, {
        algorithm: 'HS256',
        expiresIn,
    });
}

export function generateAccessToken(payload, expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRY_TIME) {
    try {
        return generateJWT(payload, expiresIn, process.env.JWT_ACCESS_TOKEN_SECRET);
    } catch (e) {
        logger.error(`ERROR in login generateAccessToken() => ${e}`);
    }
}

export function generateRefreshToken(payload, expiresIn = JWT_REFRESH_TOKEN_EXPIRY_TIME) {
    try {
        return generateJWT(payload, expiresIn, JWT_REFRESH_TOKEN_SECRET);
    } catch (e) {
        logger.error(`ERROR in login generateRefreshToken() => ${e}`);
    }
}

export function verifyAccessToken(token) {
    return jsonwebtoken.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
}

export const verifyOTPToken = async (token) => {
    return jsonwebtoken.verify(token, JWT_ACCESS_TOKEN_SECRET);
};

export function getRandomFourDigitNumber() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
  