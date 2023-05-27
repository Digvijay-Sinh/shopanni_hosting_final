const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
var dbConn = require('./dbconfig/db.config');
const session = require('express-session');
const ejs = require('ejs');

// app.use(session({
//     secret: 'mysecretkey',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 30 * 60 * 1000 } // Set session to expire after 30 minutes
// }));

// const moment = require('moment-timezone');


// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;

app.use(cors());
app.set('view engine', 'ejs');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
    // parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 10 * 10 * 60 * 1000 // One day in milliseconds
    }
}));


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(express.static('public'));
app.use(express.static('public', {
    setHeaders: function(res, path) {
        if (path.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        } else if (path.endsWith('.css')) {
            res.set('Content-Type', 'text/css');
        }
    }
}));

app.use('/public', (req, res, next) => {
    const requestedFilePath = path.join(__dirname, req.url);
    const publicFolderPath = path.join(__dirname, 'public');

    if (requestedFilePath.startsWith(publicFolderPath)) {
        return res.status(403).send('Forbidden');
    }

    next();
});

const Razorpay = require('razorpay')
var instance = new Razorpay({
    key_id: 'rzp_test_7engLIZnkLSmS3',
    key_secret: 'EEdKFnBMKBFtowzWq12uGS5Q',
})

const redirectLogin = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login')
    } else {
        next()
    }
}

const redirectHome = (req, res, next) => {
    if (req.session.loggedIn) {
        res.redirect('/index')
    } else {
        next()
    }
}

// moment.tz.setDefault('Asia/Kolkata');

// define a root route
// app.get('/', (req, res) => {
//     res.send("9558441004");
// });
// Require employee routes
const productRoutes = require('./routes/routes')
const categoriesRoutes = require('./routes/categoriesRoutes')
const couponsRoutes = require('./routes/couponsRoutes')
const usersRoutes = require('./routes/usersRoutes')
const ordersRoutes = require('./routes/ordersRoutes')
const reviewsRoutes = require('./routes/reviewsRoutes');
const { extname } = require('path');
// using as middleware
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/categories', categoriesRoutes)
app.use('/api/v1/coupons', couponsRoutes)
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/orders', ordersRoutes)
app.use('/api/v1/reviews', reviewsRoutes)
    // listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

var imageString = ""

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        // const o_name = file.originalname;
        const ext = path.extname(file.originalname);
        const filename = 'images' + '_' + file.originalname;
        if (imageString.length === 0) {
            imageString = filename
        } else {
            imageString = imageString + ` ${filename}`

        }

        cb(null, filename);
    }
});

// Initialize multer with the storage engine and file filters
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {


            return cb(null, true);
        } else {
            return cb('Error: Images only!');
        }
    }
}).array('images', 10); // Allow up to 10 images to be uploaded at once


// Handle POST requests to /upload
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(400).send({ message: err });
        }


        console.log(req.body.productId);
        const renamedFiles = req.files
        for (let index = 0; index < renamedFiles.length; index++) {
            const element = renamedFiles[index];
            console.log(element.filename);
        }

        const sql = `INSERT INTO images (product_id, image_url1, image_url2, image_url3, image_url4, image_url5, image_url6) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`;

        dbConn.query(sql, [req.body.productId, renamedFiles[0].filename, renamedFiles[1].filename, renamedFiles[2].filename, renamedFiles[3].filename, renamedFiles[4].filename, renamedFiles[5].filename], function(err, result) {
            if (err) throw err;
            console.log(`Inserted ${result.affectedRows} rows into the images table.`);
        });

        // console.log(req.files); // Log uploaded files to console
        res.status(200).send({ message: 'Upload successful!' });

    });
});

app.get('/image/:name', (req, res) => {
    const imageName = req.params.name;
    const imagePath = path.join(__dirname, './public/images', imageName);
    res.sendFile(imagePath);
});

app.get('/totalSales', function(req, res) {
    // const db = require('./db'); // replace with your database connection code
    const query = 'SELECT SUM(total_amount) as sum FROM orders'; // replace column_name and table_name with your column and table names
    dbConn.query(query, function(error, results) {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving sum');
        } else {
            const sum = results[0].sum;
            res.json(sum);
        }
    });
});


// const session = require('express-session');
// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 30 * 60 * 1000, // 30 minutes
//     }
// }));

app.post('/login', redirectHome, (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    dbConn.query('SELECT * FROM admin WHERE username = ?', [username], (error, results) => {
        if (error) {
            console.log(error);
        }
        console.log(results);
        if (results.length > 0) {
            const user = results[0];
            if (password === user.password) {
                req.session.loggedIn = true;
                req.session.username = username;
                console.log(req.session.loggedIn);
                console.log(req.session.username);
                res.redirect('/index');
                // res.send("Login Successful")
            } else {
                // res.redirect('http://127.0.0.1:5501/admin/Admin-login.html');
                res.send("Login unSuccessful")

            }
        } else {
            // res.redirect('http://127.0.0.1:5501/admin/Admin-login.html');
            res.send("Login unSuccessful")

        }
    });

})

app.get('/logout', (req, res) => {

    // console.log('Session before destroy:', req.session);
    // req.session.destroy((err) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).json({ message: "Server error" });
    //     } else {
    //         console.log('Session after destroy:', req.session);
    //         res.clearCookie('connect.sid');
    //         res.status(200).json({ message: "Logout successful" });
    //     }
    // });

    console.log("Logout Reached");
    console.log(req.session.loggedIn);
    req.session.loggedIn = false;
    console.log(req.session.loggedIn);
    res.redirect('/login')
        // delete req.session.username;
        // res.status(200).json({ message: "Logout successful" });

    // req.session.destroy(err => {
    //     if (err) {
    //         console.log(err);
    //         res.redirect('/index')
    //     } else {
    //         res.clearCookie('secret')
    //         res.redirect('/login')
    //     }
    // })
})

app.get('/logoutUser', (req, res) => {

    console.log("Logout Reached");
    console.log(req.session.userLoggedIn);
    req.session.userLoggedIn = false;
    req.session.username = "";
    console.log(req.session.userLoggedIn);
    res.redirect('/loginUser')
})


// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     dbConn.query('SELECT * FROM admin WHERE email = ?', [email], (error, results) => {
//         if (error) {
//             console.log(error);
//         }

//         if (results.length > 0) {
//             const user = results[0];
//             if (password === user.password) {
//                 req.session.loggedIn = true;
//                 req.session.email = email;
//                 res.redirect('/index');
//                 res.send("Login Successful")
//             } else {
//                 // res.redirect('http://127.0.0.1:5501/admin/Admin-login.html');
//                 res.send("Login unSuccessful")

//             }
//         } else {
//             // res.redirect('http://127.0.0.1:5501/admin/Admin-login.html');
//             res.send("Login unSuccessful")

//         }
//     });

// });

// const requireLogin = (req, res, next) => {
//     if (req.session.loggedIn) {
//         next();
//     } else {
//         // res.redirect('http://127.0.0.1:5501/admin/Admin-login.html');
//         res.send("Login Unsuccessful")
//     }
// };

// // app.get('/home', requireLogin, (req, res) => {
// //     res.send({
// //         "loggedIn": req.session.loggedIn,
// //         "email": req.session.email
// //     });
// // });

// app.get('/home', requireLogin, (req, res) => {
//     res.redirect('http://127.0.0.1:5501/admin/home.html');
// });


// app.get('/login', (req, res) => {
//     res.redirect('http://127.0.0.1:5501/admin/Admin-login.html');
//     res.send("Login unSuccessful")

// });


app.get('/index', redirectLogin, function(request, response) {
    // Render login template
    var username = request.session.username;
    if (request.session.loggedIn) {
        response.render(path.join(__dirname + '/public/admin/html/index'), {
            username: username
        });

    } else {
        response.send("Not logged in");

    }
});
app.get('/login', redirectHome, function(request, response) {
    // Render login template
    response.render(path.join(__dirname + '/public/admin/Admin-login'));
});
app.get('/partialDemo', redirectLogin, function(request, response) {
    // Render login template
    response.render(path.join(__dirname + '/public/admin/html/partialdemo.ejs'));
});

app.get('/add_product', redirectLogin, (req, res) => {
    res.render(path.join(__dirname + '/public/admin/html/Product'));
})
app.get('/view_products', redirectLogin, (req, res) => {
    res.render(path.join(__dirname + '/public/admin/html/ViewProduct'))
})
app.get('/view_colors', redirectLogin, (req, res) => {
    res.render(path.join(__dirname + '/public/admin/html/Colors'))
})
app.get('/view_size', redirectLogin, (req, res) => {
    res.render(path.join(__dirname + '/public/admin/html/size'))
})
app.get('/view_products_detail', redirectLogin, (req, res) => {
    res.render(path.join(__dirname + '/public/admin/html/ViewProductDetails'))
})
app.get('/categories', redirectLogin, (req, res) => {
    res.render(path.join(__dirname + '/public/admin/html/Category'))
})
app.get('/coupons', redirectLogin, (req, res) => {
    res.render(path.join(__dirname + '/public/admin/html/Coupons'))
})
app.get('/users', redirectLogin, (req, res) => {
    res.render(path.join(__dirname + '/public/admin/html/users'))
})
app.get('/reviews', redirectLogin, (req, res) => {
    res.render(path.join(__dirname + '/public/admin/html/reviews'))
})
app.get('/color', redirectLogin, (req, res) => {
    res.render(path.join(__dirname + '/public/admin/html/color'))
})
app.get('/edit_product/:id', redirectLogin, (req, res) => {
    const productId = req.params.id;
    // res.send(productId)

    // res.render()

    // Construct the path to the viewSingleProduct.html file in the public folder
    // const filePath = path.join(__dirname, 'public', 'admin', 'html', 'viewSingleProduct.html');

    // Send the viewSingleProduct.html file as a response with the product ID as a parameter
    res.render(path.join(__dirname + '/public/admin/html/viewSingleProduct'), {
            productId: productId
        })
        // res.sendFile('viewSingleProduct.html', { root: __dirname })
});
app.get('/edit_category/:id', redirectLogin, (req, res) => {
    const categoryId = req.params.id;
    // res.send(productId)

    // res.render()

    // Construct the path to the viewSingleProduct.html file in the public folder
    // const filePath = path.join(__dirname, 'public', 'admin', 'html', 'viewSingleProduct.html');

    // Send the viewSingleProduct.html file as a response with the product ID as a parameter
    res.render(path.join(__dirname + '/public/admin/html/viewSingleCategory'), {
            categoryId: categoryId
        })
        // res.sendFile('viewSingleProduct.html', { root: __dirname })
});
app.get('/payment', (req, res) => {
    // res.send(productId)

    // res.render()

    // Construct the path to the viewSingleProduct.html file in the public folder
    // const filePath = path.join(__dirname, 'public', 'admin', 'html', 'viewSingleProduct.html');

    // Send the viewSingleProduct.html file as a response with the product ID as a parameter
    res.render(path.join(__dirname + '/public/payment'))
        // res.sendFile('viewSingleProduct.html', { root: __dirname })
});
app.get('/edit_coupon/:id', redirectLogin, (req, res) => {
    const couponId = req.params.id;
    // res.send(productId)

    // res.render()

    // Construct the path to the viewSingleProduct.html file in the public folder
    // const filePath = path.join(__dirname, 'public', 'admin', 'html', 'viewSingleProduct.html');

    // Send the viewSingleProduct.html file as a response with the product ID as a parameter
    res.render(path.join(__dirname + '/public/admin/html/viewSingleCoupons'), {
            couponId: couponId
        })
        // res.sendFile('viewSingleProduct.html', { root: __dirname })
});

//user session js 




const cookieParser = require('cookie-parser');
app.use(cookieParser());

const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

app.get('/authRegister', (req, res) => {
    res.render(path.join(__dirname + '/public/register-email'));
});

const checkEmail = (req, res, next) => {
    if (!req.session.email) {
        res.redirect('/authRegister');
    } else {
        next();
    }
};

const checkOTP = (req, res, next) => {
    if (!req.session.otp) {
        res.redirect('/authRegister');
    } else {
        next();
    }
};
// const checkVerified = (req, res, next) => {
//     if (!req.session.verified) {
//         res.redirect('/authRegister');
//     } else {
//         next();
//     }
// };
const checkVerified = (req, res, next) => {
    if (req.session.verified) {
        // If the cookie is present, move on to the next middleware/route handler
        next();
    } else {
        // If the cookie is not present, redirect the user to a different page
        res.redirect('/authRegister');
    }
};

let transporter = nodemailer.createTransport({
    host: 'mail.shopannies.in',
    port: 587,
    secure: false, // use SSL
    auth: {
        user: 'no-reply@shopannies.in', // replace with your actual email address
        pass: 'ge7E&mbvO' // replace with your actual email password
    },
    tls: {
        rejectUnauthorized: false,
        agent: 'https.Agent'
    }
});




// const flash = require('connect-flash');
// app.use(flash());


app.post('/send-otp', (req, res) => {
    const { email } = req.body;

    const query = "SELECT * FROM users2 WHERE email = ?";
    dbConn.query(query, [email], (error, results) => {
        if (error) {
            console.log(error);
            // handle error
        } else {
            if (results.length > 0) {
                // res.json({ exists: true });


                console.log("User exists");
                res.send('<script>alert("Account with this email already exists. Please login or use a different email.");window.location.href="/authRegister";</script>');

                // handle user exists case
            } else {
                console.log("User does not exist");
                console.log(email);
                // Generate OTP
                const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
                req.session.email = email;
                req.session.otp = otp;
                console.log("email from send otp session" + req.session.email);
                console.log("otp from send otp session" + req.session.otp);
                // Set up Nodemailer mail options

                let mailOptions = {
                    from: 'no-reply@shopannies.in', // replace with your actual email address
                    to: email, // replace with the recipient's email address
                    subject: 'OTP from shopannies',
                    text: `Your OTP is: ${otp}`
                };



                // Send email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error(error);
                        // res.status(500).json({ error: 'Error sending OTP' });
                    } else {
                        console.log(`OTP sent to ${email}: ${otp}`);
                        res.redirect('/verify-otp');
                    }
                });
            }
        }
    });


});
app.post('/send-otp-forgetPassword', (req, res) => {
    const { email } = req.body;
    req.session.isForgetPassword = true;

    const query = "SELECT * FROM users2 WHERE email = ?";
    dbConn.query(query, [email], (error, results) => {
        if (error) {
            console.log(error);
            // handle error
        } else {
            if (results.length > 0) {
                // res.json({ exists: true });
                console.log("User does exist");
                console.log(email);
                // Generate OTP
                const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
                req.session.email = email;
                req.session.otp = otp;
                req.session.userId = results[0].user_id
                console.log("email from send otp session" + req.session.email);
                console.log("otp from send otp session" + req.session.otp);
                // Set up Nodemailer mail options

                let mailOptions = {
                    from: 'no-reply@shopannies.in', // replace with your actual email address
                    to: email, // replace with the recipient's email address
                    subject: 'OTP from shopannies',
                    text: `Your OTP is: ${otp}`
                };



                // Send email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error(error);
                        // res.status(500).json({ error: 'Error sending OTP' });
                    } else {
                        console.log(`OTP sent to ${email}: ${otp}`);
                        res.redirect('/verify-otp');
                    }
                });



                // handle user exists case
            } else {
                console.log("User exists");
                res.send('<script>alert("Account with this email does not exists. Please login or use a different email.");window.location.href="/authRegister";</script>');


            }
        }
    });


});


app.get('/verify-otp', checkEmail, checkOTP, (req, res) => {
    const email = req.session.email;

    const otp = req.session.otp;
    console.log("email from get verify otp session" + email);
    console.log("otp from get verify otp session" + otp);
    res.render(path.join(__dirname + '/public/otp'), { email: email, otp: otp });
});
app.get('/registerUser', checkVerified, (req, res) => {
    // req.session.destroy(err => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         // res.redirect('/');
    //     }
    // });
    // res.clearCookie('verified');

    res.render(path.join(__dirname + '/public/register-user'), { email: req.session.email });
    delete req.session.verified;


});
app.get('/forgotPasswordChange', checkVerified, (req, res) => {
    // req.session.destroy(err => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         // res.redirect('/');
    //     }
    // });
    // res.clearCookie('verified');

    res.render(path.join(__dirname + '/public/forgetPasswordChangePassword'), { email: req.session.email });
    req.session.verified = false;
    delete req.session.verified;


});

app.post('/verify-otp', checkEmail, checkOTP, (req, res) => {

    const userOtp = req.body.otp;
    const otp = req.session.otp;
    delete req.session.otp;

    const email = req.session.email;

    if (userOtp === otp) { // Reset expiration timer
        req.session.verified = true;
        // res.cookie('verified', 'true', { maxAge: 2 * 60 * 1000 });
        // res.cookie('email', email, { maxAge: 2 * 60 * 1000 });
        console.log(req.session.verified);
        if (req.session.isForgetPassword) {
            res.redirect('/forgotPasswordChange');

        } else {
            res.redirect('/registerUser');

        }
    } else {
        res.send('<script>alert("OTP is invalid.");window.location.href="/authRegister";</script>');
    }
    // req.session.destroy(err => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         // req.session = {};
    //         if (userOtp === otp) { // Reset expiration timer
    //             res.session.verified=true;
    //             // res.cookie('verified', 'true', { maxAge: 2 * 60 * 1000 });
    //             // res.cookie('email', email, { maxAge: 2 * 60 * 1000 });
    //             console.log(req.cookies.verified);
    //             res.redirect('/registerUser');
    //         } else {
    //             res.send('Invalid OTP');
    //         }
    //     }
    // });


});



app.post('/register', (req, res) => {
    const { name, email, number, address1, address2, state, district, pincode, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";
    dbConn.query(query, [email], (error, results) => {
        if (error) {
            console.log(error);
            // handle error
        } else {
            if (results.length > 0) {
                // res.json({ exists: true });


                console.log("User exists");
                res.send('<script>alert("Account with this email already exists. Please login or use a different email.");window.location.href="/authRegister";</script>');

                // handle user exists case
            } else {
                console.log("User does not exist");
                console.log(email);
                // Generate OTP
                const sql = `INSERT INTO users2 (name, email, number, address1, address2, state, district, pincode, password) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                dbConn.query(sql, [name, email, number, address1, address2, state, district, pincode, password], (err, result) => {
                    if (err) {
                        console.error('Error inserting user into MySQL: ' + err.stack);
                        res.send('Error inserting user into MySQL. Please try again later.');
                        return;
                    }

                    delete req.session.email;
                    delete req.session.verified;


                    // Render the success template with the user's name
                    const data = { name: name };
                    res.redirect('/loginUser')
                });
            }
        }
    });


    // Insert the new user into the MySQL database

});


// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true,
//     store: store, // add this line to use the session store
//     cookie: {
//         maxAge: 1 * 60 * 1000 // One day in milliseconds
//     }
// }));

const userRedirectLogin = (req, res, next) => {
    if (!req.session.userLoggedIn) {
        res.redirect('/loginUser')
    } else {
        next()
    }
}

const userRedirectHome = (req, res, next) => {
    if (req.session.userLoggedIn) {
        res.redirect('/userHome')
    } else {
        next()
    }
}


app.get('/loginUser', userRedirectHome, (req, res) => {
    res.render(path.join(__dirname + '/public/login'));
});
app.get('/forgotPassword', userRedirectHome, (req, res) => {
    res.render(path.join(__dirname + '/public/forgot-password'));
});
app.get('/cart/total', function(req, res) {
    const userId = req.session.userId;
    const query = `
      SELECT SUM(products.price * cart_items.quantity) AS cart_total
      FROM cart_items
      JOIN products ON cart_items.product_id = products.product_id
      WHERE cart_items.user_id = ${userId};
    `;

    dbConn.query(query, function(error, results, fields) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error fetching cart total from database' });
        }
        const cartTotal = results[0].cart_total || 0; // If no results, default to 0

        res.json({ cartTotal });
    });
});

app.get('/userHome', userRedirectLogin, function(request, response) {
    const email = request.session.email;
    console.log("Fetching cart count");
    console.log(request.session.userId);
    const query = `SELECT COUNT(*) FROM cart_items WHERE user_id = ${request.session.userId}`;
    const query2 = `SELECT COUNT(*) FROM wishlist WHERE user_id = ${request.session.userId}`;
    var cartTotal = 0;
    dbConn.query(query, (err, results) => {
        if (err) console.log(err);
        cartTotal = results[0]['COUNT(*)'];
        dbConn.query(query2, (err, results) => {
            if (err) console.log(err);
            wishListTotal = results[0]['COUNT(*)'];

            console.log(wishListTotal); // move console.log inside the callback function
            response.render(path.join(__dirname + '/public/userHome'), { email: email, cartTotal: cartTotal, wishListTotal: wishListTotal });
        });
        console.log(cartTotal); // move console.log inside the callback function
        // response.render(path.join(__dirname + '/public/userHome'), { email: email, cartTotal: cartTotal });
    });
});
app.get('/userShop', userRedirectLogin, function(request, response) {
    const email = request.session.email;
    console.log("Fetching cart count");
    console.log(request.session.userId);
    const query = `SELECT COUNT(*) FROM cart_items WHERE user_id = ${request.session.userId}`;
    const query2 = `SELECT COUNT(*) FROM wishlist WHERE user_id = ${request.session.userId}`;
    var cartTotal = 0;
    dbConn.query(query, (err, results) => {
        if (err) console.log(err);
        cartTotal = results[0]['COUNT(*)'];
        dbConn.query(query2, (err, results) => {
            if (err) console.log(err);
            wishListTotal = results[0]['COUNT(*)'];

            console.log(wishListTotal); // move console.log inside the callback function
            response.render(path.join(__dirname + '/public/shop'), { email: email, cartTotal: cartTotal, wishListTotal: wishListTotal });
        });
        console.log(cartTotal); // move console.log inside the callback function
        // response.render(path.join(__dirname + '/public/userHome'), { email: email, cartTotal: cartTotal });
    });
});

app.get('/', function(request, response) {

    response.render(path.join(__dirname + '/public/withoutLoginHome'));

});

app.get('/productView/:id', userRedirectLogin, function(request, response) {
    const product_id = request.params.id;

    // Query the database for the product with the given ID
    dbConn.query('SELECT * FROM products WHERE product_id = ?', [product_id], function(error, products, fields) {
        if (error) throw error;

        // Query the database for all images with the given product_id
        dbConn.query('SELECT * FROM images WHERE product_id = ?', [product_id], function(error, images, fields) {
            if (error) throw error;

            // Pass the product and image details as objects to the render method
            response.render(path.join(__dirname + '/public/viewSingleProduct'), {
                product: products[0],
                images: images[0]
            });
        });
    });
});
app.get('/productViewWithoutLogin/:id', function(request, response) {
    const product_id = request.params.id;

    // Query the database for the product with the given ID
    dbConn.query('SELECT * FROM products WHERE product_id = ?', [product_id], function(error, products, fields) {
        if (error) throw error;

        // Query the database for all images with the given product_id
        dbConn.query('SELECT * FROM images WHERE product_id = ?', [product_id], function(error, images, fields) {
            if (error) throw error;

            // Pass the product and image details as objects to the render method
            response.render(path.join(__dirname + '/public/viewSingleProductWithoutLogin'), {
                product: products[0],
                images: images[0]
            });
        });
    });
});


app.post('/userLogin', (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

    dbConn.query('SELECT * FROM users2 WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) {
            console.log(error);
        }
        console.log(results);
        if (results.length > 0) {
            const user = results[0];
            if (password === user.password) {
                req.session.userLoggedIn = true;
                req.session.email = email;
                req.session.userId = user.user_id;
                console.log(req.session.userLoggedIn);
                console.log(req.session.userId);
                console.log(req.session.email);
                res.redirect('/userHome');

                // res.send("Login Successful")
            } else {
                // res.redirect('http://127.0.0.1:5501/admin/Admin-login.html');
                console.log("Password incorrect");
                res.send('Password incorrect');

            }
        } else {
            // res.redirect('http://127.0.0.1:5501/admin/Admin-login.html');
            // res.send("Login unSuccessful")
            res.send('Password incorrect')

        }
    });

})




// //get image route
// app.get('/products/images/:id', (req, res) => {
//     // Execute the SQL query to retrieve the latest updated images for each product
//     const query = `
//       SELECT
//         p.name,
//         i.image_url1
//       FROM
//         products p
//         JOIN (
//           SELECT
//             product_id,
//             MAX(updated_at) AS max_updated_at
//           FROM
//             images
//           GROUP BY
//             product_id
//         ) latest_images
//         ON p.product_id = latest_images.product_id
//         JOIN images i
//         ON latest_images.product_id = i.product_id
//         AND latest_images.max_updated_at = i.updated_at
//       ORDER BY
//         latest_images.max_updated_at DESC;
//     `;

//     // Execute the query using the MySQL connection pool
//     pool.query(query, (error, results) => {
//         if (error) {
//             console.error(error);
//             res.status(500).send('Internal Server Error');
//         } else {
//             // Serve the images from the public folder based on the image_url1 column
//             results.forEach((row) => {
//                 const imagePath = path.join(__dirname, 'public', row.image_url1);
//                 app.use(`/images/${row.image_url1}`, express.static(imagePath));
//             });

//             // Send the results as JSON
//             res.json(results);
//         }
//     });
// });


app.get('/images/:id', (req, res) => {
    const imageId = req.params.id;

    // Replace this with your own database query to retrieve all columns of the image
    dbConn.query('SELECT * FROM images WHERE product_id = ?', [imageId], (error, results) => {
        if (error) {
            // Handle any errors that occur during the database query
            console.error(error);
            res.status(500).send('Error retrieving image from database');
        } else {
            // If the query is successful, send the image data back to the client as JSON
            const imageData = results[0];
            res.json(imageData);
        }
    });
});



//cart
// app.post('/cart_items', userRedirectLogin, (req, res) => {
//     const { product_id, product_size_id, quantity, colour } = req.body;
//     const user_id = req.session.userId

//     // Insert the data into the cart_items table
//     const insertQuery = `INSERT INTO cart_items (user_id, product_id, product_size_id, quantity, colour) VALUES (?, ?, ?, ?, ?)`;
//     const values = [user_id, product_id, product_size_id, quantity, colour];

//     dbConn.query(insertQuery, values, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.send("ErrorOccored")
//         }
//         res.send("Completed adding to card")
//     });
// });
app.post('/cart_items', userRedirectLogin, (req, res) => {
    const { product_id, product_size_id, quantity, colour } = req.body;
    const user_id = req.session.userId;

    // Check if the product already exists in the cart
    const selectQuery = `
      SELECT cart_item_id, quantity FROM cart_items
      WHERE user_id = ? AND product_id = ? AND product_size_id = ? AND colour = ?
    `;
    const values = [user_id, product_id, product_size_id, colour];

    dbConn.query(selectQuery, values, (err, results) => {
        if (err) {
            console.log(err);
            res.send("ErrorOccurred");
            return;
        }

        if (results.length > 0) {
            // Product already exists in cart, update the quantity
            const existingCartItem = results[0];
            const newQuantity = parseInt(quantity) + parseInt(existingCartItem.quantity);
            const updateQuery = `UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?`;
            const updateValues = [newQuantity, existingCartItem.cart_item_id];

            dbConn.query(updateQuery, updateValues, (err, result) => {
                if (err) {
                    console.log(err);
                    res.send("ErrorOccurred");
                    return;
                }
                console.log("updated cart item");

                res.send("Completed updating cart");
            });
        } else {
            // Product doesn't exist in cart, insert new row
            const insertQuery = `INSERT INTO cart_items (user_id, product_id, product_size_id, quantity, colour) VALUES (?, ?, ?, ?, ?)`;
            const insertValues = [user_id, product_id, product_size_id, quantity, colour];
            dbConn.query(insertQuery, insertValues, (err, result) => {
                if (err) {
                    console.log(err);
                    res.send("ErrorOccurred");
                    return;
                }
                console.log("new cart item");

                res.send("Completed adding to cart");
            });
        }
    });
});






app.get('/cart', (req, res) => {
    const user_id = req.session.userId;
    const query = `SELECT * FROM cart_items WHERE user_id = ${user_id}`;

    dbConn.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
app.get('/getUserById', (req, res) => {
    const user_id = req.session.userId;
    const query = `SELECT * FROM users2 WHERE user_id = ${user_id}`;

    dbConn.query(query, (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});
app.get('/wishlist', (req, res) => {
    const user_id = req.session.userId;

    const query = `SELECT * FROM wishlist WHERE user_id = ${user_id}`;

    dbConn.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
app.get('/getOrderByUser', (req, res) => {
    const user_id = req.session.userId;

    const query = `SELECT * FROM orders2 WHERE user_id = ${user_id}`;

    dbConn.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


app.get('/cartPage', userRedirectLogin, function(request, response) {
    const user_id = request.session.userId
    const query2 = `SELECT COUNT(*) FROM wishlist WHERE user_id = ${request.session.userId}`;
    var cartTotal = 0;
    dbConn.query(query2, (err, results) => {
        if (err) console.log(err);
        var wishListTotal = results[0]['COUNT(*)'];

        console.log(wishListTotal); // move console.log inside the callback function
        response.render(path.join(__dirname + '/public/shoping-cart'), { wishListTotal: wishListTotal });

    });
    // response.render(path.join(__dirname + '/public/userHome'), { email: email, cartTotal: cartTotal });

});
app.get('/accountDetails', userRedirectLogin, function(request, response) {
    const user_id = request.session.userId
    response.render(path.join(__dirname + '/public/account_details'));

});
app.get('/updatePassword', userRedirectLogin, function(request, response) {
    const user_id = request.session.userId
    response.render(path.join(__dirname + '/public/setting'));

});
// app.get('/forgotPasswordChange', function(request, response) {
//     response.render(path.join(__dirname + '/public/setting'));

// });

app.get('/orderPage', userRedirectLogin, function(request, response) {
    const user_id = request.session.userId
    response.render(path.join(__dirname + '/public/order_history'));

});
app.get('/cartPage', userRedirectLogin, function(request, response) {
    const user_id = request.session.userId
    response.render(path.join(__dirname + '/public/shoping-cart'));

});
app.get('/wishlistPage', userRedirectLogin, function(request, response) {
    const user_id = request.session.userId
    response.render(path.join(__dirname + '/public/wishlist'));

});


app.put('/cart', async(req, res) => {
    try {
        const { product_id, user_id, colour, quantity, product_size_id } = req.body;
        const result = await dbConn.query(
            `UPDATE cart_items SET quantity = ? WHERE product_id = ? AND user_id = ? AND colour = ? AND product_size_id = ?`, [quantity, product_id, user_id, colour, product_size_id]
        );
        res.json({ updated: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.put('/productDetails', async(req, res) => {
    try {
        const { product_id, product_color, variant_quantity, product_size } = req.body;
        const result = await dbConn.query(
            `UPDATE product_details SET variant_quantity = ? WHERE product_id = ? AND product_color = ? AND product_size = ?`, [variant_quantity, product_id, product_color, product_size]
        );
        res.json({ updated: true, message: "Quantity updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.put('/updateUser', async(req, res) => {
    const userId = req.session.userId
    try {
        const { inputAddress1Form, inputAddress2Form, inputPhoneForm, inputStateForm, inputDistrictForm, inputPincodeForm } = req.body;

        const result = await dbConn.query(
            `UPDATE users2 SET 
                address1 = ?,
                address2 = ?,
                number = ?,
                state = ?,
                district = ?,
                pincode = ?
             WHERE user_id = ?`, [inputAddress1Form, inputAddress2Form, inputPhoneForm, inputStateForm, inputDistrictForm, inputPincodeForm, userId]
        );
        res.json({ updated: true, message: "User updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.put('/updatePassword', async(req, res) => {
    const userId = req.session.userId
    try {
        const { currentPassword, newPassword } = req.body;

        dbConn.query('SELECT * FROM users2 WHERE user_id = ?', userId, async(error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send('Internal Server Error');
            } else {
                const password = results[0].password;

                // Check if the entered current password matches the user's password in the database
                if (currentPassword !== password) {
                    res.send('NotAuthorised');

                } else {
                    const result = await dbConn.query(
                        `UPDATE users2 SET 
                    password = ?
                 WHERE user_id = ?`, [newPassword, userId]
                    );

                    res.json({ updated: true, message: "User password updated" });




                }



            }
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.put('/updateForgotPassword', async(req, res) => {
    const userId = req.session.userId
    try {
        const { newPassword } = req.body;

        dbConn.query('SELECT * FROM users2 WHERE user_id = ?', userId, async(error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send('Internal Server Error');
            } else {

                const result = await dbConn.query(
                    `UPDATE users2 SET 
                    password = ?
                 WHERE user_id = ?`, [newPassword, userId]
                );
                req.session.isForgetPassword = false

                delete req.session.email;
                delete req.session.verified;


                res.json({ updated: true, message: "User password updated" });




            }
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/wishlist', async(req, res) => {
    try {
        const { product_id } = req.body;
        const user_id = req.session.userId;
        const insertQuery = `INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)`;
        const insertValues = [user_id, product_id];
        dbConn.query(insertQuery, insertValues, (err, result) => {
            if (err) {
                console.log(err);
                res.send("ErrorOccurred");
                return;
            }
            console.log("new wishlist item");

            res.send("Completed adding to wishlist");
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.post('/color', async(req, res) => {
    try {
        const { name } = req.body;
        console.log(name);
        const insertQuery = `INSERT INTO colors (name) VALUES (?)`;
        const insertValues = [name];
        dbConn.query(insertQuery, insertValues, (err, result) => {
            if (err) {
                console.log(err);
                res.send("ErrorOccurred");
                return;
            }
            console.log("new colour item");

            res.send("Completed adding colour");
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.post('/size', async(req, res) => {
    try {
        const { name } = req.body;
        console.log(name);
        const insertQuery = `INSERT INTO size (name) VALUES (?)`;
        const insertValues = [name];
        dbConn.query(insertQuery, insertValues, (err, result) => {
            if (err) {
                console.log(err);
                res.send("ErrorOccurred");
                return;
            }
            console.log("new size item");

            res.send("Completed adding size");
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/wishlist', async(req, res) => {
    try {
        const { product_id } = req.body;
        const user_id = req.session.userId;
        const deleteQuery = `DELETE FROM wishlist WHERE user_id = ? AND product_id = ?`;
        const deleteValues = [user_id, product_id];
        dbConn.query(deleteQuery, deleteValues, (err, result) => {
            if (err) {
                console.log(err);
                res.send("ErrorOccurred");
                return;
            }
            console.log("wishlist item deleted");

            res.send("Completed deleting from wishlist");
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.delete('/colors/:colourId', async(req, res) => {
    try {
        const { colour_id } = req.params;
        const deleteQuery = `DELETE FROM colors WHERE colour_id = ?`;
        const deleteValues = [colour_id];
        dbConn.query(deleteQuery, deleteValues, (err, result) => {
            if (err) {
                console.log(err);
                res.send("ErrorOccurred");
                return;
            }
            console.log("Colour item deleted");

            res.send("Completed deleting from Colors table");
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.delete('/size/:sizeId', async(req, res) => {
    try {
        const size_id = req.params.sizeId;
        const deleteQuery = `DELETE FROM size WHERE size_id = ?`;
        const deleteValues = [size_id];
        dbConn.query(deleteQuery, deleteValues, (err, result) => {
            if (err) {
                console.log(err);
                res.send("ErrorOccurred");
                return;
            }
            console.log("Size item deleted");
            console.log(size_id);
            res.send("Completed deleting from Size table");
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.get('/session', (req, res) => {
    const sessionData = req.session;
    res.json(sessionData);
});







app.post('/createOrder', (req, res) => {

    // STEP 1: extract currency and amount from request body
    const { currency, amount } = req.body;

    // STEP 2: create order using currency and amount values
    instance.orders.create({
        amount: amount,
        currency: currency,
        receipt: "receipt#1",
        notes: {
            key1: "value3",
            key2: "value2"
        }
    }, (err, order) => {

        //STEP 3 & 4: send response with order details or error message
        if (!err)
            res.json(order)
        else
            res.send(err);
    });
});


app.put('/order/updateStatus/:orderId', (req, res) => {
    // Get the order ID and status from the request parameters and body
    const orderId = req.params.orderId;
    const status = req.body.status;

    // Define the SQL query to update the order status
    const query = `UPDATE orders2 SET status='${status}' WHERE orders_id=${orderId}`;

    // Execute the query
    dbConn.query(query, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error updating order status');
        } else {
            res.send('Order status updated successfully!');
        }
    });
});

app.post('/create/orderId', (req, res) => {

    // STEP 1: extract currency and amount from request body
    const { currency, amount } = req.body;

    // STEP 2: create order using currency and amount values
    var options = {
        amount: amount, // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function(err, order) {
        console.log(order);
        res.send({ orderId: order.id })
    });
});
app.post("/api/payment/verify", (req, res) => {

    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'EEdKFnBMKBFtowzWq12uGS5Q')
        .update(body.toString())
        .digest('hex');
    console.log("sig received ", req.body.response.razorpay_signature);
    console.log("sig generated ", expectedSignature);
    var response = { "signatureIsValid": "false" }
    if (expectedSignature === req.body.response.razorpay_signature)
        response = { "signatureIsValid": "true" }
    res.send(response);
});

app.post('/update/order', (req, res) => {
    const orderId = req.body.orderId;
    const paymentId = req.body.razorpay_payment_id;
    const signatureIsValid = req.body.razorpay_signature;
    const orderIdFromRazorpay = req.body.razorpay_order_id
    console.log("Update order details reached")
    console.log(paymentId);
    console.log(signatureIsValid);
    console.log(orderIdFromRazorpay);
    const query = `
      UPDATE orders2
      SET status = 'Paid',
      razorpay_payment_id = '${paymentId}',
      razorpay_signature = '${signatureIsValid}',
      razorpay_order_id = '${orderIdFromRazorpay}'
      WHERE orders_id = '${orderId}'
    `;

    dbConn.query(query, (err, result) => {
        if (err) throw err;
        console.log(`Order with ID ${orderId} updated successfully`);
        res.sendStatus(200);
    });
});

app.delete('/cart/:cart_item_id', userRedirectLogin, (req, res) => {
    const userId = req.session.userId
    const cart_item_id = req.params.cart_item_id;
    dbConn.query('DELETE FROM cart_items WHERE cart_item_id = ?', [cart_item_id], (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error deleting cart item');
        } else {
            console.log(`Deleted cart item with ID ${cart_item_id}`);
            res.sendStatus(204);
        }
    });
});

app.delete('/userCart', userRedirectLogin, (req, res) => {
    const userId = req.session.userId
    dbConn.query('DELETE FROM cart_items WHERE user_id = ?', [userId], (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error deleting user cart');
        } else {
            console.log(`Deleted user cart with user ID ${userId}`);
            res.sendStatus(204);
        }
    });
});


app.post('/checkout', userRedirectLogin, (req, res) => {
    // Retrieve order data from the request body
    const orderData = {
        user_id: req.session.userId,
        name: req.body.name,
        address: req.body.address,
        landmark: req.body.landmark,
        district: req.body.district,
        state: req.body.state,
        phone: req.body.phone,
        email: req.body.email,
        total: req.body.total,
        status: "Pending"
    };
    console.log(orderData);

    // Insert the order data into the orders table
    dbConn.query('INSERT INTO orders2 SET ?', orderData, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            // Retrieve the order ID of the newly inserted record
            const orderId = result.insertId;
            console.log('Order ID:', orderId);

            // Retrieve cart items for the user
            const userId = req.session.userId;
            dbConn.query('SELECT * FROM cart_items WHERE user_id = ?', userId, (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal Server Error');
                } else {
                    // Loop through each item and insert it into the order_items table
                    for (let i = 0; i < results.length; i++) {
                        const item = results[i];
                        console.log("CartItems");
                        console.log(item);
                        const orderItemData = {
                            order_id: orderId,
                            product_id: item.product_id,
                            quantity: item.quantity,
                            product_size_id: item.product_size_id,
                            colour: item.colour
                        };
                        dbConn.query('INSERT INTO order_items SET ?', orderItemData, (error, result) => {
                            if (error) {
                                console.log(error);
                                res.status(500).send('Internal Server Error');
                            } else {
                                console.log('Order item added');

                            }
                        });
                    }

                    res.status(200).json(orderId);


                    // Delete the cart items for the user
                    // dbConn.query('DELETE FROM cart_items WHERE user_id = ?', userId, (error, result) => {
                    //     if (error) {
                    //         console.log(error);
                    //         res.status(500).send('Internal Server Error');
                    //     } else {
                    //         console.log('Cart items deleted');
                    //         res.status(200).json(orderId);
                    //     }
                    // });
                }
            });
        }
    });
});


app.get('/order-items/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    console.log(orderId);
    console.log("from order items getting");
    dbConn.query('SELECT * FROM order_items WHERE order_id = ?', orderId, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
});
app.get('/colors', (req, res) => {
    dbConn.query('SELECT * FROM colors', (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
});
app.get('/product_details/:productId', (req, res) => {
    const productId = req.params.productId
    dbConn.query('SELECT * FROM product_details WHERE product_id = ?', [productId], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
});
app.get('/size', (req, res) => {
    dbConn.query('SELECT * FROM size', (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
});
app.get('/product_details', (req, res) => {
    dbConn.query('SELECT * FROM product_details', (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
});
app.post('/add-variant', function(req, res) {
    // Get the data from the request body
    var size = req.body.size;
    var color = req.body.color;
    var quantity = req.body.quantity;
    var product_id = req.body.product_id
        // Insert the data into the database
    dbConn.query('INSERT INTO product_details (product_id, product_size, product_color, variant_quantity) VALUES (?, ?, ?, ?)', [product_id, size, color, quantity], function(err, result) {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.get('/send-whatsapp-message', (req, res) => {
    const phone = '916353166673';
    const imageName = 'myimage.jpg';
    // const imageUrl = `https://${req.headers.host}/images/${imageName}`;
    const imageDescription = 'Check out this cool image!';
    const message = `*${imageDescription}*\n`;
    // const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${message}`;
    res.redirect(url);
});


app.get('/get-variant-quantity', (req, res) => {
    const { size, color, productId } = req.query;
    console.log(size);
    console.log(color);
    console.log("ProductId:" + productId);

    if (!size || !color) {
        res.send('<script>alert("Both size and colour is necessary.");</script>');
        return;
    }

    dbConn.query('SELECT variant_quantity FROM product_details WHERE product_size = ? AND product_color = ? AND product_id = ?', [size, color, productId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
            return;
        }

        if (results.length === 0) {
            res.send('0');
            return;
        }

        const variantQuantity = results[0].variant_quantity;
        console.log(variantQuantity);
        res.send(variantQuantity.toString());
    });
});