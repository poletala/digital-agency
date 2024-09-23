const nameInput = document.querySelector('#name')
const phoneInput = document.querySelector('#phone')
const messageInput = document.querySelector('#message')
const form = document.querySelector('form')
const messageContainer = document.querySelector('.message-block')
const messageSentInfo = document.querySelector('.message-sent')
const contactUsButton = document.querySelector('.contact-btn')
const menuElements = document.querySelectorAll('.menu-a')
const paginationItems = document.querySelectorAll('.pagination-item')
const whiteBoxesTeam = document.querySelectorAll('.white-box')
const servicesCards = document.querySelectorAll('.services-card')
const section3 = document.querySelector('#section-3')
const section4 = document.querySelector('#section-4')
const section5 = document.querySelector('#section-5')
const sections = [section3, section5, section4]
const worksCards = document.querySelectorAll('.works-card')
const inputElements = [nameInput, phoneInput, messageInput]
const nameRegex = /^[a-zA-ZА-ЯЁа-яё\s]+$/;
const phoneRegex = /(^(?!\+.*\(.*\).*--.*$)(?!\+.*\(.*\).*-$)(([0-9]{0,12})?(\+[0-9]{11})?)$)|(^.*$)/; 

// изменение стиля пунктов навигации при наведении
for (let i=0; i<menuElements.length; i++) {
    menuElements[i].addEventListener("mouseenter", (e) => {
        e.target.children[0].classList.add('active-nav-item')
    menuElements[i].addEventListener('mouseleave', (e) => {
        e.target.children[0].classList.remove('active-nav-item')})
    })
}
//изменение стиля нумерации на хэдере при наведении
for (let i=0; i<paginationItems.length; i++) {
    paginationItems[i].addEventListener("mouseenter", (e) => {
        e.target.classList.add('active-pagination-item')
    paginationItems[i].addEventListener('mouseleave', (e) => {
        e.target.classList.remove('active-pagination-item')})
    })
}
//изменение стиля иконок и заголовков карточек услуг при наведении
for (let i=0; i<servicesCards.length; i++) {
    servicesCards[i].addEventListener("mouseenter", (e) => {
        e.target.children[0].children[1].classList.add('active-icon')
        e.target.children[0].children[0].children[0].classList.add('active-underline-service-card-header')
        servicesCards[i].addEventListener('mouseleave', (e) => {
        e.target.children[0].children[1].classList.remove('active-icon')
        e.target.children[0].children[0].children[0].classList.remove('active-underline-service-card-header')})
    })
}
//изменение стиля карточек членов команды при наведении
for (let i=0; i<whiteBoxesTeam.length; i++) {
    whiteBoxesTeam[i].addEventListener("mouseenter", (e) => {
        e.target.classList.add('active-white-box')})
    whiteBoxesTeam[i].addEventListener('mouseleave', (e) => {
            e.target.classList.remove('active-white-box')})   
}
//изменение стиля заголовков секций при наведении
for (let i=0; i<sections.length; i++) {
    sections[i].addEventListener("mouseenter", (e) => {
        console.log(e.target.querySelector('.underline-header'))
        e.target.querySelector('.underline-header').classList.add('active-header-underline')
    sections[i].addEventListener('mouseleave', (e) => {
        e.target.querySelector('.underline-header').classList.remove('active-header-underline')})
    })
}
//изменение стиля карточек при наведении
for (let i=0; i<worksCards.length; i++) {
    worksCards[i].addEventListener("mouseenter", (e) => {
        e.target.children[0].classList.add('active-works')
        worksCards[i].addEventListener('mouseleave', (e) => {
        e.target.children[0].classList.remove('active-works')})
    })
}
//Открытие формы для написания сообщения при нажатии на кнопку
function openFormContactUs() {
    messageContainer.classList.remove('invalid')
    document.querySelector('.message-block-title').children[0].innerHTML = 'Waiting for your message!'
}
function openFormProject() {
    messageContainer.classList.remove('invalid')
    document.querySelector('.message-block-title').children[0].innerHTML = 'Tell us about your project!'  
}
//проверка формы перед отправкой
function validateForm() {
    const name = nameInput.value.trim() //удаление пробелов в начале и в конце 
    const phone = phoneInput.value.trim().replace(/[- )( +]/g,'') //удаление скобок, плюсов, тире, пробелов из инпута номера
    let errors = []
    inputElements.map(function(element) {
        const elementValue = element.value.trim()
        //ошибка при отправке пустой формы
        if (!elementValue) {
            element.classList.add('error-style')
            console.log(element.nextElementSibling)
            element.nextElementSibling.classList.remove('invalid')
            element.nextElementSibling.innerHTML = 'The field is required'
            errors.push(element)
        }
        //ошибка при вводе имени не из букв
        if (elementValue && element.name === 'name' && !nameRegex.test(name)) {
            element.classList.add('error-style')
            element.nextElementSibling.classList.remove('invalid')
            element.nextElementSibling.innerHTML = 'Invalid format'
            errors.push(element)
        }
        //ошибка при вводе номера телефона не из 11 цифр
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
//отправка формы после проверки с всплытием модального окна об отправке через 2 сек и удалением формы через 4 сек
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
        setTimeout(function () {
            messageContainer.classList.add('invalid')
        }, 4000) 
    }     
}
//удаление ошибок при вводе 
function deleteErrorsStyle(elem) {
    if (!elem.nextElementSibling.classList.contains('invalid')) {
        elem.nextElementSibling.classList.add('invalid')
        elem.nextElementSibling.innerHTML = ''
        elem.classList.remove('error-style')
    }
}
//очистка полей формы
function clearFields () {
    nameInput.value = ''
    phoneInput.value = ''
    messageInput.value = ''
}
//предотвращение перезагрузки страницы при нажатии кнопки и запуск ф-ции выше
function handleFormSubmit(event) {
    event.preventDefault()
    onSubmit() 
  }
//прослушивание нажатия кнопки отправки формы
form.addEventListener('submit', handleFormSubmit)