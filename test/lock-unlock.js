const FileLocker = require('../index').FileLocker;
const lockKey = 'xxxxxxxxxx'

async function test(){
    let isLock = await FileLocker.lock(lockKey)
    if (isLock){
        console.log("locked :: ", lockKey , "isLock", isLock)
        let unlock = await FileLocker.unLock(lockKey)
        console.log("unlocked", unlock)
    } else {
        console.log("locked fail :: ", lockKey)
    }
    console.log("finished")
    process.exit(1)
}

test()