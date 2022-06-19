# Math
這個函式庫提供了許多的數學函式以及常數，讓你在 HiZollo Script 中能更容易的做各種數學操作。

## 龨入
這個套件在官方提供的編譯器中都叫 `Math`，如果是由第三方所提供的編譯器，請參考他們的說明文件。
```
>>> "Math"
```

## 常數
- `PI()`：圓周率
- `E()`：自然對數的底數

## 指對數
- `pow(a, b)`：計算 a 的 b 次方
- `exp(a)`：計算 e 的 a 次方，e 為自然對數的底數
- `ln(a)`：計算 a 的自然對數
- `log10(a)`：計算 a 的以 10 為底的對數
- `log2(a)`：計算 a 的以 2 為底的對數
- `log(a, b)`：計算 a 的以 b 為底的對數，其中 b 預設是 10

## 根號
- `sqrt(a)`：計算 a 的平方根
- `cbrt(a)`：計算 a 的立方根
- `root(a, b)`：計算 a 的 b 次方根，其中 b 預設為 2

## 角度與孤度
這個函式庫預設使用的角度單位是孤度，但你可以自行進行更改，有用到角度的函式也可以傳參數指定使用的單位
- `deg2rad(a)`：將 a 角度換算為孤度
- `rad2deg(a)`：將 a 孤度換算為角度
- `setDefaultAngleUnit(unit)`：指定預設使用的角度單位，`unit` 參數請填入 `"deg"` 表示角度或 `"rad"` 表示孤度

## 三角函數
- `sin(a, unit)`：a 的正弦值，角度輸入使用預設單位，可以在 `unit` 參數填入 `"deg"` 表示角度或 `"rad"` 表示孤度
- `cos(a, unit)`：a 的餘弦值，角度輸入使用預設單位，可以在 `unit` 參數填入 `"deg"` 表示角度或 `"rad"` 表示孤度
- `tan(a, unit)`：a 的正切值，角度輸入使用預設單位，可以在 `unit` 參數填入 `"deg"` 表示角度或 `"rad"` 表示孤度
- `cot(a, unit)`：a 的餘切值，角度輸入使用預設單位，可以在 `unit` 參數填入 `"deg"` 表示角度或 `"rad"` 表示孤度
- `sec(a, unit)`：a 的正割值，角度輸入使用預設單位，可以在 `unit` 參數填入 `"deg"` 表示角度或 `"rad"` 表示孤度
- `csc(a, unit)`：a 的餘割值，角度輸入使用預設單位，可以在 `unit` 參數填入 `"deg"` 表示角度或 `"rad"` 表示孤度

- `arcsin(a, unit)`：a 的反正弦值，角度輸出使用預設單位，可以在 `unit` 參數填入 `"deg"` 表示角度或 `"rad"` 表示孤度
- `arccos(a, unit)`：a 的反餘弦值，角度輸出使用預設單位，可以在 `unit` 參數填入 `"deg"` 表示角度或 `"rad"` 表示孤度
- `arctan(a, unit)`：a 的反正切值，角度輸出使用預設單位，可以在 `unit` 參數填入 `"deg"` 表示角度或 `"rad"` 表示孤度
- `arccot(a, unit)`：a 的反餘切值，角度輸出使用預設單位，可以在 `unit` 參數填入 `"deg"` 表示角度或 `"rad"` 表示孤度
- `arcsec(a, unit)`：a 的反正割值，角度輸出使用預設單位，可以在 `unit` 參數填入 `"deg"` 表示角度或 `"rad"` 表示孤度
- `arccsc(a, unit)`：a 的反餘割值，角度輸出使用預設單位，可以在 `unit` 參數填入 `"deg"` 表示角度或 `"rad"` 表示孤度

## 雙曲函數
- `sinh(a, unit)`：a 的雙曲正弦值
- `cosh(a, unit)`：a 的雙曲餘弦值
- `tanh(a, unit)`：a 的雙曲正切值
- `coth(a, unit)`：a 的雙曲餘切值
- `sech(a, unit)`：a 的雙曲正割值
- `csch(a, unit)`：a 的雙曲餘割值

- `arcsinh(a, unit)`：a 的反雙曲正弦值
- `arccosh(a, unit)`：a 的反雙曲餘弦值
- `arctanh(a, unit)`：a 的反雙曲正切值
- `arccoth(a, unit)`：a 的反雙曲餘切值
- `arcsech(a, unit)`：a 的反雙曲正割值
- `arccsch(a, unit)`：a 的反雙曲餘割值