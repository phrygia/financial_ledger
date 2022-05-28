# financial_ledger (react 가계부)
## 개인프로젝트

![가계부](https://user-images.githubusercontent.com/40693181/170808288-e2a662d3-eab3-4ace-b7ab-35f8e48505e9.jpg)

## 🛠 사용기술

- React (CRA)
- 스타일링 : css-module
- 상태관리 : context API + localStorage

## 🔨 context API

```js
export const store = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <store.Provider value={[state, dispatch]}>
      <div className="app">
        ...
      </div>
    </store.Provider>
  );
}
```

## ⛑ Structure

```
src
├── assets
├── components
├── App.css
├── App.js
├── App.test.js
├── index.js
└── setupTests.js
```

## 📦 Packages

### Main

- [create-react-app](https://github.com/facebook/create-react-app)
- [react 17.0.2](https://github.com/facebook/react)
- [react-router 5.3.0](https://github.com/remix-run/react-router)

### styling

- [react-icons](https://github.com/react-icons/react-icons)

### etc Setting

- [gh-pages](https://github.com/tschaub/gh-pages)

> [More Details](https://github.com/phrygia/financial_ledger/blob/master/package.json)

<div align="center">
<sub><sup>Project by <a href="https://github.com/phrygia">phrygia</a></sup></sub><small></small>
</div>
