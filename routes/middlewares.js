exports.isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    }else {
        res.status(403).send('로그인 필요');
    }
};
/*
로그인 중이면 req.isAauthenticated()가 true, 그렇지 않으면 false임.
=>이 메서드로 로그인 여부를 파악할 수 있다.
 */
exports.isNotLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        next();
    }else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};