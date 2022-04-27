const express = require('express');
//로그인 모듈 추가
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.use((req, res, next) => {
	res.locals.user = null;
	res.locals.followerCount = 0;
	res.locals.followingCount = 0;
	res.locals.followerIdList = [];
	next();
});

//자신의 프로필은 로그인을 해야 볼 수 있으므로 isLoggedIn 미들웨어 사용
router.get('/profile',isLoggedIn, (req,res)=>{
	res.render('profile',{title:'내 정보 = NodeBird'});
});

//회원가입 페이지는 로그인하지 않은 사람에게만 보여야하므로 isNotLoggedIn 미들웨어 사용
router.get('/join',isNotLoggedIn,(req,res)=>{
	res.render('join',{title:'회원가입 - NodeBird'});
});

router.get('/', (req, res, next) => {
	const twits = [];
	res.render('main', {
		title: 'NodeBird',
		twits,
	});
});


module.exports = router;