### Quick To Learn:

* accounting
* convert-units
* querystring
* request

### Medium Used:

* passport - authentication
* socket.io - real time
* lodash - basic helper function. Dont have to read the entire thing

### Important Heavily Used MUST PRACTICE:

* async - each, eachSeries, series, waterfall, setImmediate
* moment - time / date formating
* moment-timezone - timezone
* joi - Validations
* sequelize - database models


### Testing
- chai
- mocha
- throng


-------------

### Assignment
- Build an shopping site
- 2 types user: admin, and user
- User has time zone:
- set up socket.io,
- has to have **product**
- Add the product to the cart
- order table so we can store the table
- Authentication: JWT, and Passport
- Stripe for payment
- Email confirmation: Sendgrid
- Twillio for text message: Place an order then text them an confirmation
- Write test using mocha and chai
- config folder and file, config.js for devleopment and product heroku
- Heroku integration
- Models, Migrations, Seed (sequelize template)
- Mailing and template: ejs
- User all the cores in

### Table
- `Admin`
- `User`
- `Product`
- Cart
- Order


### Time Zone
```js
const moment = require('moment-timezone')
moment.tz.names()
```
