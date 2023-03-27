class BobailAI {
    constructor(depth) {
        this.depth = depth;

        this.finalLevelCheck = 0;

        this.pruningActive = true;

        this.nbAVGChildrenTest = 2;
    }

    getNextState(currentState) { //Point d'entré
        console.log("AI");
        console.log(currentState);

        let val = this.maxValue(0, currentState, undefined, undefined);
        console.log("DEPTH : " + this.depth);
        console.log("VAL : " + val);

        let nbNodeMax = Math.pow(this.nbAVGChildrenTest, this.depth);
        let nbPrunning = nbNodeMax - this.finalLevelCheck;

        console.log("NB NODE WITHOUT PRUNNING : " + nbNodeMax);
        console.log("NB PRUNNING : " + nbPrunning);
        console.log("PERCENT PRUNNING : " + (nbPrunning / nbNodeMax) * 100 + "%");
    }

    getRandomNumber(min, max) {
        return min + Math.random() * (max - min);
    }

    maxValue(level, state, alpha, beta) { //methode récursive : base de l'algo MinMax
        if (level == this.depth) {
            let val = this.evaluateState(state);
            console.log(`(MAX FUNC) : Level : ${level} : val : ${val}`);
            return val;
            return this.evaluateState(state);
        }

        let v = -Infinity;

        let childrenState = this.getChildrenState(state);

        for (const key in childrenState) {
            const childState = childrenState[key];

            let vChild = this.minValue(level + 1, childState, alpha, beta);

            if (vChild > v) v = vChild;
            if (beta && vChild >= beta && this.pruningActive) return v;
            if (!alpha || vChild > alpha) alpha = vChild;
        }
        return v;
    }

    minValue(level, state, alpha, beta) {
        if (level == this.depth) {
            let val = this.evaluateState(state);
            console.log(`(MIN FUNC) : Level : ${level} : val : ${val}`);
            return val;
            return this.evaluateState(state);
        }

        let v = Infinity;

        let childrenState = this.getChildrenState(state);

        for (const key in childrenState) {
            const childState = childrenState[key];

            let vChild = this.maxValue(level + 1, childState, alpha, beta);

            if (vChild < v) v = vChild;
            if (alpha && vChild <= alpha && this.pruningActive) return v;
            if (!beta || vChild < beta) beta = vChild;
        }

        // childrenState.forEach(childState => {
        //     let vChild = this.maxValue(level++, childState, alpha, beta);

        //     if (vChild < v) v = vChild;
        //     if (alpha && vChild <= alpha) return v;
        //     if (!beta || vChild < beta) beta = vChild;
        // });
        return v;
    }

    getChildrenState(state) {
        //get all the children state of a state
        let stateResponse = [];

        for (let i = 0; i < this.nbAVGChildrenTest; i++) {
            stateResponse.push(i);
        }

        return stateResponse;
    }

    evaluateState(state) {
        //about the bobail position
        //return 0;
        this.finalLevelCheck++;
        return parseInt(this.getRandomNumber(-10, 10));
    }
}

//TODO

/**Condition de victoire à détecter :
 * Adversaire bloquer ?????
 * Bobail dans le camps
 */