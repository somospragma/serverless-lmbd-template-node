module.exports.headers = () => {
    return {
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,POST',
        'Access-Control-Allow-Origin': `${process.env.mainDomain}`,
        'Access-Control-Allow-Credentiasl': 'true',
        'Cache-Control': 'no-store',
        'Strict-Transport-Security': 'max-age=31536000; includeSubdomains; preload',
        'Content-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
    };
}