'use strict'


// Форма входа и регистрации 
    // (вход или регистрация)
const userForm = new UserForm();

userForm.loginFormCallback = data => ApiConnector.login(data, (response) => {
    if(response.success) {
        location.reload();
    }
    else {
        userForm.setLoginErrorMessage(response.error);
    };
});
    
userForm.registerFormCallback = data => ApiConnector.register(data, (response) => {
    if(response.success) {
        location.reload();
    }
    else {
        userForm.setRegisterErrorMessage(response.error);
    };
})    

//{success: true, userId: 6}
//{success: false, error: 'Логин oleg@demo.ru уже существует.'}

    
