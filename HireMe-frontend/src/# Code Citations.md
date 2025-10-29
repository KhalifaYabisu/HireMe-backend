# Code Citations

## License: unknown
https://github.com/Sonyamaster1/react-mesto-api-full/tree/8fd7f47db5b1a2c3a0415b918f9918a28d452e6f/backend/app.js

```
config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit
```


## License: unknown
https://github.com/devlinbezerra/piscinas/tree/a3944651e087eb2e68e8f676bb6347dbfd62261c/controllers/error.js

```
.stack);
  
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
}
```

