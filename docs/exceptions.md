# 例外

這個文件紀錄 HiZollo Script 以及官方函式庫中會丟出的例外。實作核心模組的 `_panic` 時，可以參考這份文件，提供合適的報錯與錯誤處理。

## HiZollo Script 核心
### 找不到模組函式
- 代碼：`MODULE_FUNCTION_NOT_FOUND`
- 額外資訊：
  - `fn`：要求的函式名稱

### 不是模組函式
- 代碼：`NOT_A_MODULE_FUNCTION`
- 額外資訊：
  - `name`：被錯誤當成函式呼叫的物件名稱

## 容器
### 錯誤的容器
- 代碼：`INCORRECT_CONTAINER`
- 額外資訊：
  - `expect`：應該傳入的容器名稱
  - `received`：實際傳入的物件類型

## 模組
### 沒有匯入需要的模組
- 代碼：`MODULE_NOT_IMPORTED`
- 額外資訊：
  - `source`：需要這個模組的函式、物件或其他來源
  - `requires`：需要的模組名稱

## 其他
### 對發生錯誤的 Safe 容器強行取值
- 代碼：`UNSAFE_UNWRAP`
- 額外資訊：
    - `originalCode`：原本發生的錯誤代碼
