# express-on-fire
Framework of Node.js for self use based on express.

## introduction
What I've done:  

* log(http log && application logger)  
* request params parser(query, multipart, url-encoded)  
* route error handler  
* validator for req and res
* cookie and session
* usage of mongodb

What I am doing:

* automatic test 

## usage
* if you've got [nvm](https://github.com/creationix/nvm), just run the command below . if not, make sure your node version is 0.12(just test with 0.12.7)  
* make sure mongodb is runing on your server  

```js
nvm use 0.12  
git clone git@github.com:CocaCola183/express-on-fire.git demo  
cd demo  
git checkout 0.12/4.1
npm install  
npm start  
```

## LICENSE
Copyright (c) 2015, Kivi <s_f_dragon@163.com>  

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.