//core modules
const path = require("path");

module.exports = path.dirname(require.main.filename);

//====================================================================================================
// module.exports = path.dirname(require.main.filename);
// ----
// so this line automatically converts to root path?

// ------
// Yes, in standard setups where your application is booted from the root directory.

// Here is how each piece works step-by-step:

// * **`require.main`**: Refers to the root entry module that started the Node process. If you start your app with `node app.js` or `nodemon app.js`, `require.main` points directly to `app.js`.

// * **`require.main.filename`**: Gives the absolute file path of that entry point (for example: `C:\Users\...\lec10-airbnb\app.js`).

// * **`path.dirname(...)`**: Strips off the file name (`app.js`) and returns only the directory containing it (`C:\Users\...\lec10-airbnb`).
// -------------------------------------------
// ### Important Caveats

// 1. **Entry Point Location Matters:**
// This only points to the project root if the entry file resides in the root directory. If your startup script is located inside a nested folder (such as `bin/www` or `src/server.js`), `require.main.filename` will resolve to `bin/` or `src/`, not the actual root.

// 2. **CommonJS Specific:**
// This syntax relies on `require.main`, which exists in CommonJS. In modern ES Modules (`"type": "module"`), `require` is not available by default.

// 3. **Alternative Built-in Approach:**
// Another clean way to get the root directory in Node.js without relying on `require.main` is:
// ```javascript
// process.cwd();

// ``

// `process.cwd()` returns the current working directory from which the Node process was launched in your terminal.
