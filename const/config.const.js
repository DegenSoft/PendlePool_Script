

// НАСТРОЙКИ ЗАПУСКА

export const sleepFrom = 9; // Задержка между активностями и кошельками ОТ
export const sleepTo = 15; // Задержка между активностями и кошельками ДО

export const shuffleWallets = true; // Перемешивание кошельков

// НАСТРОЙКИ СУММЫ

export const amountETH = { // Диапазон в ЕФИРЕ
  min: 0.0001,
  max: 0.0002
}

export const amountPercent = { // Диапазон в ПРОЦЕНТАХ
  min: 50,
  max: 60
}

export const usePercent = true; // true - используем ПРОЦЕНТЫ, false - используем диапазон ЕФИРА

// НАСТРОЙКИ ГАЗА

export const maxGwei = 40; // Ограничение газа (Выше него скрипт не будет работать)

export const sleepOnHighGas = 60; // Задержка между проверками газа

export const handleGas = { // Диапазон для выставления газа вручную 
  min: 1,
  max: 2
}

export const useHandleGas = true; // true - используем указанный диапазон газа, false - используем газ в сети

// ВЫБОР ПРОЕКТОВ

export const SwapYTexETH = true; // true - запускаем свап YT exETH, false - пропускаем

export const SwapYTexETHZircuit = true; // true - запускаем свап YT exETH (Zircuit), false - пропускаем

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

export const decryptAccounts = false; // true - рассшифровка, false - без шифровки

export const decryptPass = '12345'; // ПАРОЛЬ от кошельков

// МОБИЛЬНЫЕ ПРОКСИ

export const proxyURL = ''; // ПРОКСИ в формате http://user:pass@ip:port

export const changeURL = ''; // Ссылка для смены прокси
