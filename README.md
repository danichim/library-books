# library

> A simple library application. Keep tabs on your organization's book collection. Find a book you'd like to read from the collection, borrow, return.
Node v 9.4.0

## TODO
* Be able to borrow a book (done)
  * Time Picker (todo)
* Admin/User Roles (partially)

## DONE
* Be able to add a book in the library. Be able to remove a book.
  * Book component
  * Read book list database
* Book list view
* Navbar -- the component is there, but it's useless... (almost done)
  * Title | User list, Book list, Logout
* Show a dialog on delete book to confirm book deletion.
* Make book list pretty with search
* Make Admin view pretty
* Overall page layout fixes.
* Book component
* Individual book view w/ picture and description + borrow history. This will be a dialog component.


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests(LOL NOPE)
npm test 
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
