const nameInput = document.querySelector('#name')
const phoneInput = document.querySelector('#phone')
const messageInput = document.querySelector('#message')
const form = document.querySelector('form')
const messageContainer = document.querySelector('.message-block')
const messageSentInfo = document.querySelector('.message-sent')
const contactUsButton = document.querySelector('.contact-btn')
const menuElements = document.querySelectorAll('.menu-a')
const inputElements = [nameInput, phoneInput, messageInput]
const nameRegex = /^[a-zA-ZА-ЯЁа-яё]+$/;
const phoneRegex = /(^(?!\+.*\(.*\).*--.*$)(?!\+.*\(.*\).*-$)(([0-9]{0,12})?(\+[0-9]{11})?)$)|(^.*$)/; 


for (let i=0; i<menuElements.length; i++) {
    menuElements[i].addEventListener("mouseenter", (e) => {
        // console.log(e.target.parentNode)
        e.target.children[0].classList.add('active-nav-item')
    menuElements[i].addEventListener('mouseleave', (e) => {
        e.target.children[0].classList.remove('active-nav-item')})
    })
}
 
function openFormContactUs() {
    messageContainer.classList.remove('invalid')
    document.querySelector('.message-block-title').children[0].innerHTML = 'Waiting for your message!'
}
function openFormProject() {
    messageContainer.classList.remove('invalid')
    document.querySelector('.message-block-title').children[0].innerHTML = 'Tell us about your project'  
}
function validateForm() {
    const name = nameInput.value.trim()
    const phone = phoneInput.value.trim().replace(/[- )( +]/g,'')
    let errors = []
    inputElements.map(function(element) {

        const elementValue = element.value.trim()
        
        if (!elementValue) {
            element.classList.add('error-style')
            console.log(element.nextElementSibling)
            element.nextElementSibling.classList.remove('invalid')
            element.nextElementSibling.innerHTML = 'The field is required'
            errors.push(element)
        }
        if (elementValue && element.name === 'name' && !nameRegex.test(name)) {
            element.classList.add('error-style')
            element.nextElementSibling.classList.remove('invalid')
            element.nextElementSibling.innerHTML = 'Invalid format'
            errors.push(element)
        }
        if (elementValue && element.name === 'phone' && (!phoneRegex.test(phone) || phone.length !== 11)) {
            element.classList.add('error-style')
            element.nextElementSibling.classList.remove('invalid')
            element.nextElementSibling.innerHTML = 'Invalid format'
            errors.push(element)
        }
        return errors
    })

    if (errors.length) {
        return false
    } else {
        return true
    }
}

function onSubmit () {
    if (validateForm()) {
        let userMessage = {
            name: nameInput.value,
            phone: phoneInput.value,
            message: messageInput.value
        }
        console.log(userMessage)
        
        messageSentInfo.style.opacity = '1'
        setTimeout(function () {
            messageSentInfo.style.opacity = '0'
            clearFields ()
        }, 2000)
        
            
      
    } 
    
}

function deleteErrorsStyle(elem) {
    if (!elem.nextElementSibling.classList.contains('invalid')) {
        elem.nextElementSibling.classList.add('invalid')
        elem.nextElementSibling.innerHTML = ''
        elem.classList.remove('error-style')
    }
}

function clearFields () {
    nameInput.value = ''
    phoneInput.value = ''
    messageInput.value = ''
}

function handleFormSubmit(event) {
    event.preventDefault()
    onSubmit() 
  }
  
form.addEventListener('submit', handleFormSubmit)