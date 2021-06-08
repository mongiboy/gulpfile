# gulpfile 1.0

## Сборка включает:
1. PHP server + BrowserSync
2. JS:
    * Подключение JQUERY
    * Минификация
    * Конкатенация
3. CSS:
    * Компиляция SASS в CSS
    * Конкатенация
    * Автопрефиксер
    * Минификация
4. Изображения:
    * Минификация изображений
    
## Для запуска потребуется:
1. Если Windows, то в PowerShel (от имени администратора) установить разрешение на выполнение скриптов
  `Set-ExecutionPolicy -ExecutionPolicy Bypass`
2. Установить путь до файлов PHP в `function connectPHP()`
3. Установить глобально gulp `npm i -g gulp`
