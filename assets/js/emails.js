const token = "4790479d-783a-42fc-bf9a-2835bbdb47d5";
const $formContact = document.querySelector("#contact-form");

const sendForm = event => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    if (email !== null && email !== undefined) {
        if (validateEmail(email)) {
            const response = grecaptcha.getResponse();
            if (response === null || response === undefined || response.length === 0) {
                showSnack("captcha-snack");
            } else {
                const name = document.getElementById("name").value;
                const subject = document.getElementById("subject").value;
                let content = document.getElementById("message").value;
                content = "You have been contacted by " + name + "\n" + content;

                if (subject === null || subject === undefined || subject.length === 0) {
                    showSnack("email-empty-snack");
                } else if (content === null || content === undefined || content.length === 0) {
                    showSnack("email-empty-snack");
                } else {
                    sendEmail(email, subject, content)
                }
            }
        } else {
            showSnack("email-snack");
        }
    }

    const message = {
        sender: document.querySelector("#email").value,
        name: document.querySelector("#name").value,
        subject: document.querySelector("#subject").value,
        text: document.querySelector("#message").value
    };
    smtpJS(message);
};
const smtpJS = message => {
    try {
        Email.send(
            message.sender,
            "hi@jahirfiquitiva.com",
            message.subject,
            getEmailContent(message.name, message.sender, message.subject, message.text),
            {
                token: token,
                callback: function done(message) {
                    // alert("sent");
                    window.location = '/contacted.html';
                }
            }
        );
    } catch (e) {
        // alert("Error! D:");
        window.location = '/contact-error.html';
    }
};

$formContact.addEventListener("submit", sendForm);

function showSnack(elementId) {
    let x = document.getElementById(elementId);
    if (x !== null) {
        x.className = "snackbar show";
        setTimeout(function () {
            x.className = x.className.replace("snackbar show", "snackbar");
        }, 3000);
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

function getEmailContent(name, email, subject, message) {
    return 'You have been contacted by ' + name + '<br/><br/><table'
           + ' style="margin: 0;width: 100%;border: 1px solid #f5f5f5;'
           + 'border-collapse: collapse;border-spacing: 0;"><tr><td style='
           + '"width:25%;background:#263238;color:#eceff1;padding: 10px;'
           + 'text-transform: uppercase;">Field</td><td style="width:75%;'
           + 'background:#263238;color:#eceff1;padding: 10px;text-transform: '
           + 'uppercase;">Entry</td></tr><tr><td style="padding: 10px 8px;">'
           + 'Name:</td><td style="padding: 10px 8px;">' + name + '</td></tr><tr>'
           + '<td style="padding: 10px 8px;background: #f5f5f5;">Email:</td>'
           + '<td style="padding: 10px 8px;background: #f5f5f5;">' + email + '</td>'
           + '</tr><tr><td style="padding: 10px 8px;">Subject:</td>'
           + '<td style="padding: 10px 8px;">' + subject + '</td></tr><tr>'
           + '<td style="padding: 10px 8px;background: #f5f5f5;">Message:</td>'
           + '<td style="padding: 10px 8px;background: #f5f5f5;">' + message + '</td>'
           + '</tr></table><br>You can contact ' + name + ' via the email ' + email
           + ' <br/>';
}