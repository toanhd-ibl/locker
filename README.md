# locker

A lock utility.

# Usage 

```
const locker = require('locker')
const FileLocker = locker.FileLocker
const lockKey = 'abc.lock'

let isLock = await FileLocker.lock(lockKey)
if (isLock){
    // do something
    let unlock = await FileLocker.unLock(lockKey)
} else {
    console.log("locked fail :: ", lockKey)
}
```

# Methods
All is async/await 

## FileLocker.lock(lockKey)
Acquire a file lock on the specified path

## FileLocker.lockTime(lockKey, timeInMiliseconds)
Acquire a file lock on the specified path in specified time
## FileLocker.unLock(lockKey)
Remove lockfile
