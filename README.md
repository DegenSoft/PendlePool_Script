<h1 align="center">Lens - скрипт для создания профиля</h1>

<h2>✅ Функционал скрипта</h2>

- Минт профиля по указанным словам через **[Hey.xyz](http://Hey.xyzHey.xyz)**
- Заполнение имени и bio профиля
- Установка фото профиля из рандомного изображения
- Возможность использования зашифрованных кошельков
- Возможность использования обычные и мобильных прокси
- Перемешивание кошельков
- Ограничение GWEI
- Возможность смены RPC
- Задержки между кошельками

<h2>⚙️ Настройка</h2>

➡️ Основные настройки происходят в файле config.const.js в папке const

➡️ Прокси указываем в файле **proxies.txt** в папке Files

➡️ Кошельки добавляем в файле **wallets.txt** в папке Files

<h2>⚙️ Данные для создания профиля</h2>

### Имя профиля

Слова для создания имени указываются в файле words.const.js в папке const

Формат создания: слово1+слово2

### Bio

Заполняется сразу с трёх файлов:

**Навыки** - с файла **expertise.const.js в папке const**

**Интересы** - с файла **interests.const.js в папке const**

**Деятельность** - с файла activity.const.js **в папке const**

### Аватар

Загружается рандомное изображение с интернета

---

<h2>🚀 Запуск</h2>

```
cd (ссылка на дерикторию с папкой)

npm i

npm  start
```

---
