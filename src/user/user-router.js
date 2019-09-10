const express = require('express');
const path = require('path');
const UserService = require('./user-service');

const userRouter = express.Router();
const jsonBodyParser = express.json();

userRouter
  .post('/', jsonBodyParser, async (req, res, next) => {//register route
    const { password, username, name } = req.body;

    for (const field of ['name', 'username', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });

    try {
      const passwordError = UserService.validatePassword(password);//regex the password

      if (passwordError)
        return res.status(400).json({ error: passwordError });//password is not complex enough

      const hasUserWithUserName = await UserService.hasUserWithUserName(//check if username is taken
        req.app.get('db'),
        username
      );

      if (hasUserWithUserName)
        return res.status(400).json({ error: 'Username already taken' });

      const hashedPassword = await  UserService.hashPassword(password);//has password

      const newUser = {
        username,
        password: hashedPassword,
        name,
      };

      const user = await UserService.insertUser(
        req.app.get('db'),
        newUser
      );

      await UserService.populateUserWords(
        req.app.get('db'),
        user.id
      );

      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${user.id}`))
        .json(UserService.serializeUser(user));
    } catch(error) {
      next(error);
    }
  });

module.exports = userRouter;
