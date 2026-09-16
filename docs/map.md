# Map

這個函式庫是 JavaScript 的 Object 進行封裝後的容器，用來儲存 key-value（鍵值對）。

相對於直接使用 JavaScript Object，Map 容器提供了比較簡單和安全的操作介面，並可以將容器中的 key 或 value 轉換成 State 容器。

## 匯入
這個套件在官方提供的編譯器中都叫 `Map`，如果是由第三方所提供的編譯器，請參考他們的說明文件。
```
>>> "Map"
```

## 建立容器
- `newMap()`：建立一個 Map 容器。

## 操作

- `MapInsert(m, key, val)`：在容器 m 中加入一個 key-value。若 key 已經存在，則會將原本的 value 覆蓋。
- `MapGet(m, key)`：取得容器 m 中指定 key 所對應的 value。
- `MapHas(m, key)`：判斷容器 m 是否存在指定的 key。
- `MapRemove(m, key)`：移除容器 m 中指定的 key-value。
- `MapToState(m)`：將容器 m 中所有的 value 轉換成 State 容器。
- `MapToStateKey(m)`：將容器 m 中所有的 key 轉換成 State 容器。
