var negate2 = require('../workshop').negate2;

describe('negate2', function() {
    it('Should return a function that can negate the output of a multi-parameter function', function() {
        function firstDividesSecond(first, second) {
            return second % first === 0;
        }

        var firstDoesNotDivideSecond = negate2(firstDividesSecond);
        expect(firstDoesNotDivideSecond(2, 15)).to.equal(true);
        expect(firstDoesNotDivideSecond(2, 16)).to.equal(false);
    });

    it('Should work with a function that returns truthy/falsy values', function() {
        function firstDividesSecondTruthy(first, second) {
            return second % first === 0 ? 1 : 0;
        }

        var firstDoesNotDivideSecond = negate2(firstDividesSecondTruthy);
        expect(firstDoesNotDivideSecond(2, 15)).to.equal(true);
        expect(firstDoesNotDivideSecond(2, 16)).to.equal(false);
    });
});
