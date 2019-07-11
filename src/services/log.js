/**
 * Created by clude on 1/8/16.
 */

// this component need to be implemented in the future, we should support some thing like error log notification
class Log {
    trace (...message) {
        if(__DEV__){
            console.log(message);
        }
    };

    debug (... message) {
        if(__DEV__){
            console.log(message);
        }
    };

    error (... message) {
        console.log(message);
    };
}

module.exports = new Log;