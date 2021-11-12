# TODO Poke's App

Solution deployed on: [Netlify](https://todo-poke.netlify.app/)

## Task description

The user interface should have the possibility to:

 - Add a row by fetching data from a remote API, for example(PokéAPI (pokeapi.co)).
 - Edit a row.
 - Remove a row.

- When the application starts, the list is always empty, and data only need to be stored in the memory.

## Tips

 - Think about separating logic from presentation in the code, the logic should be able to be reused in for example a web application.
 - Use related design patterns.
 - Try to follow the SOLID-principles.
 - More than welcome to write tests.
 - It’s not about solving it as quick as possible, but to show what you can.

## Solution

 - On the first load 100 pokes names and url's are fetched (from [this endpoint](https://pokeapi.co/api/v2/pokemon?limit=100&offset=200)) for later use in select element (PokeList.tsx).
 - Selected Poke can be added to Todo list. Then adding poke full poke's info is fetched from selected name/url ([e.g. 'piloswine'](https://pokeapi.co/api/v2/pokemon-form/221/)).
 - Added, edited (or removed) pokes are stored (removed from) in todos state array (App.tsx).
 - The Pokes names are used as unique values. If a few Pokes have the same name,  "deleteTodo" function filters them all. This can be solved easily by adding unique ids for all 'todos' state objects.

## Launch procedure

```
git clone https://github.com/GedasPupa/todo-poke.git
Packages:     npm install
Launch:       npm start
Build:        npm run build
```
