// required models or modules (might need later)

exports.index = (req, res) => {
    res.render('index');
};

exports.about = (req, res) => {
    res.render('about');
};

exports.contact = (req, res) => {
    res.render('contact');
};
 
exports.handleContactForm = (req, res) => {
    const { email, subject, message } = req.body;
    console.log(`Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    res.redirect('/thankyou');
};

exports.thankYou = (req, res) => {
    res.render('thankyou');
};