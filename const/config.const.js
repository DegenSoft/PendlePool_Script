

// НАСТРОЙКИ ЗАПУСКА

export const sleepFrom = 90; // Задержка между активностями и кошельками ОТ
export const sleepTo = 150; // Задержка между активностями и кошельками ДО

export const shuffleWallets = true; // true - перемешиваем кошельки; false - не перемешиваем

// НАСТРОЙКИ СУММЫ

export const amountETH = { // Диапазон в ЕФИРЕ
  min: 0.0001,
  max: 0.0002
}

export const amountPercent = { // Диапазон в ПРОЦЕНТАХ
  min: 50,
  max: 60
}

export const slippage = 50 //Слипедж 50 - 0,5%

export const usePercent = true; // true - используем ПРОЦЕНТЫ, false - используем диапазон ЕФИРА

// НАСТРОЙКИ ГАЗА

export const maxGwei = 40; // Ограничение газа (Выше него скрипт не будет работать)

export const sleepOnHighGas = 60; // Задержка между проверками газа

export const handleGas = { // отправка транзакции с указанным диапазономGwei. Скрипт отправит транзакцию и она будет находится в пендинге, пока газ в сети не опуститься до указанного.
  min: 13,
  max: 20
}

export const useHandleGas = false; // true - используем указанный диапазон газа, false - используем газ в сети

// ВЫБОР ПРОЕКТОВ

export const SwapYTexETH = true; // true - запускаем свап YT ezETH (Renzo), false - пропускаем

export const SwapYTexETHZircuit = false; // true - запускаем свап YT ezETH (Zircuit), false - пропускаем

// НАСТРОЙКИ СЕТИ

export const ETH = {
  name: 'ETH',
  chainId: 1,
  rpc: [
    'https://ethereum.publicnode.com', // Массив РПС, первый прогон берется первая, если ошибка берется рандомная
    'https://eth.llamarpc.com', 
    'https://eth.drpc.org'
  ],
  explorer: 'https://etherscan.io/tx',
  token: 'ETH',
  tokens: {
    ETH: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    ezETH: '0xbf5495efe5db9ce00f80364c8b423567e58d2110'
  }
};

// ШИФРОВКА КОШЕЛЬКОВ DEGENSOFT

export const decryptAccounts = true; // true - рассшифровка, false - без шифровки

export const decryptPass = '12345'; // ПАРОЛЬ от кошельков

// МОБИЛЬНЫЕ ПРОКСИ

export const proxyURL = ''; // ПРОКСИ в формате http://user:pass@ip:port

export const changeURL = ''; // Ссылка для смены прокси
