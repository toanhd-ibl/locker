const FileLocker = require('../index').FileLocker;
const lockKey = 'xxxxxxxxxx'

async function test(){
    let isLock = await FileLocker.lockTime(lockKey,10000)
    if (isLock){
        console.log("lockTime locked :: ", lockKey , "isLock", isLock)
        let unlock = await FileLocker.unLock(lockKey)
        console.log("lockTime unlocked", unlock)
    } else {
        console.log("lockTime locked fail :: ", lockKey)
    }
    console.log("lockTime finished")
    process.exit(1)
}

test()