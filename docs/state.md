# State
這個函式庫是 JavaScript 的 Array 進行封裝後的容器，相對於比較簡易的 Array 模組，State 容器提供了比較豐富和安全的功能。

## 龨入
這個套件在官方提供的編譯器中都叫 `State`，如果是由第三方所提供的編譯器，請參考他們的說明文件。
```
>>> "State"
```

## 建立容器
- `newState()`：建立一個 State 容器

## 操作
- `StatePush(s, a, b, c, ...)`：在容器 s 最後方加入 a、b、c 等物件，數量不拘。
- `StatePop(s)`：在容器 s 最後方移除一個物件。
- `StateNext(s)`：把容器 s 的指標往後移一格。
- `StatePrev(s)`：把容器 s 的指標往前移一格。
- `StateAdd(s, a, b, c, ...)`在容器 s 目前指標指向的位置插入 a、b、c 等物件，數量不拘。
- `StateRemove(s, n)`：在容器 s 目前指標指向的位置往後移除 n 個物件，未指定 n 時則 n = 1。
- `StateAccess(s)`：取得容器 s 目前被指標指向的物件。
- `StateSet(s, a)`：把容器 s 目前指標指向的物件改成 a。
- `StateMove(s, n)`：把容器 s 目前指標的位置往後移 n 格。
- `StateGo(s, n)`：把容器 s 目前指標的位置改成 n。
- `StateStringify(s, k)`：把容器 s 的內容用 k 做分格號連接輸出成字串。未指定分隔符 k 時使用空格。
- `StateNowPos(s)`：取得容器 s 目前的指標值。
- `SizeOfState(s)`：取得容器 s 的大小。

