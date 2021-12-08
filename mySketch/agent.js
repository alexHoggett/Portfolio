function Agent(xPos, yPos, xVel, yVel){
    this.pos = new p5.Vector(xPos, yPos);
    this.vel = new p5.Vector(xVel, yVel);

    this.draw = function(){
        // draw starling at its current position
        fill(255);
        stroke('#E4572E')
        const size = 2;
        rect(this.pos.x, this.pos.y, size + this.vel.x, size - this.vel.y);
    }

    this.move = function(){
        // add its velocity to its position
        this.vel.limit(3);
        this.pos.add(this.vel);
        this.vel.mult(friction);

        // wrap around canvas border
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }

    this.calcMovement = function(){
        let averagePos = createVector();
        let steerVec = createVector();
        let avoidVec = createVector();
        let averageVel = createVector();
        let neighbourCount = 0;

        // compare with every other swarm member
        for (let neighbour of swarm){
            // distance between current agent and other swarm member
            let neighbourDist = this.pos.dist(neighbour.pos);

            // if the other agent is close enough
            if (neighbourDist < cohereRadius && neighbourDist > 0){
                // add its position to later acquire an average
                neighbourCount++;
                averagePos.add(neighbour.pos);
            }

            // if the other agent is too close
            if (neighbourDist < avoidRadius && neighbourDist > 0){
                // push them away from close neighbours
                let pushVec = p5.Vector.sub(this.pos, neighbour.pos);
                pushVec.normalize();
                avoidVec.add(pushVec);
            }

            if (neighbourDist < alignRadius && neighbourDist > 0){
                // add up the neighbours velocity
                averageVel.add(neighbour.vel);
            }
        }

        // take average position of neighbours
        if (neighbourCount > 0) averagePos.div(neighbourCount);

            // take its vector and add to velocity
            steerVec = p5.Vector.sub(averagePos, this.pos);
            steerVec.normalize();
            steerVec.mult(cohereStrength);
            this.vel.add(steerVec);

            // add repulsion vector to velocity
            avoidVec.normalize();
            avoidVec.mult(avoidStrength);
            this.vel.add(avoidVec);

            // add close neighbour avg velocity
            averageVel.normalize();
            averageVel.mult(alignStrength);
            this.vel.add(averageVel);

    }

}