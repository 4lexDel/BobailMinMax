class BobailAI {
    constructor(depth) { //      JOUEUR 2 MINIMISE // JOUEUR 1 MAXIMISE
        this.depth = depth;

        this.finalLevelCheck = 0;

        this.pruningActive = true;

        this.nbAVGChildrenTest = 2;

        this.nbCombination = 0;
        this.nbPrunning = 0;
    }

    copy2DArray(array2D) {
        return array2D.map((array) => [...array]);
    }

    testPruning() { //https://thundaxsoftware.blogspot.com/2010/11/alpha-beta-pruning-algorithm-with.html?m=0
        this.endValue = [4, 48, 15, 25, 35, 23, 19, -5, -25, 11, -46, 7, 45, -9, 48, 10];

        this.indexValue = 0;

        this.nodeCheck = [];

        let result = this.maxValue(0, null, undefined, undefined);

        console.log("DEPTH : " + this.depth);
        console.log("VAL : " + result.eva);
        console.log("NB NODE CHECK : " + this.nbCombination);
        console.log("NB PRUNNING : " + this.nbPrunning);

        console.log("grid final : ");
        console.log(result.state);

        console.log("Node check : ");
        console.log(this.nodeCheck);

        //console.log("path explore : " + parseInt(this.indexValue));
    }

    maxValue(level, state, alpha, beta) { //methode récursive : base de l'algo MinMax
        if (level == this.depth) {
            return this.evaluateState();
        }

        let v = undefined;
        let bestMove = undefined;

        let childrenState = this.getChildrenState(); //play as player 1

        for (const key in childrenState) {
            const childState = childrenState[key];

            let vChild = this.minValue(level + 1, childState, alpha, beta);

            if (vChild != undefined) {
                if (!v || vChild >= v) {
                    v = vChild;
                    bestMove = childState;
                }
                if (beta != undefined && vChild >= beta && this.pruningActive) {
                    this.nbPrunning++;
                    this.indexValue += 2 ** (this.depth - level - 1); //skip value
                    return v;
                }
                if (!alpha || vChild > alpha) alpha = vChild;
            }
        }
        if (level == 0) return { eva: v, state: bestMove };
        return v;
    }

    minValue(level, state, alpha, beta) {
        if (level == this.depth) {
            return this.evaluateState();
        }

        let v = undefined;
        let bestMove = undefined;

        let childrenState = this.getChildrenState(); //play as player 2

        for (const key in childrenState) {
            const childState = childrenState[key];

            let vChild = this.maxValue(level + 1, childState, alpha, beta);

            if (vChild != undefined) {
                if (!v || vChild <= v) {
                    v = vChild;
                    bestMove = childState;
                }
                if (alpha != undefined && vChild <= alpha && this.pruningActive) {
                    this.nbPrunning++;
                    this.indexValue += 2 ** (this.depth - level - 1); //skip value
                    return v;
                }
                if (!beta || vChild < beta) beta = vChild;
            }
        }
        if (level == 0) return { eva: v, state: bestMove };
        return v;
    }

    evaluateState() {
        let val = this.endValue[this.indexValue];

        this.indexValue++;

        this.nodeCheck.push(val);

        return val;
    }

    getChildrenState() { //get all the children state of a state
        return [null, null];
    }
}