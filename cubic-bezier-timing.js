function cubicBezierTiming(x1, y1, x2, y2, epsilon = 0.00001) {

    function yFn(t) {
        // return (3 * y1 - 3 * y2 + 1) * Math.pow(t, 3) + (3 * y2 - 6 * y1) * Math.pow(t, 2) + 3 * y1 * t;
        return 3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t;
    }

    function xFn(t) {
        // return (3 * x1 - 3 * x2 + 1) * Math.pow(t, 3) + (3 * x2 - 6 * x1) * Math.pow(t, 2) + 3 * x1 * t;
        return 3 * (1 - t) * (1 - t) * t * x1 + 3 * (1 - t) * t * t * x2 + t * t * t;
    }

    function derivativeXFn(t) {
        // return (9 * x1 - 9 * x2 + 3) * Math.pow(t, 2) + (6 * x2 - 12 * x1) * t + 3 * x1;
        return 3 * (1 - t) * (1 - t) * x1 + 6 * (1 - t) * t * (x2 - x1) + 3 * t * t * (1 - x2);
    }

    function resolveT(x) {
        let x0 = 0.5, x1 = 0.5, i = 0;

        do {
            x0 = x1;
            x1 = x0 - (xFn(x0) - x) / derivativeXFn(x0);
            if (x1 === 0) {
                console.error('zero');
                break;
            }
        } while (Math.abs((x1 - x0) / x0 > epsilon));

        return x1;
    }

    return function (x) {
        /*if (x === 0) {
            return 0;
        } else if (x === 1) {
            return 1;
        } else{
            return yFn(resolveT(x));
        }*/

        return yFn(resolveT(x));
    };
}