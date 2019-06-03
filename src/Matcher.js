class Matcher {

    constructor (){
        this.workQuery = false;
        this.workRegExp = false;
    }

    static _getTestRegExp(query){
        let pattern = "",
            i, expr;

        if (!query.length) {
            return false;
        }

        for (i = 0; i < query.length; i++) {
            pattern += pattern != "" ? ".*?"+query[i] : query[i];
        }

        expr = new RegExp(pattern, 'i');
        return expr;
    }

    static testByQuery(query, target){
        let regexp = Matcher._getTestRegExp(query),
            mResult,
            testRes = false;

        if (regexp) {
            mResult = regexp.exec(target);
        }
        
        if (mResult != null) {
            testRes = {
                query: query,
                mStr: mResult[0],
                mPos: mResult.index,
                mLength: mResult[0].length,
                rank: mResult[0].length*100 + mResult.index
            }
        }
        return testRes;
    }

    static testByRegExp(regExp, target){
        let regexp = regExp,
            mResult,
            testRes = false;

        if (regexp) {
            mResult = regexp.exec(target);
        }

        if (mResult != null) {
            testRes = {
                // query: query,
                mStr: mResult[0],
                mPos: mResult.index,
                mLength: mResult[0].length,
                rank: mResult[0].length*100 + mResult.index
            }
        }

        return testRes;
    }

    setWorkQuery(query){
        this.workQuery = query;
        this.workRegExp = Matcher._getTestRegExp(this.workQuery)
    }

    test(target){
        return Matcher.testByRegExp(this.workRegExp, target);
    }
}

export default Matcher;