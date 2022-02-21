/**
 * @author: zhiyu.he
 * @file: description
 * @Date: 2021-08-25 17:45:26
 * @LastEditors: zhiyu.he
 * @LastEditTime: 2021-08-25 17:45:26
 */
const openApiCheck = (req) => {
    let path = req.url.split("?")[0];
    let method = req.method;
    logger.info('headers', req.headers)
    let date = req.headers.requestTime;
    if (typeof (date) == 'undefined') {
        return false
    }
    let ba_auth = req.headers.OpenApiAuthorization;
    logger.info('ba_auth', ba_auth)
    let ts = new Date(date.replace("T", " ")).getTime();
    logger.info('ts', ts)
    let now_ts = new Date().getTime();
    logger.info('now_ts', now_ts)
    if (now_ts - ts > sign_period || typeof (secret) == 'undefined' || typeof (ba_auth) == 'undefined' || path.length == 'undefined' || method.length == 'undefined') {
        return false;
    }
    let sign_string = method + replace + path + replace + date;
    return ba_auth.replace("BA :", "") == hmacsha1(secret, sign_string);
}

exports.start = (port) => {
    const app = express();
    app.all('/*dp_dd*', (req, res, next) => {
        if (openApiCheck(req)) {
            next();
        } else {
            logger.error("openapi check fail!");
            res.send('-1')
        }
    });

    app.get('/jsserver(-foreign)?/crawl(/dp_dd)?/snapshot', _snapshot);
}