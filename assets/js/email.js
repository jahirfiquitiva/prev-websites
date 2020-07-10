const token = "4790479d-783a-42fc-bf9a-2835bbdb47d5";
const $formContact = document.querySelector("#contact-form");

let nameInput = document.contactForm.name;
nameInput.addEventListener('keyup', function () {
    toggleHelp('name', false);
});

let emailInput = document.contactForm.email;
emailInput.addEventListener('keyup', function () {
    toggleHelp('email', false);
});

let subjectInput = document.contactForm.subject;
subjectInput.addEventListener('keyup', function () {
    toggleHelp('subject', false);
});

let messageInput = document.contactForm.message;
messageInput.addEventListener('keyup', function () {
    toggleHelp('message', false);
});

const sendForm = event => {
    event.preventDefault();
    document.contactForm.action.classList.add('is-loading');

    if (document.contactForm.honey) {
        let input = document.contactForm.honey.value;
        if (input !== null && input !== undefined && input.length > 0) {
            toggleHelp('captcha', true);
            return stopMailLoad(false);
        }
    }

    const email = emailInput.value;
    if (email !== null && email !== undefined) {
        if (validateEmail(email)) {
            let response = grecaptcha.getResponse();
            if (response === null || response === undefined || response.length === 0) {
                toggleHelp('captcha', true);
                return stopMailLoad(false);
            } else {
                toggleHelp('captcha', false);
                let name = nameInput.value;
                let subject = subjectInput.value;
                let content = messageInput.value;
                if (name === null || name === undefined || name.length === 0) {
                    toggleHelp('name', true);
                    return stopMailLoad(false);
                } else if (subject === null || subject === undefined || subject.length === 0) {
                    toggleHelp('subject', true);
                    return stopMailLoad(false);
                } else if (content === null || content === undefined || content.length === 0) {
                    toggleHelp('message', true);
                    return stopMailLoad(false);
                } else {
                    smtpJS({sender: email, name: name, subject: subject, text: content});
                    return true;
                }
            }
        } else {
            toggleHelp('email', true);
            return stopMailLoad(false);
        }
    } else {
        toggleHelp('email', true);
        return stopMailLoad(false);
    }
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
                callback: function done(e) {
                    toggleFields(true);
                }
            }
        );
    } catch (e) {
        toggleFields(false);
    }
};

$formContact.addEventListener("submit", sendForm);

function stopMailLoad(expected) {
    try {
        document.contactForm.action.classList.remove('is-loading');
    } catch (e) {
    }
    return expected;
}

function toggleHelp(id, active) {
    try {
        if (active) {
            document.getElementById(id).classList.add('is-danger');
            document.getElementById(id + '-help').classList.add('is-active');
        } else {
            document.getElementById(id).classList.remove('is-danger');
            document.getElementById(id + '-help').classList.remove('is-active');
        }
    } catch (e) {
    }
}

function toggleFields(sent) {
    stopMailLoad(true);
    document.contactForm.action.disabled = sent;
    document.contactForm.action.setAttribute('aria-disabled', sent.toString());

    nameInput.disabled = sent;
    nameInput.setAttribute('aria-disabled', sent.toString());
    toggleHelp('name', false);

    emailInput.disabled = sent;
    emailInput.setAttribute('aria-disabled', sent.toString());
    toggleHelp('email', false);

    subjectInput.disabled = sent;
    subjectInput.setAttribute('aria-disabled', sent.toString());
    toggleHelp('subject', false);

    messageInput.disabled = sent;
    messageInput.setAttribute('aria-disabled', sent.toString());
    toggleHelp('message', false);

    let note = document.getElementById('sent');
    let otherNote = document.getElementById('not-sent');

    if (note !== null && note !== undefined) {
        if (sent) {
            note.classList.add('is-active');
        } else {
            note.classList.remove('is-active');
        }
    }

    if (otherNote !== null && otherNote !== undefined) {
        if (sent) {
            otherNote.classList.remove('is-active');
        } else {
            otherNote.classList.add('is-active');
        }
    }

    if (sent) {
        nameInput.value = "";
        emailInput.value = "";
        subjectInput.value = "";
        messageInput.value = "";
    }
}

function validateEmail(email) {
    try {
        const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email.toLowerCase());
    } catch (e) {
        return false;
    }
}

function getEmailContent(name, email, subject, message) {
    return 'You have been contacted by <b>' + name + '</b><br/><br/><table'
           + ' style="margin: 0;width: 100%;border: 1px solid #f5f5f5;'
           + 'border-collapse: collapse;border-spacing: 0;"><tr>'
           + '<td style="padding: 10px 8px;background: #f5f5f5;"><b>Email:</b></td>'
           + '<td style="padding: 10px 8px;background: #f5f5f5;">' + email + '</td>'
           + '</tr><tr><td style="padding: 10px 8px;"><b>Subject:</b></td>'
           + '<td style="padding: 10px 8px;">' + subject + '</td></tr><tr>'
           + '<td style="padding: 10px 8px;background: #f5f5f5;"><b>Message:</b></td>'
           + '<td style="padding: 10px 8px;background: #f5f5f5;">' + message + '</td>'
           + '</tr></table><br/>';
}