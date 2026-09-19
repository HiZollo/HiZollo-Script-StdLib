# Array

這個函式庫是 JavaScript 的原生 Array 進行封裝後的容器，讓 HiZollo Script 可以直接對原生陣列進行操作。

## 匯入
這個套件在官方提供的編譯器中都叫 `Array`，如果是由第三方所提供的編譯器，請參考他們的說明文件。
```
>>> "Array"
```

## 建立容器
- `newArray()`：建立一個 JavaScript 原生陣列。

## 操作

- `ArrayPush(arr, a, b, c, ...)`：在陣列 arr 後方新增 a、b、c 等元素，數量不拘。
- `ArrayPop(arr)`：在陣列 arr 最後方移除一個物件。
- `ArrayGet(arr, n)`：取得陣列 arr 第 n 個元素。
- `ArraySet(arr, n, v)`：把陣列 arr 第 n 個元素設為 v。
- `ArrayInsert(arr, n, a, b, c, ...)`
- `ArrayRemove(arr, n, length)`
- `ArraySize(arr)`
- `ArraySlice(arr, start, end)`
- `ArrayJoin(arr, sep)`
- `ArrayToState(arr)`
