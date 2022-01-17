$(document).ready(function () {
    $('.submit').click(function (e) {
        

        let email = $('.email').val()
        let subject = $('.subject').val()
        let message = $('.message').val()
        let status = $('.status')
        status.empty()
       

        if(email.length > 5 && email.includes('@') && email.includes('.')) {
            status.append('<div style="color: #fff">Email is valid</div>')
        } else {
            e.preventDefault()
            status.append('<div style="color: #fff">Email is ininvalid</div>')
        }

        if(subject.length >= 2) {
            status.append('<div style="color: #fff">Subject is valid</div>')
        } else {
            e.preventDefault()
            status.append('<div style="color: #fff">Subject is ininvalid</div>')
        }

        if(message.length > 10) {
            status.append('<div style="color: #fff">Message is valid</div>')
        } else {
            e.preventDefault()
            status.append('<div style="color: #fff">Message is ininvalid</div>')
        }
        
    })
})

