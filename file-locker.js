const fs = require('fs');
const FileLocker = {}

// map lockKey - lock time
FileLocker.lockMap = {}

// get file status
FileLocker.stats = (path) =>{
    return new Promise ((resolv, reject) =>{
        fs.stat(path, function (err, stats){
            if (err){
                return reject(err)
            } else {
                return resolv(stats)
            }
        })
    })
}

// lock file by path, if file does not exist, create and return true
// if file exists, return false
FileLocker.lock = async function(path) {
    try {
        let f =  fs.openSync(path, 'wx')
        if (f)
        return true
        else 
            return false    
    } catch (e) {
        console.log(e)
        return false;
    }
}

// remove lockfile
FileLocker.unLock = async function(path) {
    return fs.unlinkSync(path);
}

// lock file by path, and time, if file does not exist, create and return true
// if file exists, check create timestamp
FileLocker.lockTime = async function(path, miliseconds){
    try {
        let f =  fs.openSync(path, 'wx')
        if (f)
        return true
        else 
            return false    
    } catch (e) {
        if (e.code != 'EEXIST'){
            return false;
        }
        let stats = await FileLocker.stats(path)
        let birthtimeMs = stats.birthtimeMs;
        let timeStamp = new Date().getTime();
        if (timeStamp - miliseconds > birthtimeMs){
            await FileLocker.unLock(path);
            return FileLocker.lockTime(path, miliseconds)
        }
        return false;
    }
}


module.exports = FileLocker