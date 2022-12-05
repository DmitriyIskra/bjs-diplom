'use strict'

// ВЫХОД ИЗ ЛИЧНОГО КАБИНЕТА
const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout( (response) => {
    if(response.success) {
        location.reload();
    };
});


// ----------------------------------------------------------------------------------


// ПОЛУЧЕНИЕ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ

const userCurrent = ApiConnector.current( (response) => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    };
});


// ---------------------------------------------------------------------------------


// ПОЛУЧЕНИЕ ТЕКУЩИХ КУРСОВ ВАЛЮТ

const ratesBoard = new RatesBoard();

const getExchangeRates = function() {
    ApiConnector.getStocks((response) => {
        if(response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        };
    });
};

getExchangeRates();

setInterval( () => getExchangeRates(), 60000 );


// ---------------------------------------------------------------------------------------


// ОПЕРАЦИИ С ДЕНЬГАМИ

    // Пополнение баланса
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, (response) => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
        
        moneyManager.setMessage(response.success, `Баланс успешно пополнен`);
    }
    else {
        moneyManager.setMessage(response.success, `Пополнить баланс не удалось`);
    };
});


    // Конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, (response) => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);

        moneyManager.setMessage(response.success, `Конвертация прошла успешно`);
    }
    else {
        moneyManager.setMessage(response.success, `Ошибка, конвертация не была осуществлена`);
    }
});


    // Перевод валюты
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);

            moneyManager.setMessage(response.success, `Перевод денег прошел успешно`);
        }
        else {
            moneyManager.setMessage(response.success, `Ошибка. Перевод денег не был осуществлен`);
        };
    });
};


// -------------------------------------------------------------------------------------------------


// РАБОТА С ИЗБРАННЫМ

    // Запрос начального списка избранного
const favoritesWidget = new FavoritesWidget();

const getFavorites = (() => {
    ApiConnector.getFavorites( (response) => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        };
    });
})();


    // Реализация добавления пользователя в список избранных
favoritesWidget.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, (response) => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);

        favoritesWidget.setMessage(response.success, `Пользователь успешно добавлен`);

    }
    else {
        favoritesWidget.setMessage(response.success, `Ошибка пользователь не был добавлен`);
    };
});


    // Реализация удаления пользователя из избранного
favoritesWidget.removeUserCallback = (data) => {   
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if(response.success) {    
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            
            favoritesWidget.setMessage(response.success, `Пользователь успешно удален`);
        }
        else {
            favoritesWidget.setMessage(response.success, `Ошибка пользователь не был удален`);
        };
    });
};
