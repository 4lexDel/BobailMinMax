class BobailAI {
    constructor(depth) {
        this.depth = depth;
    }

    getNextState(currentState) { //Point d'entré
        console.log("AI");
        console.log(currentState);
    }

    maxValue(level, state, alpha, beta) { //methode récursive : base de l'algo MinMax
        if (level == this.depth) return this.evaluateState(state);
        let v = -Infinity;

        let childrenState = this.getChildrenState(state);


        childrenState.forEach(childSate => {
            let vChild = this.minValue(level++, childSate, alpha, beta);

            if (vChild > v) v = vChild;
            if (vChild >= beta) return v;
            if (vChild > alpha) alpha = vChild;
        });
        return v;
    }

    minValue(level, state, alpha, beta) {
        if (level == this.depth) return this.evaluateState(state);
        let v = Infinity;

        let childrenState = this.getChildrenState(state);


        childrenState.forEach(childSate => {
            let vChild = this.maxValue(level++, childSate, alpha, beta);

            if (vChild < v) v = vChild;
            if (vChild <= beta) return v;
            if (vChild < beta) beta = vChild;
        });
        return v;
    }

    getChildrenState(state) {
        //get all the children state of a state
        state = [];
    }

    evaluateState(state) {
        //about the bobail position
        return 0;
    }
}

//TODO

/**Condition de victoire à détecter :
 * Adversaire bloquer ?????
 * Bobail dans le camps
 */