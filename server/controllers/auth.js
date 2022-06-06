const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const User = require("../models/User.js");
const Transaction = require("../models/Transactions.js");
const ErrorHandler = require("../utils/errorHandler.js");
const sendEmail = require("../utils/sendEmail.js");

exports.register = async (req, res, next) => {
  //   res.send("Register");
  //console.log("Register")
  const { username, email, password } = req.body;
  try {

    User.findOne({ email: email }).then(e => {
      if (e) {
        console.log(e)
        let error = { message: 'email already exist' }
      return next(error)
      }
    })
    const user = await User.create({
      username:username,
      email:email,
      password:password,
    });
    Transaction.create({
      user,
      amount:10,
      type: 'Bonus',
      status:'Received'
    });
    console.log('last msg')
    const resetUrl=''
    const message = `
    <table cellspacing="0" border="0" cellpadding="0" width="100%" height:"100%" style="@import url(https://fonts.googleapis.com/css?family=poppins:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
      <tr>
        <td>
          <table style="background-color: white; max-width:100vh;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
            <tr>
              <td style="height:80px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align:center;">
              </td>
            </tr>
            <tr>
              <td style="height:20px;">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:25px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(100,100,100,.16);box-shadow:0 6px 18px 0 rgba(100,100,100,1);">
                  <tr>
                    <td style="height:40px;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding:0 35px;">
                      <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'poppins',sans-serif;">Welcome to Iinvest</h1>
                      <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        This is a verification email for your account.
                      </p>
                      <button href="${resetUrl}" style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Verify Email</button>
                        <p>If the button is not working click here<p><br/> <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
                        
                    </td>
                  </tr>
                  <tr>
                    <td style="height:40px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            <tr>
              <td style="height:20px;">&nbsp;</td>
            </tr>
            <tr>
        
            </tr>
          </table>
        </td>
      </tr>
    </table>
      `;
  
      
        await sendEmail({
          to: email,
          subject: "Welcome To Weinvest",
          text: message,
        });
    // res.status(201).json({
    //   success: true,
    //   token: "ddjsjsjs",
    // });
    sendToken(user, 201, res);
  } catch (error) {
    // console.error(error);
    // res.status(500).json({
    //   success: false,
    //   error: error.message,
    // });
    next(error);
  }
};

exports.login = async (req, res, next) => {
  // res.send("Login");
  const { email, password } = req.body;
  if (!email || !password) {
    // res.status(400).json({ success: false, error: "Enter email and password" });
    return next(new ErrorHandler("Enter email and password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      // res.status(404).json({ success: false, error: "Invalid password" });
      return next(new ErrorHandler("Incorrect password"), 401);
    }

    const isMatched = await user.matchPasswords(password);

    if (!isMatched) {
      return next(new ErrorHandler("Invalid password", 401));
      // res.status(404).json({ success: false, error: "Invalid password" });
    }

    // res.status(200).json({
    //   success: true,
    //   token: "yaudjdjddhink",
    // });
    sendToken(user, 200, res);
  } catch (error) {
    // res.status(500).json({ success: false, error: error.message });
    next(error);
  }
};

exports.forgotpassword = async (req, res, next) => {
  // res.send("Forgot Password");
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("Email failed to sent", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${process.env.RESET_URL_LINK}/password-reset/${resetToken}`;

    const message = `
  <table cellspacing="0" border="0" cellpadding="0" width="100%" height:"100%" style="@import url(https://fonts.googleapis.com/css?family=poppins:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
    <tr>
      <td>
        <table style="background-color: white; max-width:100vh;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td style="height:80px;">&nbsp;</td>
          </tr>
          <tr>
            <td style="text-align:center;">
            </td>
          </tr>
          <tr>
            <td style="height:20px;">&nbsp;</td>
          </tr>
          <tr>
            <td>
              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:25px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(100,100,100,.16);box-shadow:0 6px 18px 0 rgba(100,100,100,1);">
                <tr>
                  <td style="height:40px;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:0 35px;">
                    <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'poppins',sans-serif;">You have
                      requested to reset your password</h1>
                    <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                      To reset your password, click the
                      following link and follow the guidelines.
                    </p>
                    <button href="${resetUrl}" style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                      Password</button>
                      <p>If the button is not working click here<p><br/> <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
                      
                  </td>
                </tr>
                <tr>
                  <td style="height:40px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          <tr>
            <td style="height:20px;">&nbsp;</td>
          </tr>
          <tr>
      
          </tr>
        </table>
      </td>
    </tr>
  </table>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset",
        text: message,
      });
      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorHandler("Email failed to send", 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.resetpassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });
    if (!user) {
      return next(new ErrorHandler("Invalid reset Token", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(201).josn({
      success: true,
      data: "Successfully reseted password",
      token: user.getSignedToken(),
    });
  } catch (error) {
    next(error);
  }
};

exports.getmydetails = async (req, res, next) => {
  let token
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      const user = await User.findById(decoded.id);
      const trans = await Transaction.find({user:decoded.id});
      const data = {
        ...user._doc,
        Transactions: trans.reverse()
      }
      return res.status(200).json({ data, token });
 }

  } catch (e) {
    console.log(e.message)
    return res.status(400).json({ message:'refresh' });
    
  }
};

exports.set_subscription_plan = async (req, res, next) => {
  let token
 // console.log(11111, req.body.plan)
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      const user = await User.findByIdAndUpdate(decoded.id, { $set: { plan: req.body.plan }},{ useFindAndModify: false });
     // console.log('don', user)
      return res.status(200).json({ user, token });
 }

  } catch (e) {
    
    console.log(e.message)
    return res.status(400).json({ message:'refresh' });
  }
};

exports.make_transaction = async (req, res, next) => {
  let token
  console.log(11111, req.body)
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer") && req.body.amount !== ''
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
     const user = await User.findById(decoded.id);
      Transaction.create({
        user: decoded.id,
        amount: req.body.amount,
        type: 'Deposit',
        status: 'Pending'
      });
      const resetUrl = `${process.env.RESET_URL_LINK}/dashboard`;
      const message = `
      <table cellspacing="0" border="0" cellpadding="0" width="100%" height:"100%" style="@import url(https://fonts.googleapis.com/css?family=poppins:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
          <td>
            <table style="background-color: white; max-width:100vh;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td style="height:80px;">&nbsp;</td>
              </tr>
              <tr>
                <td style="text-align:center;">
                </td>
              </tr>
              <tr>
                <td style="height:20px;">&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:25px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(100,100,100,.16);box-shadow:0 6px 18px 0 rgba(100,100,100,1);">
                    <tr>
                      <td style="height:40px;">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="padding:0 35px;">
                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'poppins',sans-serif;">New transaction</h1>
                        <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                          New Transaction detected on your dashboard.
                        </p>
                        <button href="${resetUrl}" style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">My Dashboard</button>
                          <p>If the button is not working click here<p><br/> <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
                          
                      </td>
                    </tr>
                    <tr>
                      <td style="height:40px;">&nbsp;</td>
                    </tr>
                  </table>
                </td>
              <tr>
                <td style="height:20px;">&nbsp;</td>
              </tr>
              <tr>
          
              </tr>
            </table>
          </td>
        </tr>
      </table>
        `;
      await sendEmail({
        to: user.email,
        subject: "New Transaction",
        text: message,
      });

      console.log(user.email)
      return res.status(200).json({ token });
    }
  }catch(e) {
    console.log(e.message)
    return res.status(400).json({ message:'refresh' });
  }
};
//make_withdraw

exports.make_withdraw = async (req, res, next) => {
  let token
  //console.log(11111, req.body)
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer") && req.body.amount !== ''
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
     const user = await User.findById(decoded.id);
      Transaction.create({
        user: decoded.id,
        amount: req.body.amount,
        type: 'Withdraw',
        status: 'Pending',
        address:req.body.address
      });
      const resetUrl = `${process.env.RESET_URL_LINK}/dashboard`;
      const message = `
      <table cellspacing="0" border="0" cellpadding="0" width="100%" height:"100%" style="@import url(https://fonts.googleapis.com/css?family=poppins:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
          <td>
            <table style="background-color: white; max-width:100vh;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td style="height:80px;">&nbsp;</td>
              </tr>
              <tr>
                <td style="text-align:center;">
                </td>
              </tr>
              <tr>
                <td style="height:20px;">&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:25px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(100,100,100,.16);box-shadow:0 6px 18px 0 rgba(100,100,100,1);">
                    <tr>
                      <td style="height:40px;">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="padding:0 35px;">
                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'poppins',sans-serif;">Withdraw Request</h1>
                        <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                          You just made a withdrawer request
                          you would be notified when transactions are complete.
                        </p>
                        <button href="${resetUrl}" style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">My Dashboard</button>
                          <p>If the button is not working click here<p><br/> <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
                          
                      </td>
                    </tr>
                    <tr>
                      <td style="height:40px;">&nbsp;</td>
                    </tr>
                  </table>
                </td>
              <tr>
                <td style="height:20px;">&nbsp;</td>
              </tr>
              <tr>
          
              </tr>
            </table>
          </td>
        </tr>
      </table>
        `;
      await sendEmail({
        to: user.email,
        subject: "New Transaction",
        text: message,
      });

      console.log(user.email)
      return res.status(200).json({ token });
    }
  }catch(e) {
    console.log(e.message)
    return res.status(400).json({ message:'refresh' });
  }
};



exports.get_all_transaction_details = async (req, res, next) => {
  let token
 // console.log(11111, req.body.plan)
  try {
    const trans = await Transaction.find({status:'Pending'}).populate('user')
      return res.status(200).json({ trans });
  
  } catch (e) {
    console.log(e.message)
    return res.status(400).json({ message:'refresh' });
  }
};

exports.confirm_transaction = async (req, res, next) => {
  let token
 // console.log(11111, req.body.plan)
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      await Transaction.findByIdAndUpdate(req.body.id, { $set: { status: 'Received' } }, { useFindAndModify: false });
      await User.findById(req.body.uid).then((u) => {
        if (req.body.type==='Deposit') {
          u.ballance = u.ballance + req.body.amount
        }
        if (req.body.type==='Withdraw') {
          u.ballance = u.ballance - req.body.amount
       }
        u.save()

        const resetUrl = `${process.env.RESET_URL_LINK}/dashboard`;
      const message = `
      <table cellspacing="0" border="0" cellpadding="0" width="100%" height:"100%" style="@import url(https://fonts.googleapis.com/css?family=poppins:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
          <td>
            <table style="background-color: white; max-width:100vh;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td style="height:80px;">&nbsp;</td>
              </tr>
              <tr>
                <td style="text-align:center;">
                </td>
              </tr>
              <tr>
                <td style="height:20px;">&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:25px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(100,100,100,.16);box-shadow:0 6px 18px 0 rgba(100,100,100,1);">
                    <tr>
                      <td style="height:40px;">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="padding:0 35px;">
                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'poppins',sans-serif;">${req.body.type} Request</h1>
                        <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                          Your transaction is now complete.
                        </p>
                        <button href="${resetUrl}" style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">My Dashboard</button>
                          <p>If the button is not working click here<p><br/> <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
                          
                      </td>
                    </tr>
                    <tr>
                      <td style="height:40px;">&nbsp;</td>
                    </tr>
                  </table>
                </td>
              <tr>
                <td style="height:20px;">&nbsp;</td>
              </tr>
              <tr>
          
              </tr>
            </table>
          </td>
        </tr>
      </table>
        `;
     sendEmail({
        to: u.email,
        subject: "Transaction Complete",
        text: message,
      });
        return res.status(200).json({ token });
      });
     //console.log('don', user)
  }
  } catch (e) {
    console.log(e.message)
    return res.status(400).json({ message:'refresh' });
  }
};


exports.failed_transaction = async (req, res, next) => {
  let token
 // console.log(11111, req.body.plan)
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      await Transaction.findByIdAndUpdate(req.body.id, { $set: { status: 'Failed' } }, { useFindAndModify: false });
      await User.findById(req.body.uid).then((u) => {

        const resetUrl = `${process.env.RESET_URL_LINK}/dashboard`;
                const message = `
                <table cellspacing="0" border="0" cellpadding="0" width="100%" height:"100%" style="@import url(https://fonts.googleapis.com/css?family=poppins:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                  <tr>
                    <td>
                      <table style="background-color: white; max-width:100vh;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                          <td style="text-align:center;">
                          </td>
                        </tr>
                        <tr>
                          <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                          <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:25px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(100,100,100,.16);box-shadow:0 6px 18px 0 rgba(100,100,100,1);">
                              <tr>
                                <td style="height:40px;">&nbsp;</td>
                              </tr>
                              <tr>
                                <td style="padding:0 35px;">
                                  <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'poppins',sans-serif;">Error in ${req.body.type} Request</h1>
                                  <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                  <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                    Your transaction was not successful this wasnt a problem from us please contact customer support for help.
                                  </p>
                                  <button href="${resetUrl}" style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">My Dashboard</button>
                                    <p>If the button is not working click here<p><br/> <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
                                    
                                </td>
                              </tr>
                              <tr>
                                <td style="height:40px;">&nbsp;</td>
                              </tr>
                            </table>
                          </td>
                        <tr>
                          <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                    
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                  `;
              sendEmail({
                  to: u.email,
                  subject: "Transaction Not Complete",
                  text: message,
                });
                  return res.status(200).json({ token });
                });
              //console.log('don', user)
  }
  } catch (e) {
    console.log(e.message)
    return res.status(400).json({ message:'refresh' });
  }
};
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
